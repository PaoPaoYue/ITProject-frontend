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
      outerTags: {
        type: Array,
        default: () => []
      },

    },

    data: () => ({
      tags: [
        'All',
      ],
    }),

    computed: {
      allTags () {
        return this.tags.concat(this.outerTags)
      }
    },

    methods: {
      async getTags() {
        if (!this.$route.params.uid) return
        const [res, success]  = await this.$request.get("/api/user/tag/"+this.$route.params.uid)
          .catch(err=>console.log(err))
        if (success) {
          this.tags = this.tags.concat(res)
        }
        else {
          this.$emit('message', res.error.message || res.error, 'error')
        }
      }
    },
    mounted() {
      this.getTags()
    },
  }
</script>
