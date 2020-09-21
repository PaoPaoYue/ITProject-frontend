<template>
  <v-container class="mt-16 max-width=240 "
      justify="center">
    <v-row
      class="mb-1"
      no-gutters
    >

      <v-col cols="12" sm="4"> 
        userid : {{$store.getters.uid}}
      </v-col>
      <v-col cols="12" sm="4">
        username : {{$store.getters.username}}
      </v-col>
      <v-col cols="12" sm="4">
        backend-data : {{student}}
      </v-col>
    </v-row>

  </v-container>
</template>

<script>

  export default {
    name: 'App',

    metaInfo: { title: 'Information' },

    data: () => ({
      student: {}
    }),

    methods: {
      async fetchStudent() {
        const [res, success] = await this.$request.get("/api/student/" + this.$store.getters.uid).catch(err=> {
          console.log(err)
        })
        if (success) 
          this.student = res
        else {
          if (res.status === 401) {
            console.log(res.error.message)
            this.$store.dispatch('logout')
            this.$router.push({name: 'Login', params: {info: 'Your login token is expired, please login again'}})
          } else if (res.status === 422) {
            console.log(res.error.code)
            console.log(res.error.message)
          }
        }
      }
    },

    mounted() {
      this.fetchStudent()
    },
  };
</script>
