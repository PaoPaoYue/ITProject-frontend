<template>

  <v-container class="">
    <v-row
      class="mt-15"
      justify="center"
    >

      <v-col md="auto">
        <Preview />
        <AboutMe />
      </v-col>
      <v-col lg="3">
        <v-card
          class="pa-2"
          outlined
          tile
        >
          search bar
        </v-card>
        <v-card
    class="mx-auto my-5"
    max-width="240"
    max-height="800"
    outlined
  >

    <v-card-title>Cafe Badilico</v-card-title>

    <v-card-text>
      <v-row
        align="center"
        class="mx-0"
      >
      </v-row>

      <div class="my-4 subtitle-1">
        $ • Italian, Cafe
      </div>

      <div>Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.</div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-title>Tonight's availability</v-card-title>

    <v-card-text>
      <v-chip-group
        v-model="selection"
        active-class="deep-purple accent-4 white--text"
        column
      >
        <v-chip>5:30PM</v-chip>

        <v-chip>7:30PM</v-chip>

        <v-chip>8:00PM</v-chip>

        <v-chip>9:00PM</v-chip>
      </v-chip-group>
    </v-card-text>
  </v-card>
      </v-col>
    </v-row>

  </v-container>
</template>


<script>
import Preview from '../components/Preview.vue';
import AboutMe from '../components/AboutMe.vue';

export default {
  name: 'Profile',
  components: {
    Preview,
    AboutMe,
  }
}
</script>
