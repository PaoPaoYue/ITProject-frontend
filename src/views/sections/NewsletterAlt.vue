<template>
  <base-section
    id="map"
    class="grey darken-4 white--text"
    space="56"
  >
    <base-title
      space="8"
      title="GET OUR NEWSLETTER"
    />

    <v-responsive
      class="mx-auto px-4"
      max-width="400"
    >
      <v-text-field
        background-color="rgba(255, 255, 255, .04)"
        dark
        flat
        hide-details
        label="Your Email Address"
        solo
        tile
      >
        <template v-slot:append>
          <v-btn
            icon
          >
            <v-icon>mdi-arrow-right</v-icon>
          </v-btn>
        </template>
      </v-text-field>
    </v-responsive>
  </base-section>
</template>

<script>
  export default {
    name: 'SectionNewsletter',

    provide: {
      heading: { align: 'center' },
    },
  }
</script>
