<template>
  <div>
    <v-divider />

    <v-row
      align="center"
      class="ma-0 pa-4"
    >
      <div>
        <v-avatar
          class="mr-3"
          size="40"
        >
          <v-icon
            class="primary"
            dark
          >
            mdi-share-variant
          </v-icon>
        </v-avatar>

        <span class="d-inline-block body-1 font-weight-bold">Share Post</span>
      </div>

      <v-spacer />

      <div>
        <a
          text
          href="javascript:void(0);"
          class="primary--text  d-inline-block ml-2"
          v-clipboard:copy="url"
          v-clipboard:success="onCopy"
          v-clipboard:error="onError"
          v-text="'Copy Link'"
        />
      </div>
    </v-row>

    <v-divider />
  </div>
</template>

<script>
  export default {
    name: 'NewsShare',
    computed: {
      url() {
        return location.href
      }
    },
    methods: {
      onCopy: function () {
        this.$emit('message', 'link of this post is copied to your clipboard!', 'success')
      },
      onError: function (e) {
        this.$emit('message', e, 'error')
      }
    }
  }
</script>
