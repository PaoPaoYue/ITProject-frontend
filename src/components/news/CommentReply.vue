<template>
  <base-info-card title="Leave a Reply">
    <v-row>
      <v-col
        cols="12"
        md="6"
      >
        <base-text-field label="Name" />

        <base-text-field label="Email" />

        <base-text-field label="Phone" />
      </v-col>

      <v-col
        cols="12"
        md="6"
      >
        <base-textarea
          rows="6"
          label="Message"
        />
      </v-col>

      <v-col
        class="py-0"
        cols="12"
      >
        <base-btn>Submit Comment</base-btn>
      </v-col>
    </v-row>
  </base-info-card>
</template>

<script>
  export default {
    name: 'CommentReply',

    data: () => ({

    }),
  }
</script>
