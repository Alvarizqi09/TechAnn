<template>
  <div class="container">
    <h1 class="text-2xl font-bold text-accent mt-4">Our Best Product</h1>
    <div
      class="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full h-full items-center justify-center mt-10"
    >
      <CardVue v-for="product in products" :key="product.id" :product="product" />
    </div>
  </div>
</template>

<script setup>
import CardVue from '../components/CardVue.vue'
import axios from 'axios'
import { ref, onMounted } from 'vue'

const products = ref([])
onMounted(() => {
  axios
    .get('https://be-vue-node.vercel.app/api/best-products')
    .then((response) => {
      products.value = response.data
    })
    .catch((error) => {
      console.log(error)
    })
})
</script>

<style lang="scss" scoped></style>
