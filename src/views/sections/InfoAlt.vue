<template>
  <v-theme-provider dark>
    <base-section
      id="info-alt"
      class="grey darken-4"
    >
      <v-container>
        <v-row>
          <v-col
            cols="12"
            md="5"
          >
            <base-info />

            <base-business-contact />
          </v-col>

          <v-col
            class="text-center hidden-sm-and-down"
            cols="2"
          >
            <v-divider vertical />
          </v-col>

          <v-col
            cols="12"
            md="5"
          >
            <base-contact-form subtitle="Drop us a Line" />
          </v-col>
        </v-row>
      </v-container>
    </base-section>
  </v-theme-provider>
</template>

<script>
  export default {
    name: 'SectionBusinessInfo',
  }
</script>
