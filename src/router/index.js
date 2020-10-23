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
        {
          path: 'login',
          name: 'Login',
          component: () => import('@/views/login/Index.vue'),
          props: true
        },
        {
          path: 'explore',
          name: 'Explore',
          component: () => import('@/views/explore/Index.vue'),
          props: true,
          meta: { src: require('@/assets/contact.jpg') },
        },
        {
          path: 'register',
          name: 'Register',
          component: () => import('@/views/register/Index.vue'),
          props: true
        },
        {
          path: 'profile',
          name: 'MyProfile',
          redirect: () => {
            if (store.getters.isLogin) return {name:'Profile', params:{uid:store.getters.uid}}
            else return 'login'
          }
        },
        {
          path: 'profile/:uid',
          name: 'Profile',
          component: () => import('@/views/profile/Index.vue'),
          meta: { src: require('@/assets/marketing.jpg') },
        },
        {
          path: 'posts',
          name: 'MyPosts',
          redirect: () => {
            if (store.getters.isLogin) return {name:'Posts', params:{uid:store.getters.uid}}
            else return 'posts'
          },
          meta: { src: require('@/assets/marketing.jpg') },
        },
        {
          path: 'posts/:uid',
          name: 'Posts',
          component: () => import('@/views/posts/Index.vue'),
          meta: { src: require('@/assets/marketing.jpg') },
        },
        {
          path: 'accountSetting',
          name: 'AccountSetting',
          component: () => import('@/views/test/AccountSetting'),
          props: true
        },
        {
          path: 'aboutMeEdit',
          name: 'AboutMeEdit',
          component: () => import('@/views/test/AboutMeEdit'),
          props: true
        },
        {
          path: 'news',
          name: 'News',
          component: () => import('@/views/news/Index.vue'),
          meta: { src: require('@/assets/news.jpg') },
        },
        {
          path: 'news/:slug',
          name: 'Article',
          component: () => import('@/views/news/Article.vue'),
          meta: { src: require('@/assets/article.jpg') },
        },
        {
          path: 'notLogin',
          name: 'NotLogin',
          component: () => import('@/views/401/Index.vue'),
        },
        {
          path: 'maps',
          name: 'Map',
          component: () => import('@/views/test/MapDemo.vue'),
        },
        {
          path: 'yt',
          name: 'VideoUpload',
          component: () => import('@/views/test/VideoUpload.vue'),
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
  if (to.matched.some(route => route.meta.checkLogin)) {
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
