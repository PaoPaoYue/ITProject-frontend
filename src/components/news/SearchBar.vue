<template>
  <div>
    <v-form>
      <base-text-field
        v-model="keyword"
        append-icon="mdi-magnify"
        label="Search articles"
        @click:append="searchTitle"
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
      searchTitle () {
        this.$router.push({path:"/posts"})
        this.loading = true
        this.$emit('message', 'loading...')
        const [res, success]  = await this.$request.get("api/search/post"+this.uid, {title:this.keyword})
          .catch(err=>console.log(err))

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
        this.loading = false
      }   
    }
  }
  
</script>
