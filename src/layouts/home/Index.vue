<template>
  <v-app>
    <home-app-bar />

    <home-view />

    <home-footer />

    <!--<home-settings />-->

  </v-app>
</template>

<script>
  export default {
    name: 'HomeLayout',

    components: {
      HomeAppBar: () => import('@/layouts/home/AppBar'),
      HomeFooter: () => import('@/layouts/home/Footer'),
      HomeView: () => import('@/layouts/home/View'),
      //HomeSettings: () => import('@/layouts/home/Settings'),
    },
  }
</script>
