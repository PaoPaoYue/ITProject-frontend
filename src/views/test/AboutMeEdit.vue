<template>
<v-container class="mt-16 max-width=240 "
      justify="center">
      <v-row
      class="mb-1"
      no-gutters
    >
<v-col cols="12" sm="3">
      </v-col>
      <v-col cols="12" sm="6">
        <base-info-card title="Tell More About You">
</base-info-card>
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

</v-col>
<v-col cols="12" sm="3">
      </v-col>
</v-row>
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