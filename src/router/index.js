import { createRouter, createWebHistory } from 'vue-router'
import HomePageContent from '../views/HomePageContent.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePageContent
    },
  
  ]
})

export default router
