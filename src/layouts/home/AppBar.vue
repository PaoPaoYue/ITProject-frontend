<template>
  <div>

    <v-app-bar
      id="home-app-bar"
      app
      color="white"
      elevation="1"
      height="80"
    >
    <router-link :to="{name: 'Home'}" class="text-decoration-none">
      <base-img
        :src="require('@/assets/logo.svg')"
        class="mr-3 hidden-xs-only"
        contain
        max-width="52"
        width="100%"
      />
    </router-link>
      <!--
      <base-img
        :src="require('@/assets/mylogo.png')"
        class="mr-3 hidden-xs-only"
        contain
        max-width="52"
        width="100%"
      />
      -->

    <base-img
      :src="require('@/assets/zero-logo-light.svg')"
      contain
      max-width="128"
      width="100%"
    />
    <v-spacer />

    <div>
      <v-tabs
        class="hidden-sm-and-down"
        optional
      >
        <v-tab
          v-for="(name, i) in navItems"
          :key="i"
          :to="{ name }"
          :exact="name === 'Home'"
          :ripple="false"
          active-class="text--primary"
          class="font-weight-bold"
          min-width="96"
          text
        >
          {{ name }}
        </v-tab>
      </v-tabs>
    </div>

    <v-app-bar-nav-icon
      class="hidden-md-and-up"
      @click="drawer = !drawer"
    />
  </v-app-bar>

  <home-drawer
    v-model="drawer"
    :items="navItems"
  />
</div>
</template>

<script>
  export default {
    name: 'HomeAppBar',

    components: {
      HomeDrawer: () => import('./Drawer'),
    },

    data: () => ({
      drawer: null,
      itemsLeft:['Home']
    }),

    computed: {
      navItems  () {
        if(!this.$store.getters.isLogin){
          return [
            'Home',
            'Explore',
            'Login',
            'Register',
          ];
        }else{
          return [
            'Home',
            'Explore',
            'MyProfile',
            'Posts',
            'AccountSetting', 
            'AboutMeEdit',
          ];
        }
      }
    },
  }
</script>

<style lang="sass">
  #home-app-bar
    .v-tabs-slider
      max-width: 24px
      margin: 0 auto

    .v-tab
      &::before
        display: none
</style>
