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

            feature.text

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
          title: 'Professional Resume',
          icon: 'mdi-fountain-pen-tip',
          text: 'Write pretty personal resume in a moment.'
        },
        {
          title: 'Responsive Design',
          icon: 'mdi-cellphone',
          text: 'Smooth experience with pc, mobile phone and tablet.'
        },
        {
          color: 'primary',
          dark: true,
          title: 'Tech Article',
          icon: 'mdi-pencil-box-outline',
          text: 'Share your knowledge in your favourite markdown language.'
        },
        {
          title: 'Multimedia Support',
          icon: 'mdi-image-size-select-actual',
          text: 'Easy image and file upload services to bueatify your article.'
        },
        {
          title: 'Present Papers',
          icon: 'mdi-adobe-acrobat',
          text: 'Publish your papers in the form of PDF files.'
        },
        {
          title: 'Saving and History',
          icon: 'mdi-history',
          text: 'Autosaving your articles and edit them whenever you want.'
        },
      ],
    }),
  }
</script>
