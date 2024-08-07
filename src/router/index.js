import { createRouter, createWebHistory } from 'vue-router'
import HomePageContent from '../views/HomePageContent.vue'
import FilesPages from '../views/FilesPage.vue'
import NotFound from '../views/NotFound.vue'
import TermsOfService from '@/views/TermsOfService.vue';
import PrivacyPolicy from '@/views/PrivacyPolicy.vue';
import CodePage from '@/views/CodePage.vue';
import testView from '@/views/testView.vue';
import Login from '@/views/Login.vue';
import Post from '@/views/Post.vue';
import OrderTable from '@/views/Ordertable.vue';
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
    {
      path: '/code',
      name: 'CodePage',
      component: CodePage
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/posts',
      name: 'posts',
      component: Post
    },
    {
      path: '/ordertable',
      name: 'ordertable',
      component: OrderTable
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
