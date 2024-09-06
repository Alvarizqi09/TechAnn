<template>
  <div class="navbar w-full shadow-md justify-between items-center flex">
    <div>
      <RouterLink to="/" class="ml-14 font-extrabold text-xl">
        Tech<span class="text-accent">An</span>
      </RouterLink>
    </div>
    <div class="justify-center items-center flex">
      <ul class="menu menu-horizontal px-1">
        <li class="active:border-b-2"><RouterLink to="/about">About</RouterLink></li>
        <li class="active:border-b-2"><RouterLink to="/product">Product</RouterLink></li>
      </ul>
    </div>
    <div class="flex-none">
      <div class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
          <div class="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span class="badge badge-sm indicator-item bg-accent border-none text-black">
              {{ jumlahPesanans }}
            </span>
          </div>
        </div>
        <div
          tabindex="0"
          class="card card-compact dropdown-content border bg-white border-accent z-[1] mt-3 w-52 shadow"
        >
          <div class="card-body">
            <span class="text-sm text-black font-bold">
              jumlah pesanan : {{ jumlahPesanans }} items
            </span>
            <div class="card-actions">
              <RouterLink to="/checkout">
                <button class="btn btn-success btn-sm btn-block">View Chart</button>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

onMounted(() => {
  store.dispatch('fetchKeranjangs')
})

const jumlahPesanans = computed(() => store.getters.jumlahPesanans)
</script>
