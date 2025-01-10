<template>
  <div class="container mx-auto px-6">
    <!-- Hero Section -->
    <section class="bg-accent text-primary py-12 rounded-lg shadow-lg text-center mt-10">
      <h1 class="text-5xl font-extrabold mb-4">Discover Our Best Tech Products</h1>
      <p class="text-xl mb-6">
        Explore the latest laptops, smartphones, and gadgets to enhance your tech experience.
      </p>
      <button
        class="bg-primary text-accent px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-hover transition-colors"
      >
        Shop Now
      </button>
    </section>

    <!-- Best Products Section -->
    <section class="mt-12">
      <h2 class="text-4xl font-bold text-gray-800 text-center mb-8">Our Best Products</h2>
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full h-full items-center justify-center mt-10"
      >
        <CardVue
          v-for="product in products"
          :key="product.id"
          :product="product"
          class="transform hover:scale-105 transition-transform duration-300 ease-in-out"
        />
      </div>
    </section>

    <section class="mt-20 bg-gray-100 py-16 px-6 rounded-lg shadow-xl">
      <h2 class="text-3xl font-semibold text-center text-gray-800 mb-8">What Our Customers Say</h2>
      <div class="flex flex-wrap justify-center gap-8">
        <div class="bg-white p-6 rounded-lg shadow-lg max-w-xs">
          <p class="text-lg italic text-gray-600 mb-4">
            "TechAnn has completely transformed the way I work. The products are high quality and
            shipped fast!"
          </p>
          <p class="font-bold text-lg text-gray-800">John Doe</p>
          <p class="text-sm text-gray-500">Verified Buyer</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-lg max-w-xs">
          <p class="text-lg italic text-gray-600 mb-4">
            "I love the variety of products TechAnn offers. Always a great experience shopping
            here!"
          </p>
          <p class="font-bold text-lg text-gray-800">Jane Smith</p>
          <p class="text-sm text-gray-500">Verified Buyer</p>
        </div>
      </div>
    </section>

    <!-- Call to Action Section -->
    <section class="mt-20 bg-accent text-primary text-center py-12 rounded-lg shadow-lg">
      <h2 class="text-4xl font-semibold mb-4">Ready to Get Your Tech?</h2>
      <p class="text-xl mb-6">
        Browse through our top-rated products and start your next tech journey with us today!
      </p>
      <button
        class="bg-primary text-accent px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-hover transition-colors"
      >
        Start Shopping
      </button>
    </section>
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
      console.error('Failed to fetch products:', error)
    })
})
</script>

<style lang="scss" scoped>
/* Additional custom styles if needed */
</style>
