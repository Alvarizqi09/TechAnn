<template>
  <div class="container">
    <h1 class="text-2xl font-bold text-accent mt-4">DAFTAR PRODUCT</h1>
    <div class="flex justify-end">
      <label class="input bg-white input-accent flex items-center gap-2">
        <input v-model="search" type="text" placeholder="Search" />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          class="h-4 w-4 opacity-70"
        >
          <path
            fill-rule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clip-rule="evenodd"
          />
        </svg>
      </label>
    </div>
    <div
      class="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full h-full items-center justify-center mt-10"
    >
      <CardVue v-for="product in filteredProducts" :key="product.id" :product="product" />
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import CardVue from './CardVue.vue'
import { ref, computed, onMounted } from 'vue'

const products = ref([])
const search = ref('')

const filteredProducts = computed(() => {
  return products.value.filter((product) =>
    product.nama.toLowerCase().includes(search.value.toLowerCase())
  )
})

onMounted(() => {
  axios
    .get('https://be-vue-node.vercel.app/api/products')
    .then((response) => {
      products.value = response.data
    })
    .catch((error) => {
      console.log(error)
    })
})
</script>
