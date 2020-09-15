<template>
<form>
    <v-text-field
      v-model="name"
      label="Name"
      required
    ></v-text-field>
    <v-text-field
      v-model="password"
      label="password"
      required
    ></v-text-field>
    <v-btn class="mr-4" @click="submit">Login</v-btn>

  </form>
</template>

<script>

export default {
  name: 'LoginTest',
  }
</script>
