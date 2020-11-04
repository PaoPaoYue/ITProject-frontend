<template>
  <div>
    <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="searchTitle">
      <base-text-field
        v-model="keyword"
        append-icon="mdi-magnify"
        label="Search articles"
        :rules="[rules.max]"
        @click:append="searchTitle"
      />
    </v-form>
  </div>
</template>

<script>
  export default {
    name: 'NewsSearchBar',
    props: {
      uid: {
        type: [Number, String],
        default: 0
      }
    },
    data: () => ({
      valid: true,
      rules: {
        max: v => (v && v.length<=200) || 'Maximum 200 characters.',
      },
      keyword: ''
    }),
    methods: {
      async searchTitle () {
        if (!this.$refs.form.validate()) return
        if (this.keyword) 
          await this.$store.dispatch('search', {type:'title', content:this.keyword})
        if (this.$route.name != 'Posts')
          this.$router.push({name: 'Posts', params: {uid: this.uid}})
      }
    }
  }
  
</script>
