<template>
  <div class="container">
    <div class="breadcrumbs text-sm mt-3">
      <ul>
        <li class="font-bold text-lg"><RouterLink to="/">Home</RouterLink></li>
        <li class="font-bold text-lg"><RouterLink to="/product">Foods</RouterLink></li>
        <li class="font-bold text-lg">Foods Details {{ $route.params.id }}</li>
      </ul>
    </div>
    <div class="w-full flex flex-col xl:flex-row gap-12 xl:gap-20 h-full">
      <div class="mt-6 justify-center items-center w-full flex">
        <figure>
          <img
            :src="'../' + product.gambar"
            alt="gambar"
            class="w-96 h-full rounded-lg shadow-2xl"
          />
        </figure>
      </div>
      <div class="mt-0 xl:mt-6">
        <h1 class="text-2xl text-black font-bold">{{ product.nama }}</h1>
        <p class="text-lg text-black mt-4">Harga : {{ product.harga }}</p>
        <form class="my-6" v-on:submit.prevent>
          <form-control>
            <label
              class="input flex bg-white border-accent items-center text-black font-bold gap-2 my-3"
            >
              <p class="text-sm w-32">Jumlah Pesanan :</p>
              <input type="number" placeholder="" class="" v-model="pesan.jumlah_pesanan" />
            </label>
            <label class="flex bg-white items-center my-2">
              <textarea
                v-model="pesan.keterangan_tambahan"
                placeholder="Masukan Keterangan Tambahan"
                class="textarea textarea-success font-bold bg-white textarea-md w-full"
              ></textarea>
            </label>

            <button @click="pemesanan" type="submit" class="btn btn-accent mt-4">
              Add to Cart
            </button>
          </form-control>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()

const product = ref({})
const pesan = ref({})

const fetchProduct = () => {
  axios
    .get('http://localhost:3000/products/' + route.params.id)
    .then((response) => {
      product.value = response.data
    })
    .catch((error) => {
      console.log(error)
    })
}

const pemesanan = () => {
  if (pesan.value.jumlah_pesanan) {
    pesan.value.products = product.value
    axios
      .post('http://localhost:3000/keranjangs', pesan.value)
      .then(() => {
        router.push('/checkout')
        alert('Success add product to cart')
      })
      .catch((error) => {
        console.log(error)
      })
  } else {
    alert('Jumlah Pesanan tidak boleh kosong')
  }
}

onMounted(() => {
  fetchProduct()
})
</script>

<style lang="scss" scoped></style>
