<template>
  <!-- Tampilan Web -->
  <div class="container mx-auto p-4 min-h-screen">
    <div v-if="invoice" class="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-green-600 mb-2">Checkout Berhasil!</h1>
        <p class="text-gray-600">Terima kasih telah berbelanja</p>
      </div>

      <div class="mb-8">
        <h2 class="text-xl font-semibold mb-4">Invoice #{{ invoice?.id }}</h2>
        <div class="border-b mb-4"></div>

        <div v-for="(item, idx) in invoice.items" :key="idx" class="mb-2">
          <p class="font-medium">{{ item?.products?.nama }}</p>
          <p class="text-gray-600">
            {{ item?.jumlah_pesanan }} x Rp{{ item?.products?.harga?.toLocaleString() }}
          </p>
        </div>

        <div class="mt-6 text-right">
          <p class="text-xl font-bold">Total: Rp{{ invoice.total.toLocaleString() }}</p>
        </div>
      </div>

      <div class="flex gap-4 justify-center">
        <button @click="downloadPDF" class="btn btn-primary gap-2">
          <i class="fas fa-file-pdf"></i> Download PDF
        </button>
      </div>
    </div>

    <div v-else class="text-center">
      <h1 class="text-2xl text-red-500 mb-4">Invoice tidak ditemukan</h1>
      <button @click="router.push('/')" class="btn btn-primary">Kembali ke Beranda</button>
    </div>
  </div>

  <!-- Template PDF (Hidden) -->
  <div class="pdf-template-wrapper">
    <div ref="invoiceContent" class="pdf-template">
      <div class="header-invoice">
        <h1 class="store-name">Toko Elektronik XYZ</h1>
        <div class="store-info">
          <p>Jl. Contoh No. 123</p>
          <p>Telp: 0812-3456-7890</p>
        </div>
      </div>

      <div class="invoice-info">
        <p>Invoice: #{{ invoice?.id }}</p>
        <p>{{ formattedDate }}</p>
      </div>

      <table class="item-table">
        <thead>
          <tr>
            <th class="text-left">Item</th>
            <th class="text-right">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, idx) in invoice?.items" :key="idx">
            <td>
              <div class="product-name">{{ item?.products?.nama }}</div>
              <div class="product-qty">
                {{ item?.jumlah_pesanan }}x @{{ formatCurrency(item?.products?.harga) }}
              </div>
            </td>
            <td class="text-right">
              {{ formatCurrency(item.jumlah_pesanan * item.products.harga) }}
            </td>
          </tr>
        </tbody>
      </table>

      <div class="total-section">
        <div class="total-row">
          <span>TOTAL</span>
          <span>{{ formatCurrency(invoice?.total) }}</span>
        </div>
      </div>

      <div class="footer">
        <p>Terima kasih telah berbelanja</p>
        <p>www.toko-elektronik-xyz.com</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

const router = useRouter()
const route = useRoute()
const invoice = ref(null)
const invoiceContent = ref(null)
const formatCurrency = (value) => {
  return 'Rp' + value?.toLocaleString('id-ID') || '0'
}

const formattedDate = computed(() => {
  if (!invoice.value?.date) return ''
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }
  return new Date(invoice.value.date).toLocaleDateString('id-ID', options)
})

const downloadPDF = async () => {
  try {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: [100, 500],
      hotfixes: ['px_scaling'],
      putOnlyUsedFonts: true
    })

    const options = {
      scale: 2,
      useCORS: true,
      logging: true,
      width: 100,
      windowWidth: 1000,
      height: invoiceContent.value.scrollHeight,
      backgroundColor: '#FFFFFF', // Tambahkan ini
      onclone: (clonedDoc) => {
        clonedDoc.body.style.width = '100mm'
        clonedDoc.body.style.padding = '2mm'
        clonedDoc.body.style.overflow = 'visible'

        // Force semua warna ke format hex
        clonedDoc.querySelectorAll('*').forEach((el) => {
          const styles = window.getComputedStyle(el)

          // Handle text color
          if (styles.color.includes('oklch') || styles.color.includes('rgb')) {
            el.style.color = '#000000'
          }

          // Handle background color
          if (
            styles.backgroundColor.includes('oklch') ||
            styles.backgroundColor !== 'rgba(0, 0, 0, 0)'
          ) {
            el.style.backgroundColor = '#FFFFFF'
          }

          // Hapus efek styling
          el.style.boxShadow = 'none'
          el.style.borderRadius = '0'
          el.style.transform = 'scale(1)'
          el.style.whiteSpace = 'pre-wrap'
        })
      }
    }

    const canvas = await html2canvas(invoiceContent.value, options)
    const imgData = canvas.toDataURL('image/png')

    const pdfWidth = doc.internal.pageSize.getWidth()
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width

    // Hitung jumlah halaman
    const pageHeight = doc.internal.pageSize.getHeight()
    let position = 0

    while (position < pdfHeight) {
      if (position > 0) doc.addPage()
      doc.addImage(imgData, 'PNG', 0, -position, pdfWidth, pdfHeight)
      position += pageHeight
    }

    doc.save(`invoice-${invoice.value.id}.pdf`)
  } catch (error) {
    console.error('Gagal generate PDF:', error)
    alert('Gagal mengunduh PDF. Silakan coba lagi.')
  }
}
onMounted(() => {
  invoice.value = route.params.invoice || history.state?.invoice

  if (!invoice.value && route.query.data) {
    try {
      invoice.value = JSON.parse(route.query.data)
    } catch (e) {
      console.error('Gagal parsing invoice data')
    }
  }
})
</script>

<style scoped>
/* PDF View Styles */
.pdf-template-wrapper {
  position: absolute;
  left: -9999px;
  top: -9999px;
}

.pdf-template {
  width: 80mm;
  min-height: 297mm;
  padding: 2mm;
  background: #ffffff;
  color: #000000;
  font-family: Arial, sans-serif;
  font-size: 10px;
  line-height: 1.2;
}

.header-invoice {
  text-align: center;
  margin-bottom: 4mm;
}

.store-name {
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 2mm;
}

.store-info p {
  font-size: 9px;
  margin: 1mm 0;
}

.invoice-info {
  font-size: 9px;
  margin-bottom: 4mm;
}

.item-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 4mm;
}

.item-table th,
.item-table td {
  padding: 2mm 0;
  border-bottom: 1px dashed #000;
}

.product-name {
  font-weight: bold;
  margin-bottom: 1mm;
}

.product-qty {
  font-size: 8px;
  color: #555;
}

.total-section {
  border-top: 2px dashed #000;
  padding-top: 4mm;
  margin-top: 4mm;
}

.total-row {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
}

.footer {
  text-align: center;
  font-size: 8px;
  margin-top: 6mm;
  padding-top: 4mm;
  border-top: 1px dashed #000;
}

.text-left {
  text-align: left;
}
.text-right {
  text-align: right;
}
</style>
