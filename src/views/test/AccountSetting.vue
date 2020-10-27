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
          :src= "avatar"
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
        :rules="[rules.required, rules.max,rules.email]"
        :counter="20"
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
      <v-content>
        <v-container id="mapzone" fluid fillheight style="height:200px"></v-container>
      </v-content>
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
      avatar: '',
      show1:false,
      show2:false,
      isloading:false,
      changeavater:false,
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
    //this.initMap("mapzone");
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
          this.avatar="https://imgtestbucket-1302787472.cos.ap-nanjing.myqcloud.com/defaultimg.jpg"
        }
        else{
          this.avatar=res.avatar
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
      var ipos = this.avatar.indexOf("?");
      if(ipos!=-1){
          this.avatar=this.avatar.substring(0,ipos)}
      let userinfo = {
        email:this.email,
        displayName:this.name,
        simpleDescription:this.description,
        description:"",
        avatar:this.avatar,
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
      this.isloading=true
      const file=document.getElementById('fileSelector').files[0]
      const [res, success] = await this.$request.uploadImg(file,'avatar.'+file.name.split('.').pop())
        .catch(err => {
          console.log(err)
        })
      if (success) {
        // return display url
        console.log("upload success" + res.location)
        this.avatar = res.location
      }
      else {
        console.log(res)
        if (res.status === 401)
          this.$router.push('login')
      }
      this.isloading=false
    },
    // initMap(mapid) {
    //   const map = new google.maps.Map(document.getElementById(mapid), {
    //     center: { lat: -0, lng: 160 },
    //     zoom: 1,
        // streetViewControl: false,
        // zoomControl:false,
        // disableDoubleClickZoom:false,
        // draggable:false,
        // keyboardShortcuts:false,
        // mapTypeControl:false,
        // clickableIcons:false,
        // fullscreenControl: false,
        // gestureHandling: "none",
        // mapTypeId: "roadmap",
        // alt: "Location"
    //   }); //Options: https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions

    //   // Create the search box and link it to the UI element.
    //   const input = document.getElementById("inputLocation");
    //   const autocomplete = new google.maps.places.Autocomplete(input);
    //   autocomplete.setTypes(["(cities)"]) // check: https://developers.google.com/maps/documentation/javascript/reference/places-widget#Autocomplete
    //   autocomplete.setFields(["geometry", "name", "address_components", "formatted_address"])//returned address restriction
    //   // Listen for the event fired when the user selects a prediction and retrieve
    //   // more details for that place.
    //   autocomplete.addListener("place_changed", () => {
    //     const places = autocomplete.getPlace();
    //     if (places.length == 0) {
    //       return;
    //     }
    //     const bounds = new google.maps.LatLngBounds();
    //     this.location = places.formatted_address
    //     if (places.geometry.viewport) {
    //         // Only geocodes have viewport.
    //         bounds.union(places.geometry.viewport);
    //       } else {
    //         bounds.extend(places.geometry.location);
    //       }
    //     map.fitBounds(bounds);
    //     const locIcon="https://i.loli.net/2020/10/07/34gPrnf9YxK1kBV.png"
    //     const marker = new google.maps.Marker({
    //       position: places.geometry.location,
    //       map,
    //       title: "location",
    //       icon: locIcon
    //     });
    //     marker.setMap(map);
    //   });
    // }
  }
}
</script>
