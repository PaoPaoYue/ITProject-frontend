<template>
  <section id="hero">
    <v-img
      :min-height="minHeight"
      :src="require('@/assets/BAhomepicture.jpg')"
      class="white--text"
      gradient="to right, rgba(5, 11, 31, .8), rgba(5, 11, 31, .8)"
    >
      <v-container class="fill-height px-4 py-12">
        <v-responsive
          class="d-flex align-center"
          height="100%"
          max-width="700"
          width="100%"
        >
          <base-heading title="DEVELOP YOUR FOLIO WITH DEVFOLIO" />
            <p>
              <br>
              Are you a developer, but can't find anywhere to showcase the projects you've been tirelessly working on for months? Well you've come to the right place!<br>
              DevFolio is a state-of-the-art platform for presenting your projects to a wider audience. you can showcase your best work, and edit it on-the-go, write blogs to talk about what makes your projects special, and vonnect with like-minded individuals and employers <br><br>
              So what are you waiting for?
            </p> 

          <div
            :class="$vuetify.breakpoint.smAndDown ? 'flex-column align-start' : 'align-center'"
            class="d-flex flex-wrap"
          >
          
          <span v-if="$store.getters.isLogin">
            <router-link :to="{name: 'MyProfile'}" class="text-decoration-none">
              <base-btn >
                  Back to your profile
              </base-btn>
            </router-link>
          </span>

          <span v-else>
            <router-link :to="{name: 'Login'}" class="text-decoration-none">
              <base-btn minWidth=0>
                Register
              </base-btn>
            </router-link>

            <span class="text-subtitle-1 font-weight-bold ml-4 mr-0 my-4">or</span>

            <router-link :to="{name: 'Explore'}" class="text-decoration-none">
              <base-btn
                :ripple="false"
                class="pa-1"
                height="auto"
                style="min-width:100px"
                text
              >
                Explore
              </base-btn>
            </router-link>
          </span>

          </div>
        </v-responsive>
      </v-container>
    </v-img>
  </section>
</template>

<script>
  export default {
    name: 'SectionHero',

    provide: {
      theme: { isDark: true },
    },

    computed: {
      minHeight () {
        const height = this.$vuetify.breakpoint.mdAndUp ? '100vh' : '50vh'

        return `calc(${height} - ${this.$vuetify.application.top}px)`
      },
    },
  }
</script>
