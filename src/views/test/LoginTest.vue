<template>

<v-container class="pt-16 max-width=260"

      justify="center"><br><br><br>
      <base-section-heading title="Welcome To Your Profile">
    </base-section-heading>
  <v-container class="">
 <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="login" >

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
            :rules="[rules.required, rules.max,rules.min1]"

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
            :rules="[rules.min,rules.max,rules.required]"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show1 ? 'text' : 'password'"
            @click:append="show1 = !show1"

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

      <v-container class="text-center">
          <v-btn class = "mr-3" :disabled="!valid" @click="login">Login</v-btn> 
          <router-link
              :to="{
            name: 'Register'}"
            class="a">
          <v-btn class="ml-3" @click="register">Register</v-btn> 
          </router-link>
      </v-container >
      </v-col>
    <v-col cols="12" sm="4">
        <!--{{info}}  "ml-7"-->
      </v-col>
    </v-row>
  </v-form>
  </v-container>

</v-container>
</template>
<style>
  .a{
    text-decoration:none
  }
</style>

<script>

export default {
  name: 'LoginTest',
  data: () => ({
    valid: false,
    username: '',
    password: '',
    show1:false,
    rules:{
          required: v=> !!v || 'Required.',
          min: v => v.length>=8 || 'Min 8 characters',
          min1: v => v.length>=3 || 'Min 3 characters',
          max: v => v.length<=20 || 'Max 20 characters',
      }

  }),
  props: {
    info: {
      type: String,
      default: 'please type'
    }
  },
  methods: {
    async login() {

      if(this.$refs.form.validate()){
        let userinfo = {
          username: this.username, 
          password: this.password
        }
        const [res, success]  = await this.$request.post("/api/user/login", userinfo).catch(err=>{
        console.log(err)
        })
        if (success) {
          this.info = 'success'
          this.userDetails = res
          this.$router.push('Profile')
      
        }
        else {
          if (res.status === 422) {
            alert('user does not exist or password incorrect')
          }
          else {
            console.log(res.status)
    }
}
    }

    },
    async logout() {
        this.$store.dispatch('logout')
    },
    //async register() {
    //    this.$router.push("register")
    //},
  },
}
</script>
