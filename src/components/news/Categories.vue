<template>
  <base-info-card title="Posts Categories">
    <ul class="pl">
      <li class="mb-3 category" @click="searchBlog">Tech Blog</li>
      <li class="mb-3 category" @click="searchPdf">Parper Display</li>
    </ul>
  </base-info-card>
</template>

<script>
  export default {
    name: 'NewsCategories',

    props: {
      uid: {
        type: [Number, String],
        default: 0
      }
    },

    methods: {
      async searchBlog () {
        await this.$store.dispatch('search', {type:'category', content:'blog'})
        if (this.$route.name != 'Posts')
          this.$router.push({name: 'Posts', params: {uid: this.uid}})
      }, 
      async searchPdf () {
        await this.$store.dispatch('search', {type:'category', content:'pdf'})
        if (this.$route.name != 'Posts')
          this.$router.push({name: 'Posts', params: {uid: this.uid}})
      }
    },
  }
</script>
<style>
  li.category:hover {
    cursor: pointer;
  }

</style>

