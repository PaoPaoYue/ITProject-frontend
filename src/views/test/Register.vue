<template>
<v-container class="mt-16 max-width=240 "
      justify="center">
<v-row
      class="mb-1"
      no-gutters
    >
<v-col cols="12" sm="3">
      </v-col>
      <v-col cols="12" sm="6">
        <br>
        <br>
      <base-info-card title="Become One of Use">
</base-info-card>
    <v-form ref="form" v-model="valid" :lazy-validation="lazy" @submit.prevent="submitregister">
    <v-text-field
      outlined
      dense
      single-line
      v-bind="$attrs"
      v-on="$listeners"

      v-model="username"
      :counter="20"
      :rules="[rules.required, rules.max,rules.min1]"
      label="UserName"
      hint="At least 3 characters,at most 20 characters"
    ></v-text-field>
    <v-text-field
      outlined
      dense
      single-line
      v-bind="$attrs"
      v-on="$listeners"

      v-model="email"
      label="E-mail"
      :rules="[rules.required, rules.max,rules.email]"
      :counter="20"
    ></v-text-field>
    <v-text-field
     outlined
      dense
      single-line
      v-bind="$attrs"
      v-on="$listeners"

      v-model="password"
      label="password"
      :rules="[rules.min,rules.max,rules.required,rules.num,rules.letter]"
      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
      :type="show1 ? 'text' : 'password'"
      hint="8-20 characters,At least contains one number and one letter"
      counter="20"
      @click:append="show1 = !show1"
    ></v-text-field>

    <v-text-field
      outlined
      dense
      single-line
      v-bind="$attrs"
      v-on="$listeners"

      v-model="confirmpassword"
      :rules="[rules.min,rules.max,samewithpassword,rules.required]"
      :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
      :type="show2 ? 'text' : 'password'"
      hint="must same with password"
      counter="20"
      @click:append="show2 = !show2"
      label="password again"
    ></v-text-field>
    <v-btn class="mr-4" :disabled="!valid" @click="submitregister">Register</v-btn>
    
  </v-form>
</v-col>
<v-col cols="12" sm="3">
      </v-col>
</v-row>
</v-container>
</template>

<script>
export default {
  name: 'Register',
  data: () => ({
    lazy: true,
    valid: false,
    username: '',
    email: '',
    password:'',
    confirmpassword:'',
    show1:false,
    show2:false,
    rules:{
      required: v=> !!v || 'Required.',
      min1: v => v.length>=3 || 'Min 3 characters',
      min: v => v.length>=8 || 'Min 8 characters',
      max: v => v.length<=20 || 'Max 20 characters',
      num: v=>{
      const pattern1 = /\d/;
      return pattern1.test(v) || 'do not contain number.'},  
      letter: v=>{
      const pattern2 = /[a-zA-Z]+/;
      return pattern2.test(v) || 'do not contain letter.'}, 
      email:v => {
      const pattern3 = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return pattern3.test(v) || 'Invalid e-mail.'},    
      }
    }),
    methods: {
      async submitregister() {
        if(this.$refs.form.validate()){
          let userinfo = {
            username: this.username, 
            password: this.password,
            email: this.email
          }
          const [res, success]  = await this.$request.post("/api/user/register", userinfo).catch(err=>
            console.log(err)
          )
          if (success) {
            this.info = 'success'
            this.$router.push('login')
            
          }
          else {
            alert('failed!,user already exist')
            this.info = res.error.message
          }
        }
    },
      samewithpassword(value){
        if(value==this.password){
          return true
        }
        else{
          return 'not same with password, please check'
        }
      },
    },

  }
</script>
