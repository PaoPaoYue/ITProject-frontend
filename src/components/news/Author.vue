<template>
  <v-list-item class="py-12 px-0">
    <v-avatar
      class="mr-6"
      color="grey lighten-1"
      size="128"
    >
      <v-img :src="src" />
    </v-avatar>

    <v-list-item-content>
      <v-list-item-title
        class="mb-3 title text-uppercase"
        v-text="name"
      />
      <base-body
        :text="blurb"
        space="3"
      />

      <div class="mx-n2">
        <v-icon
          v-for="icon in icons"
          :key="icon"
          class="px-2"
          small
          @click="() => {}"
          v-text="icon"
        />
      </div>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
  export default {
    name: 'NewsAuthor',

    props: {
      name: String,
      blurb: String,
      src: String,
    },

    data: () => ({
      icons: [
        'mdi-twitter',
        'mdi-facebook',
        'mdi-github',
        'mdi-snapchat',
      ],
    }),
  }
</script>
