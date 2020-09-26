<template>
  <base-section id="theme-features">
    <base-section-heading title="Theme Features">
      The functions we provide for IT students to present themself better.  

    </base-section-heading>

    <v-container>
      <v-row>
        <v-col
          v-for="(feature, i) in features"
          :key="i"
          cols="12"
          md="6"
        >
          <base-avatar-card
            v-bind="feature"
            align="left"
            horizontal
          >

            The functions we provide for IT students to present themself better.

          </base-avatar-card>
        </v-col>
      </v-row>
    </v-container>
  </base-section>
</template>

<script>
  export default {
    name: 'SectionThemeFeatures',

    data: () => ({
      features: [
        {
          title: 'Business Card',
          icon: 'mdi-fountain-pen-tip',
        },
        {
          title: 'Video Display',
          icon: 'mdi-cellphone',
        },
        {
          color: 'primary',
          dark: true,
          title: 'Tech Article',
          icon: 'mdi-pencil-box-outline',
        },
        {
          title: 'Project Preview',
          icon: 'mdi-image-size-select-actual',
        },
        {
          title: 'Present Papers',

          icon: 'mdi-ice-pop',
        },
        {
          title: '24/7 Support',
          icon: 'mdi-help-circle-outline',
        },
      ],
    }),
  }
</script>
