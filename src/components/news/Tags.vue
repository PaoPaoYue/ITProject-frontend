<template>
  <base-info-card title="Top Tags">
    <v-row
      class="mb-10"
      dense
    >
      <v-col
        v-for="tag in allTags"
        :key="tag"
        cols="auto"
      >
        <v-btn
          class="text-capitalize"
          color="grey darken-2"
          outlined
          tile
          @click="searchTag(tag)"
        >
          {{ '# ' + tag }}
        </v-btn>
      </v-col>
    </v-row>

  </base-info-card>
</template>

<script>
  export default {
    name: 'NewsArchives',
    props: {
      uid: {
        type: [Number, String],
        default: 0
      }
    },

    data: () => ({
      tags: [
        'All',
      ],
    }),

    watch: {
      uid() {
        return this.getTags()
      }
    },

    methods: {
      async getTags() {
        if (!this.uid) return 
        const [res, success]  = await this.$request.get("/api/user/tag/"+this.uid)
          .catch(err=>console.log(err))
        if (success) {
          this.tags = this.tags.concat(res)
        }
        else {
          this.$emit('message', res.error.message || res.error, 'error')
        }
      },
      async searchTag(tag) {
        await this.$store.dispatch('search', {type:'tag', content:tag})
        if (this.$route.name != 'Posts')
          this.$router.push({name: 'Posts', params: {uid: this.uid}})

      }
    },
    mounted() {
      this.getTags()
    },
  }
</script>
