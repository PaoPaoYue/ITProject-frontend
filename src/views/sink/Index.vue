<template>
  <section id="kitchen-sink">
    <v-row no-gutters>
      <v-col cols="12">
        <callout
          v-for="(section, i) in sections"
          :key="`${i}-${section}`"
          :section="section"
        >
          <component :is="`section-${section}`" />
        </callout>
      </v-col>
    </v-row>
  </section>
</template>

<script>
  // Mixins
  import LoadSections from '@/mixins/load-sections'

  export default {
    name: 'Sink',

    components: {
      Callout: () => import('./Callout'),
    },

    mixins: [
      LoadSections([
        'hero-alt',
        'article',
        'about-our-product',
        'affiliates',
        'contact-us',
        'customer-reviews',
        'features',
        'gallery',
        'hero',
        'info',
        'info-alt',
        'info-graph',
        'keep-in-touch',
        'map',
        'marketing',
        'mobile',
        'news',
        'news-alt',
        'newsletter',
        'newsletter-alt',
        'pricing-plan',
        'project',
        'projects',
        'recent-works',
        'related-projects',
        'social-media',
        'theme-features',
        'we-help-your-success',
        '404',
      ]),
    ],

    metaInfo: { title: 'Kitchen Sink' },
  }
</script>
