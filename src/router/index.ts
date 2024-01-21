import { createRouter, createWebHistory } from 'vue-router'
import ScreenView from '../views/ScreenView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'screen',
      component: ScreenView
    }
  ]
})

export default router
