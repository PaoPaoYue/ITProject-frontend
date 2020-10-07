<template>
<v-container class="mt-16 max-width=240 "
      justify="center">
      <v-alert type="info" border="top" v-if="isloading" >
        loading.
      </v-alert>
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
       <img
          :src= "imgurl"
          alt="John"
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
          <input id="submitBtn" type="button" @click="uploadAvatar" value="submit">
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
        imgurl: '',
        show1:false,
        show2:false,
        isloading:false,
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
        this.isloading=true
        const [res, success]  = await this.$request.get("/api/user/account/"+this.$store.getters.uid).catch(err=>{
        console.log(err)})
        if(success){
          this.location = res.location
          this.name=res.displayName
          this.description=res.simpleDescription
          this.email=res.email
          if(res.avatar==""){
            this.imgurl="https://imgtestbucket-1302787472.cos.ap-nanjing.myqcloud.com/defaultimg.jpg"
          }
          else{
            this.imgurl=res.avatar
          }
          
        }
        else{
          console.log(res.data)
          alert("user does not exist")
        }
      }
      else{
      alert('not log in , please log in')
      this.$router.push('Login')  
      }
      this.isloading=false
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
        this.isloading=true
        let userinfo = {
          email:this.email,
          displayName:this.name,
          simpleDescription:this.description,
          description:"",
          avatar:this.imgurl,
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
        }
        else {
            this.isloading=false
            console.log(res.error.code)
            console.log(res.error.message)
            alert('failed')
        }
        if(this.newpassword!=""){
          let changepass={
            password: this.newpassword
          }
        const [res, success]  = await this.$request.post("/api/user/password/update", changepass).catch(err=>{
        console.log(err)})
        if (success) {
          this.info = 'success'
        }
        else {
          if(res.status === 422){
            alert("new password cannot be the same as the old one")}
          else{
            console.log(res.error.code)
            console.log(res.error.message)
            alert('failed')
            }
          }
        }
        this.isloading=false
        location.reload() 
      },
      async uploadAvatar() {
        const file=document.getElementById('fileSelector').files[0]
        const [res, success] = await this.$request.uploadImg(file,`${this.$store.getters.uid}`)
          .catch(err => {
            console.log(err)
          })
        if (success) {
          // return display url
          console.log("upload success")
          this.avatar = res
        }
        else {
          if (res.status === 401)
            this.$router.push('login')
        }
      },
      getCos() {
    var COS = require('cos-js-sdk-v5')
    this.cosClient = new COS({
        getAuthorization: (options, callback) => {
          this.$request.get('/api/cos/sts/img').then((res) => {
            if (res[1]) {
              callback({
                TmpSecretId: res[0].credentials.tmpSecretId,
                TmpSecretKey: res[0].credentials.tmpSecretKey,
                XCosSecurityToken: res[0].credentials.sessionToken,
                StartTime: res[0].startTime,
                ExpiredTime: res[0].expiredTime,
              });
            }
          }).catch(() => {
            this.loading = false;
          });
        },
    });
},
uploadFile() {
  this.isloading=true
  const file=document.getElementById('fileSelector').files[0];
  Promise
    .all([this.getCos()]) 
    .then((md5) => {
      this.bucketPath = `${this.$store.getters.uid}`; 
      this.putObject([this.bucketPath, file]);
    });
},
putObject([key, file]) {
    this.cosClient.putObject({
        Bucket: 'imgtestbucket-1302787472', 
        Region: 'ap-nanjing', 
        Key: key, 
        StorageClass: 'STANDARD',
        Body: file,
    }, (err, data) => {
        if (data) {
          const url = this.cosClient.getObjectUrl({
            Bucket: 'imgtestbucket-1302787472',
            Region: 'ap-nanjing',
            Key: key,
        });
        this.imgurl=url.replace("http","https")
        this.submit()
        }
        else {
          console.log(err)    
        }
    });
},
    },
  }
</script>