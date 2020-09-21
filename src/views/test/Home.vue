<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img :src="require('@/assets/mylogo.png')" class="my-3" contain height="400" />
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col cols="12" class="mt-2">
        <h1 class="display-2 font-weight-bold mb-3">
          Welcome to Demo
        </h1>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: 'Home',
  components: {
  }
}
</script>
