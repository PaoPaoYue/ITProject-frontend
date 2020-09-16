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
    name: 'LoginTest',
    component: () => import('../views/LoginTest.vue')
  }, 
  {
    path: '/profile',
    name: "Profile", 
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/register',
    name: "Register", 
    component: () => import('../views/Register.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
