<template>
  <div>
    <NavigationBar />

    <RouterView />
  </div>
</template>

<script setup>
import NavigationBar from './components/NavigationBar.vue'

import { RouterView } from 'vue-router'
import { onMounted } from 'vue'
import { useStore } from 'vuex'

onMounted(() => {
  const store = useStore()
  store.dispatch('fetchKeranjangs') // Fetch keranjangs when the app starts
})
</script>

<style lang="scss" scoped></style>
