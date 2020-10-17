<template>
  <div>
    <v-form>
      <base-text-field
        v-model="keyword"
        append-icon="mdi-magnify"
        label="Search articles"
        @click:append="testIcon"
      />
    </v-form>
  </div>
</template>

<script>
  export default {
    name: 'NewsSearchBar',
    data: () => ({
      keyword: ''
    }),
    methods: {
      testIcon () {
        this.$router.push({path:"/posts"})
        // this.loading = true
        // this.$emit('message', 'loading...')
        // let userinfo = {
        //   username: this.username, 
        //   password: this.password,
        //   email: this.email
        // }
        // const [res, success]  = await this.$request.post("/api/user/register", userinfo)
        //   .catch(err=>console.log(err))

        // if (success) {
        //   this.$emit('message', 'register success', 'success')
        //   setTimeout(()=>this.$router.push('login'), 500) 
        // }
        // else {
        //   if (res.status === 422) {
        //     this.$emit('message', res.error.message, 'warn')
        //   }
        //   else {
        //     this.$emit('message', res.error, 'error')
        //   }
        // }
        // this.loading = false
      }   
    }
  }
  //@click="() => {}"
  //append-icon="mdi-magnify"
  //<v-icon large @click="() => {}">mdi-magnify</v-icon>
  
</script>
