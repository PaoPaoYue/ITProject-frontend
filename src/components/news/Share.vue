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
          v-for="(platform, i) in socialMedia"
          :key="i"
          href="#"
          class="text--primary d-inline-block ml-2"
          v-text="`${platform}${i + 1 < socialMedia.length ? ',' : ''}`"
        />
      </div>
    </v-row>

    <v-divider />
  </div>
</template>

<script>
  export default {
    name: 'NewsShare',

    data: () => ({
      socialMedia: [
        'Website',
        'Template',
        'Psd',
      ],
    }),
  }
</script>
