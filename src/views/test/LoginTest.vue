<template>
<v-container class="mt-16 max-width=240 "
      justify="center">
  <v-form ref="form" v-model="valid" :lazy-validation="lazy" @submit.prevent="login" >
    <v-row
      class="mb-1"
      no-gutters
    >
    <v-col cols="12" sm="4">
      </v-col>
    <v-col cols="12" sm="4">
      <v-text-field
            label="username"
            placeholder="username"
            v-model="username"
            required
            outlined
          ></v-text-field>
      </v-col>
      <v-col cols="12" sm="4">
      </v-col>
    </v-row>
    <v-row
      class="mb-3"
      no-gutters
    >
    <v-col cols="12" sm="4">
      </v-col>
    <v-col cols="12" sm="4">
          <v-text-field
            label="password"
            placeholder="password"
            v-model="password"
            required
            outlined
          ></v-text-field>
      </v-col>
      <v-col cols="12" sm="4">
      </v-col>
    </v-row>
        <v-row
      class="mb-3"
      no-gutters
    >
    <v-col cols="12" sm="4">
      </v-col>
    <v-col cols="12" sm="4">
          <v-btn class = "ml-7" @click="login">Login</v-btn> 
          <v-btn class = "ml-7" @click="logout">Logout</v-btn> 
      </v-col>
      <v-col cols="12" sm="4">
        {{info}}
      </v-col>
    </v-row>
  </v-form>
</v-container>
</template>

<script>

export default {
  name: 'LoginTest',
  data: () => ({
    lazy: true,
    valid: false,
    username: '',
    password: '',
  }),
  props: {
    info: {
      type: String,
      default: 'please type'
    }
  },
  methods: {
    async login() {
        let student = {
          username: this.username, 
          password: this.password
        }
        const [res, success]  = await this.$request.post("/api/student/login", student).catch(err=>
          console.log(err)
        )
        if (success) {
          this.info = 'success'
          this.$router.push('loginInfo')
        }
        else {
          this.info = res.error.message
        }
    },
    async logout() {
        this.$store.dispatch('logout')
    },
  },

}
</script>
