<template>
  <div class="container mx-auto p-4 min-h-screen">
    <div class="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-green-600 mb-2">Checkout Berhasil!</h1>
        <p class="text-gray-600">Terima kasih telah berbelanja</p>
      </div>

      <div class="mb-8" ref="invoiceContent">
        <h2 class="text-xl font-semibold mb-4">Invoice #{{ invoice.id }}</h2>
        <div class="border-b mb-4"></div>

        <div v-for="(item, idx) in invoice.items" :key="idx" class="mb-2">
          <p class="font-medium">{{ item.products.nama }}</p>
          <p class="text-gray-600">
            {{ item.jumlah_pesanan }} x Rp{{ item.products.harga.toLocaleString() }}
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

        <button @click="downloadImage" class="btn btn-accent gap-2">
          <i class="fas fa-image"></i> Download Gambar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

const router = useRouter()
const invoice = ref(router.currentRoute.value.state?.invoice)
const invoiceContent = ref(null)

const downloadPDF = () => {
  const doc = new jsPDF()
  doc.html(invoiceContent.value, {
    callback: function (doc) {
      doc.save(`invoice-${invoice.value.id}.pdf`)
    },
    margin: [10, 10, 10, 10],
    html2canvas: { scale: 0.75 }
  })
}

const downloadImage = async () => {
  const canvas = await html2canvas(invoiceContent.value)
  const imgData = canvas.toDataURL('image/png')
  const link = document.createElement('a')
  link.download = `invoice-${invoice.value.id}.png`
  link.href = imgData
  link.click()
}
</script>
