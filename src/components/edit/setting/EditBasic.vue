<template>
  <v-card
  color="accent"
  dark
  tile
  flat
  class="text-center pa-2 mx-auto"
  >
    <template>
    <v-row justify="center">
    <v-avatar color="indigo" size="100">
      <img
        :src= "avatar"
      >
    </v-avatar>
    </v-row>
    <v-row justify="center">
      <v-file-input
      accept="image/png, image/jpeg, image/bmp"
      placeholder="Pick a new avatar"
      prepend-icon="mdi-camera"
      id="fileSelector"  
      name="filename"></v-file-input>
    <v-btn @click="uploadAvatar">upload</v-btn>
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
          :rules="[rules.required,rules.email]"
      ></v-text-field>
      <v-text-field
          outlined
          dense
          single-line
          v-bind="$attrs"
          v-on="$listeners"
          id="inputLocation"
          v-model="location"
          :counter="20"
          label="Location"
          :rules="[rules.required, rules.max]"
          ></v-text-field>
    </form>
    </template>
    </v-card>  
</template>

<script>
export default {
  name: 'EditBasic',
  props: {
      
  },

  data() {
    return {
      valid: true,
      name: '',
      location: [],
      email: '',
      avatar:'',
      rules:{
        required: v=> !!v || 'Required.',
        min: v => v.length>=8 || 'Min 8 characters',
        max: v => v.length<=20 || 'Max 20 characters',
        email:v => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(v) || 'Invalid e-mail.'},     
      },
    }
  },
    mounted :async function() {
      //this.initMap("mapzone");
      if(this.$store.getters.isLogin){
        const [res, success]  = await this.$request.get("/api/user/account/"+this.$store.getters.uid).catch(err=>{
          console.log(err)})
        if(success){
          this.location = res.location
          this.name=res.displayName
          this.email=res.email
          if(res.avatar==""){
            this.avatar="https://imgtestbucket-1302787472.cos.ap-nanjing.myqcloud.com/defaultimg.jpg"
          }
          else{
            this.avatar=res.avatar
          }
        }
        else{
          console.log(res.data)
          this.$emit('message', 'user does not exist', 'warn')
        }
      }
      else{
      this.$emit('message', 'please log in', 'warn')
      this.$router.push('Login')  
      }
  },
    methods: {
      async uploadAvatar() {
        const file=document.getElementById('fileSelector').files[0]
        const [res, success] = await this.$request.uploadImg(file,'avatar.'+file.name.split('.').pop())
          .catch(err => {
            console.log(err)
          })
        if (success) {
          // return display url
          console.log("upload success" + res.location)
          this.$emit('message', 'new avatar uploaded!')
          this.avatar = res.location
        }
        else {
          console.log(res)
          if (res.status === 401)
            this.$emit('message', 'please log in', 'warn')
            this.$router.push('login')
        }
      },
      },
}
</script>