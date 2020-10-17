<template>
  <base-info-card title="Posts Categories">
    <ul class="pl">
      <li class="mb-3" @click="searchBlog">Tech Blog</li>
      <li class="mb-3" @click="searchPdf">Parper Display</li>
      <!--<li
        v-for="category in categories"
        :key="category"
        class="mb-3"
        v-text="category"
      />-->
    </ul>
  </base-info-card>
</template>

<script>
  export default {
    name: 'NewsCategories',

    data: () => ({
    }),

    methods: {
      test(){
        alert("fine")
      },
      async searchBlog () {
        this.$router.push({path:"/posts"})
        this.loading = true
        this.$emit('message', 'loading...')
        const [res, success]  = await this.$request.get("api/search/post/"+this.$route.params.uid, {category:"blog"}).catch(err=>console.log(err))  
        if (success) {
          this.$emit('message', 'find results', 'success')
          //display the result
        }
        else {
          if (res.status === 422) {
            this.$emit('message', res.error.message, 'warn')
          }
          else {
            this.$emit('message', res.error, 'error')
          }
        }
      }, 
      async searchPdf () {
        this.$router.push({path:"/posts"})
        this.loading = true
        this.$emit('message', 'loading...')
        const [res, success]  = await this.$request.get("api/search/post/"+this.$route.params.uid, {category:"pdf"}).catch(err=>console.log(err))  
        if (success) {
          this.$emit('message', 'find results', 'success')
          //display the result
        }
        else {
          if (res.status === 422) {
            this.$emit('message', res.error.message, 'warn')
          }
          else {
            this.$emit('message', res.error, 'error')
          }
        }
      }
    },
  }
</script>
