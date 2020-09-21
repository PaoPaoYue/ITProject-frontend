// Imports
import Vue from 'vue'
import Router from 'vue-router'

import store from '../store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: (to, from, savedPosition) => {
    if (to.hash) return { selector: to.hash }
    if (savedPosition) return savedPosition

    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/home/Index.vue'),
      children: [
        {
          path: '',
          name: 'Home',
          component: () => import('@/views/home/Index.vue'),
        },
        // {
        //   path: 'about',
        //   name: 'About',
        //   component: () => import('@/views/about/Index.vue'),
        //   meta: { src: require('@/assets/about.jpg') },
        // },
        // {
        //   path: 'contact-us',
        //   name: 'Contact',
        //   component: () => import('@/views/contact-us/Index.vue'),
        //   meta: { src: require('@/assets/contact.jpg') },
        // },
        {
          path: 'login',
          name: 'Login',
          component: () => import('@/views/test/LoginTest'),
          props: true
        },
        {
          path: 'Register',
          name: 'Register',
          component: () => import('@/views/test/Register'),
          props: true
        },
        {
          path: 'Profile',
          name: 'Profile',
          component: () => import('@/views/test/Profile'),
          props: true
        },
        {
          path: 'AccountSetting',
          name: 'AccountSetting',
          component: () => import('@/views/test/AccountSetting'),
          props: true
        },
        {
          path: 'AboutMeEdit',
          name: 'AboutMeEdit',
          component: () => import('@/views/test/AboutMeEdit'),
          props: true
        },
        {
          path: 'loginInfo',
          name: 'LoginInfo',
          component: () => import('@/views/test/LoginInfo'),
          meta: { checkLogin: true }
        },
        {
          path: '*',
          name: 'FourOhFour',
          component: () => import('@/views/404/Index.vue'),
        },
      ],
    },

  ],
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.checkLogin)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters.isLogin) {
      next({
        name: 'Login',
        params: { info: 'You have not login, please login' }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
