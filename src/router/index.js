import { createRouter, createWebHistory } from 'vue-router'
import HomePageContent from '../views/HomePageContent.vue'
import FilesPages from '../views/FilesPage.vue'
import NotFound from '../views/NotFound.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: HomePageContent
    },
    {
      path: '/files',
      name: 'FilesPages',
      component: FilesPages
    },
  //redirect
  {
    path: '/',
    redirect: '/home'
  },
  //catch all 404
  {
    path:'/:catchAll(.*)',
    name: 'NotFound',
    component:NotFound
  }
  ]
})

export default router
