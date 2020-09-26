<template>
  <base-info-card title="Top Tags">
    <v-row
      class="mb-10"
      dense
    >
      <v-col
        v-for="tag in tags"
        :key="tag"
        cols="auto"
      >
        <v-btn
          class="text-capitalize"
          color="grey darken-2"
          outlined
          tile
        >
          {{ tag }}
        </v-btn>
      </v-col>
    </v-row>

    <!--<base-img
      :src="require('@/assets/tags.jpg')"
      color="grey lighten-1"
      height="250"
      tile
      width="100%"
    />
    -->
  </base-info-card>
</template>

<script>
  export default {
    name: 'NewsArchives',
    data: () => ({
      tags: [
        '# All',
        '# Spring  Boot',
        '# Vue.js',
        '# Vuetify',
        '# JavaScipt',
        '# MySQL',
        '# Java',
        '# Gradle',
        '# Docker',
        "# HTML", 
        "# CSS"
      ],
    }),
  }
</script>
