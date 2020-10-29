<template>
  <base-section id="register-form">
    <v-container >
      <base-section-heading title="Become One of Us">
      </base-section-heading>

      <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="sumbitRegister">
        <v-row
          class="mb-3"
          no-gutters
        >
          <v-spacer></v-spacer>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="username"
              :counter="20"
              :rules="[rules.required, rules.max, rules.min1, rules.username]"
              label="Username"
              hint="At least 3 characters, at most 20 characters"
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
          <v-col cols="12" md="4">
            <v-text-field
              v-model="email"
              label="E-mail"
              :rules="[rules.required, rules.max1, rules.email]"
              :counter="255"
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
          <v-col cols="12" md="4">
            <v-text-field
              v-model="password"
              label="Password"
              :rules="[rules.required, rules.min, rules.max, rules.password]"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              hint="8-20 characters, at least one number and one letter"
              counter="20"
              @click:append="show1 = !show1"
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
          <v-col cols="12" md="4">
            <v-text-field
              v-model="confirmPassword"
              label="Confirm Password"
              :rules="[rules.required, rules.min, rules.max, checkConfirmPassword]"
              :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show2 ? 'text' : 'password'"
              counter="20"
              @click:append="show2 = !show2"
              outlined
            ></v-text-field>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>

        <v-row
          class="mb-3 text-center"
          no-gutters
        >
          <v-col class="text-center">
            <v-btn x-large :disabled="!valid || loading" @click="sumbitRegister">Register</v-btn>
          </v-col>
        </v-row>
      </v-form>

    </v-container>
  </base-section>
</template>

<script>

  const usernamePattern = /^\w{3,20}$/
  const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)\w{8,20}$/

  export default {
    name: 'RegisterForm',

    data: () => ({
      valid: false,
      username: '',
      email: '',
      password:'',
      confirmPassword:'',
      show1:false,
      show2:false,
      rules:{
        required: v=> !!v || 'This field must not be empty.',
        min1: v => v.length>=3 || 'Minimum 3 characters.',
        min: v => v.length>=8 || 'Minimum 8 characters.',
        max1: v => v.length<=255 || 'Maximum 255 characters.',
        max: v => v.length<=20 || 'Maximum 20 characters.',
        username: v => usernamePattern.test(v) || 'Contains only letters, digits and underscores.',
        email:v => emailPattern.test(v) || 'Invalid e-mail.',    
        password: v => passwordPattern.test(v) || 'At least one letter and one digit, must not have other symbols except underscores.',
      },
      loading: false
    }),
    methods: {
      async sumbitRegister() {
        if(this.$refs.form.validate()){
          this.loading = true
          this.$emit('message', 'loading...')
          let userinfo = {
            username: this.username, 
            password: this.password,
            email: this.email
          }
          const [res, success]  = await this.$request.post("/api/user/register", userinfo)
            .catch(err=>console.log(err))

          if (success) {
            this.$emit('message', 'register success', 'success')
            setTimeout(()=>this.$router.push('login'), 500) 
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
      checkConfirmPassword (v) {
        return v === this.password || 'Must be the same as the first password, please check.'
      }
    },
  }
</script>
