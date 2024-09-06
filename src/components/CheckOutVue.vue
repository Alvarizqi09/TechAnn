<template>
  <div class="container">
    <h1 class="text-2xl font-bold text-accent mt-4">KERANJANG</h1>
    <div class="overflow-x-auto">
      <table class="table">
        <!-- head -->
        <thead>
          <tr>
            <th>No</th>
            <th>Foto</th>
            <th>Makanan</th>
            <th>Keterangan</th>
            <th>Jumlah</th>
            <th>Harga</th>
            <th>Total Harga</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <!-- row 1 -->
          <tr v-for="(keranjang, idx) in keranjangs" :key="keranjang.id" class="hover:bg-gray-200">
            <th>{{ idx + 1 }}</th>
            <td>
              <figure>
                <img
                  :src="'../' + keranjang.products.gambar"
                  alt="gambar"
                  class="w-32 h-auto rounded-lg shadow-2xl"
                />
              </figure>
            </td>
            <td>
              <p class="text-black font-bold text-md">{{ keranjang.products.nama }}</p>
            </td>
            <td>
              <p class="text-black font-bold text-md">
                {{ keranjang.keterangan_tambahan ? keranjang.keterangan_tambahan : '-' }}
              </p>
            </td>
            <td>
              <p class="text-black font-bold text-md">{{ keranjang.jumlah_pesanan }}</p>
            </td>
            <td>
              <p class="text-black font-bold text-md">{{ keranjang.products.harga }}</p>
            </td>
            <td>
              <p class="text-black font-bold text-md">
                {{ keranjang.jumlah_pesanan * keranjang.products.harga }}
              </p>
            </td>
            <td>
              <button @click="deleteKeranjang(keranjang.id)" class="btn btn-error text-white">
                <i class="fa fa-trash"></i>
              </button>
            </td>
          </tr>
          <tr>
            <td colspan="6" class="text-right">Total Harga :</td>
            <td>
              <p class="text-black font-bold text-md">{{ totalHarga }}</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const deleteKeranjang = (id) => {
  store.dispatch('deleteKeranjang', id).then(() => {
    alert('Success delete product')
  })
}

const keranjangs = computed(() => store.state.keranjangs)

const totalHarga = computed(() => store.getters.totalHarga)

onMounted(() => {
  store.dispatch('fetchKeranjangs')
})
</script>
