import { createRouter, createWebHistory } from 'vue-router'

import ProductVue from '@/components/ProductVue.vue'
import CheckOutVue from '@/components/CheckOutVue.vue'
import HomeView from '@/views/HomeView.vue'
import DetailVue from '@/components/DetailVue.vue'
import AboutVue from '@/pages/AboutVue.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'HomeView',
      component: HomeView
    },
    {
      path: '/product',
      name: 'product',
      component: ProductVue
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: CheckOutVue
    },
    {
      path: '/product/:id',
      name: 'Detail',
      component: DetailVue
    },
    {
      path: '/about',
      name: 'About',
      component: AboutVue
    }
  ]
})

export default router
