<template>
  <div class="text-center ma-2">
    <v-btn dark @click="snackbar = true">Open Snackbar</v-btn>
    <v-snackbar
      v-model="show"
      timeout=5000
    >
      {{ message }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="pink"
          text
          v-bind="attrs"
          @click="show = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
  export default {
    name: 'message',
    data: () => ({
      show: false,
      message: 'Hello, I\'m a snackbar',
    }),
  }
</script>