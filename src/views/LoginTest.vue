<template>
<v-container class="mt-16 max-width=240 "
      justify="center">
  <form>
    <v-row
      class="mb-1"
      no-gutters
    >
    <v-col cols="12" sm="4">
      </v-col>
    <v-col cols="12" sm="4">
      <v-text-field
            label="username"
            placeholder="username"
            outlined
          ></v-text-field>
      </v-col>
      <v-col cols="12" sm="4">
      </v-col>
    </v-row>
    <v-row
      class="mb-3"
      no-gutters
    >
    <v-col cols="12" sm="4">
      </v-col>
    <v-col cols="12" sm="4">
          <v-text-field
            label="password"
            placeholder="password"
            outlined
          ></v-text-field>
      </v-col>
      <v-col cols="12" sm="4">
      </v-col>
    </v-row>
        <v-row
      class="mb-3"
      no-gutters
    >
    <v-col cols="12" sm="4">
      </v-col>
    <v-col cols="12" sm="4">
          <v-btn class = "ml-7" @click="submit">Login</v-btn> 
          <v-btn class = "ml-10" @click="submit">Register</v-btn> 
      </v-col>
      <v-col cols="12" sm="4">
      </v-col>
    </v-row>
  </form>
</v-container>
</template>

<script>

export default {
  name: 'LoginTest',
  }
</script>
