import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/demo',
    name: 'Demo',
    component: () => import('../views/Demo.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/logintest',
    name: 'About',
    component: () => import('../views/LoginTest.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
