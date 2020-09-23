<template>
  <v-list-item
    :style="styles"
    class="mb-2 px-0"
  >
    <v-avatar
      class="mr-6 align-self-start mt-2"
      color="grey lighten-1"
      size="96"
    >
      <v-img :src="src" />
    </v-avatar>

    <v-list-item-content>
      <v-list-item-title
        class="title text-uppercase mb-2"
        v-text="name"
      />

      <v-list-item-subtitle class="mb-3">
        15th Oct 2015 - 10.45 AM&nbsp;—&nbsp;
        <a
          href="#"
          class="text--primary"
        >
          Reply
        </a>
      </v-list-item-subtitle>

      <base-body
        :text="comment"
        space="4"
      />

      <v-divider />
    </v-list-item-content>
  </v-list-item>
</template>

<script>
  export default {
    name: 'NewsAuthor',

    props: {
      comment: String,
      date: String,
      name: String,
      reply: Boolean,
      src: String,
    },

    computed: {
      styles () {
        return {
          marginLeft: this.reply ? `${96 + (6 * 4)}px` : undefined,
        }
      },
    },
  }
</script>
