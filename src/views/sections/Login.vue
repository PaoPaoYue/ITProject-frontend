<template>
  <base-section id="login-form">
    <v-container class="py-16" >
      <base-section-heading title="Welcome To Your Profile">
      </base-section-heading>

        <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="login" >
          <v-row
            class="mb-3"
            no-gutters
          >
            <v-spacer></v-spacer>
            <v-col cols="12" md="4">
              <v-text-field
                label="username"
                placeholder="username"
                v-model="username"
                :rules="[rules.required, rules.max, rules.min1, rules.username]"
                outlined
                max-width="260px"
              >
              </v-text-field>
            </v-col>
            <v-spacer></v-spacer>
          </v-row>
          <v-row
            class="mb-3"
            no-gutters
          >
            <v-spacer></v-spacer>
            <v-col cols="12" md="4">
              <v-text-field
                label="password"
                placeholder="password"
                v-model="password"
                :rules="[rules.required, rules.min, rules.max, rules.password]"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                @click:append="showPassword = !showPassword"
                outlined
              ></v-text-field>
            </v-col>
            <v-spacer></v-spacer>
          </v-row>
          <v-row
            class="mb-3"
            no-gutters
          >
            <v-spacer></v-spacer>
            <v-col cols="12" md="4" class="text-center">
                <v-btn x-large class = "mr-4" min-width="130px" :disabled="!valid || loading" @click.stop="login"> Login </v-btn> 
                <v-btn x-large class = "ml-4" min-width="130px" @click.stop="register"> Register </v-btn> 
            </v-col>
            <v-spacer></v-spacer>
          </v-row>
        </v-form>

    </v-container>
  </base-section>
</template>

<script>

const usernamePattern = /^\w{3,20}$/
const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)\w{8,20}$/

export default {
  name: 'LoginForm',
  data: () => ({
    valid: false,
    username: '',
    password: '',
    showPassword: false,
    loading: false,
    rules:{
      required: v=> !!v || 'This field must not be empty.',
      min: v => v.length>=8 || 'Minimum 8 characters',
      min1: v => v.length>=3 || 'Minimum 3 characters',
      max: v => v.length<=20 || 'Maximum 20 characters',
      username: v => usernamePattern.test(v) || 'Contains only letters, digits and underscores.',
      password: v => passwordPattern.test(v) || 'At least one letter and one digit, must not have other symbols except underscores.',    
      }
  }),
  methods: {
    async login() {
      if(this.$refs.form.validate()){
        this.loading = true
        this.$emit('message', 'loading...')
        let userinfo = {
          username: this.username, 
          password: this.password
        }
        const [res, success]  = await this.$request.post("/api/user/login", userinfo)
          .catch(err=>console.log(err))

        if (success) {
          this.$emit('message', 'login success', 'success')
          setTimeout(()=>{this.$router.push('profile')}, 500) 
        }
        else {
          if (res.status === 422) {
            this.$emit('message', res.error.message, 'warn')
          }
          else {
            this.$emit('message', res.error, 'error')
          }
        }
        this.loading = false
      }
    },
    register() {
       this.$router.push("register")
    },
  },
}
</script>
