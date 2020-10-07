<template>
  <div>

    <v-app-bar
      id="home-app-bar"
      app
      color="white"
      elevation="1"
      height="80"
    >
    <router-link
              :to="{
            name: 'Home'}"
            class="a">

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
<<<<<<< HEAD
            v-model="items"
            v-for="(name, i) in items"
=======
            v-for="(name, i) in navItems"
>>>>>>> 60612eb983e9b322d3748868333b42a92d879897
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
      :navItems="navItems"
    />
  </div>
</template>
<style>
  .a{
    text-decoration:none
  }
</style>

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
<<<<<<< HEAD
    mounted() {
        if(!this.$store.getters.islogin){
          this.items = [
            'Home',
            'Login',
            'Register',
          ];
        }else{
          this.items = [
            'Home',
=======

    computed: {
      navItems  () {
        if(!this.$store.getters.isLogin){
          return [
            'Home',
            'Login',
            'Register',
            //'Posts',
            //'AccountSetting', 
            //'AboutMeEdit',
          ];
        }else{
          return [
            'Home',
            //'Login',
            //'Register',
>>>>>>> 60612eb983e9b322d3748868333b42a92d879897
            'Profile',
            'Posts',
            'AccountSetting', 
            'AboutMeEdit',
          ];
        }
<<<<<<< HEAD

    },

  /* previous attributes
          'Home',
        // 'About',
        // 'Contact',
        'Login',
        'Register',
        'Profile',
        'Posts',
        'AccountSetting', 
        'AboutMeEdit',
        //'Marketing',
        //'Gallery',
        //'Pricing',
        //'News',
        //'Contact',
        //'LoginInfo'
  */
}
=======
      }
    },

    methods: {

    },
    

    mounted () {
      
    }
    /* previous attributes
            'Home',
          // 'About',
          // 'Contact',
          'Login',
          'Register',
          'Profile',
          'Posts',
          'AccountSetting', 
          'AboutMeEdit',
          //'Marketing',
          //'Gallery',
          //'Pricing',
          //'News',
          //'Contact',
          //'LoginInfo'
    */
  }
>>>>>>> 60612eb983e9b322d3748868333b42a92d879897
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
