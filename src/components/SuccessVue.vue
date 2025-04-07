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
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import jsPDF from 'jspdf'

const router = useRouter()
const route = useRoute()
const invoice = ref(null)

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

const downloadPDF = () => {
  const doc = new jsPDF()

  // Color Palette
  const primaryColor = '#4F46E5' // Ungu elegan
  const accentColor = '#10B981' // Hijau untuk aksen
  const darkColor = '#1F2937' // Untuk teks utama
  const lightColor = '#F9FAFB' // Untuk background
  const borderColor = '#E5E7EB' // Untuk garis pembatas

  // Add decorative border
  doc.setDrawColor(primaryColor)
  doc.setLineWidth(0.5)
  doc.rect(15, 15, 180, 260) // Border luar

  // Header Section
  doc.setFillColor(primaryColor)
  doc.rect(20, 20, 170, 20, 'F')

  doc.setFontSize(16)
  doc.setTextColor(255, 255, 255)
  doc.text('INVOICE PEMBELIAN', 105, 32, null, null, 'center')

  // Store Info (dalam box)
  doc.setFillColor(lightColor)
  doc.rect(20, 45, 170, 25, 'F')
  doc.setDrawColor(borderColor)
  doc.rect(20, 45, 170, 25)

  doc.setFontSize(10)
  doc.setTextColor(darkColor)
  doc.text('Toko Online Premium Kami', 30, 52)
  doc.text('Jl. Kemanggisan No. 12, Jakarta', 30, 58)
  doc.text('Telp: (021) 1234-5678', 130, 52)
  doc.text('Email: hello@premiumstore.id', 130, 58)

  // Invoice Info
  doc.setFontSize(12)
  doc.text(`Invoice #${invoice.value.id}`, 20, 80)
  doc.text(`Tanggal: ${new Date().toLocaleDateString('id-ID')}`, 20, 88)

  doc.setDrawColor(borderColor)
  doc.line(20, 92, 190, 92)

  // Table Header - Perubahan di sini (lebar kolom disesuaikan)
  doc.setFillColor(primaryColor)
  doc.rect(20, 97, 170, 10, 'F')
  doc.setTextColor(255, 255, 255)

  // Perubahan posisi kolom untuk memberi ruang lebih
  const colPositions = {
    no: 25,
    product: 40, // Diperlebar dari 50
    qty: 120,
    price: 145, // Digeser ke kanan dari 140
    subtotal: 180 // Digeser lebih ke kanan dari 170
  }

  doc.text('No', colPositions.no, 104)
  doc.text('Produk', colPositions.product, 104)
  doc.text('Qty', colPositions.qty, 104)
  doc.text('Harga', colPositions.price, 104)
  doc.text('Subtotal', colPositions.subtotal, 104, null, null, 'right')

  // Table Rows
  doc.setFontSize(10)
  let y = 115
  invoice.value.items.forEach((item, index) => {
    // Alternate row colors
    if (index % 2 === 0) {
      doc.setFillColor(lightColor)
      doc.rect(20, y - 5, 170, 10, 'F')
    }

    doc.setTextColor(darkColor)
    doc.text((index + 1).toString(), colPositions.no, y)

    // Nama produk dipotong jika terlalu panjang
    const productName = doc.splitTextToSize(item.products.nama, 60)
    doc.text(productName, colPositions.product, y)

    doc.text(item.jumlah_pesanan.toString(), colPositions.qty, y)

    // Format harga dengan alignment right
    doc.text(
      `Rp${item.products.harga.toLocaleString('id-ID')}`,
      colPositions.price,
      y,
      null,
      null,
      'right'
    )
    doc.text(
      `Rp${(item.jumlah_pesanan * item.products.harga).toLocaleString('id-ID')}`,
      colPositions.subtotal,
      y,
      null,
      null,
      'right'
    )

    // Menyesuaikan tinggi row berdasarkan panjang teks produk
    y += productName.length * 5 + 5
  })

  // Total Section
  doc.setDrawColor(borderColor)
  doc.line(140, y + 5, 190, y + 5)

  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  doc.text('Total:', 140, y + 15)
  doc.text(`Rp${invoice.value.total.toLocaleString('id-ID')}`, 190, y + 15, null, null, 'right')

  doc.setFont('helvetica', 'normal')

  // Payment Info
  doc.setFontSize(10)
  doc.setTextColor(darkColor)
  doc.text('Metode Pembayaran: Transfer Bank', 20, y + 30)
  doc.text('Bank: BCA - 1234567890', 20, y + 37)
  doc.text('a.n. Premium Store Indonesia', 20, y + 44)

  // Footer
  doc.setFontSize(9)
  doc.setTextColor(accentColor)
  doc.text('Terima kasih telah berbelanja di toko kami!', 105, 270, null, null, 'center')

  // Save PDF
  doc.save(`invoice_${invoice.value.id}.pdf`)
}
</script>
