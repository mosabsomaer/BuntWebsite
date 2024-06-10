import { createRouter, createWebHistory } from 'vue-router'
import HomePageContent from '../views/HomePageContent.vue'
import FilesPages from '../views/FilesPage.vue'
import NotFound from '../views/NotFound.vue'
import TermsOfService from '@/views/TermsOfService.vue';
import PrivacyPolicy from '@/views/PrivacyPolicy.vue';
import testView from '@/views/testView.vue';
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
    {
      path: '/terms',
      name: 'TermsOfService',
      component: TermsOfService
    },
    {
      path: '/privacy',
      name: 'PrivacyPolicy',
      component: PrivacyPolicy
    },
    {
      path: '/test',
      name: 'testView',
      component: testView
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
