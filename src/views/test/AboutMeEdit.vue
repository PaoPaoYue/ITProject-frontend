<template>
<v-container class="mt-16 max-width=240 "
      justify="center">
<div id="app">

     <v-row justify="center">
    <v-avatar color="indigo" size="100">
        <span class="white--text headline">Alice</span>
      </v-avatar>
     </v-row>
    <form>
      <v-text-field
        v-model="name"
        label="Education Background"
      ></v-text-field>
      <v-text-field
        v-model="email"
        label="Work Experience"
      ></v-text-field>
      <v-text-field
        v-model="description"
        label="Skill Sets"
      ></v-text-field>  
      <v-text-field
        v-model="description"
        label="Interesting Area"
      ></v-text-field> 
      <v-btn class="mr-4" @click="submit">submit</v-btn>
    </form>

</div>
</v-container>
</template>

<script>
export default {
    data: () => ({
        name: 'University Of Melbourne',
        location: 'No',
        email: 'Web Development',
        description:'Interesting Area',
    }),
    methods: {
      submit () {
        this.$v.$touch()
      },
    },
  }
</script>