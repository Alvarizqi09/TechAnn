<template>
  <div class="card card-compact bg-accent w-64 shadow-xl">
    <figure>
      <img :src="product.gambar" alt="gambar" />
    </figure>
    <div class="card-body">
      <h2 class="card-title text-white font-semibold text-2xl">{{ product.nama }}</h2>
      <p class="text-white text-lg">Harga : {{ product.harga }}</p>
      <div class="card-actions justify-end mt-6">
        <RouterLink :to="'/product/' + product.id">
          <button class="btn btn-sm">
            <i class="fa-solid fa-cart-shopping"></i>
            <p class="text-sm">Add Now</p>
          </button>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { defineProps } from 'vue'

const { product } = defineProps({
  product: {
    type: Object,
    required: true
  }
})
</script>
