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
        <base-info-card title="Set Your Account">
</base-info-card>
     <v-row justify="center">
    <v-avatar color="indigo" size="100">
        <span class="white--text headline">Lux</span>
      </v-avatar>
     </v-row>
     <br>
    <form>
      <v-text-field
        outlined
        dense
        single-line
        v-bind="$attrs"
        v-on="$listeners"

        v-model="name"
        :counter="20"
        :rules="[rules.required, rules.max]"
        label="Display Name"
        hint="At most 20 characters"
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

        v-model="location"
        :counter="20"
        label="Location"
        :rules="[rules.required, rules.max]"
      ></v-text-field>
      <v-text-field
        outlined
        dense
        single-line
        v-bind="$attrs"
        v-on="$listeners"

        v-model="newpassword"
        :rules="[rules.min,rules.max]"
        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show1 ? 'text' : 'password'"
        name="newpassword"
        label="New Password"
        hint="At least 8 characters,At most 20 characters"
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
        :rules="[rules.min,rules.max,samewithpassword]"
        :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show2 ? 'text' : 'password'"
        name="confirmpassword"
        label="confirm Password"
        hint="At least 8 characters,At most 20 characters"
        counter="20"
        @click:append="show2 = !show2"
        ></v-text-field>
      <v-textarea
        outlined
        dense
        single-line
        v-bind="{
          rows: 6,
          ...$attrs,
        }"
        v-on="$listeners"

        v-model="description"
        label="Description"
      ></v-textarea>  
      <v-btn class="mr-4" @click="submit">submit</v-btn>
    </form>
</v-col>
<v-col cols="12" sm="3">
      </v-col>
</v-row>
</v-container>
</template>

<script>
export default {
    data () {
      return {
        name: '',
        location: [],
        email: '',
        description:'',
        newpassword:'',
        confirmpassword:'',
        show1:false,
        show2:false,
        rules:{
          required: v=> !!v || 'Required.',
          min: v => v.length>=8 || 'Min 8 characters',
          max: v => v.length<=20 || 'Max 20 characters',
          email:v => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(v) || 'Invalid e-mail.'},     
        }
      }
    },  
    mounted :async function() {
      if(this.$store.getters.isLogin){
        const [res, success]  = await this.$request.get("/api/user/account/"+this.$store.getters.uid).catch(err=>{
        console.log(err)})
        if(success){
          this.location = res.location
          this.name=res.displayName
          this.description=res.simpleDescription
          this.email=res.email
        }
        else{
          console.log(res.data)
          alert("user does not exist")
        }
      }
      else{
      alert('do not log in , please log in')
      this.$router.push('Login')  
      }
  },
    methods: {
      samewithpassword(value){
        if(value==this.newpassword){
          return true
        }
        else{
          return 'not same with password, please check'
        }
      },
      async submit () {
        let userinfo = {
          email:this.email,
          displayName:this.name,
          simpleDescription:this.description,
          description:"",
          avatar:"",
          location:this.location,
          phone:"",
          contactFacebook:"",
          contactLinkedin:"",
          contactGithub:""
        }
        const [res, success]  = await this.$request.post("/api/user/account/update", userinfo).catch(err=>{
        console.log(err)
        })
        if (success) {
          this.info = 'success'
          this.userDetails = res
          alert("success!")
          location.reload()
          
        }
        else {
            console.log(res.error.code)
            console.log(res.error.message)
            alert('failed')
        }
      },
    },
  }
</script>