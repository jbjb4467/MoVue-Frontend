import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import LandingPage from '@/views/LandingPage.vue'
import Login from '@/views/accounts/Login.vue'
import Signup from '@/views/accounts/Signup.vue'
import Community from '@/views/community/Community'
import CreateArticle from '@/views/community/CreateArticle'
import ArticleDetail from '@/views/community/ArticleDetail'
import UpdateArticle from '@/views/community/UpdateArticle'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'LandingPage',
    component: LandingPage
  },
  {
    path: '/home/',
    name: 'Home',
    component: Home
  },
  {
    path: '/accounts/login/',
    name: 'Login',
    component: Login
  },
  {
    path: '/accounts/signup/',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/community/article/',
    name: 'Community',
    component: Community
  },
  {
    path: '/community/article/:article_id/',
    name: 'ArticleDetail',
    component: ArticleDetail
  },
  {
    path: '/community/article/create',
    name: 'CreateArticle',
    component: CreateArticle
  },
  {
    path: '/community/article/:article_id/update',
    name: 'UpdateArticle',
    component: UpdateArticle
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
