
<script>
  // Extensions
  import View from '@/views/View'

  // Mixins
  import LoadSections from '@/mixins/load-sections'

  export default {
    name: 'Explore',

    metaInfo: { title: 'Explore' },

    extends: View,

    mixins: [
      LoadSections([
        'hero-alt',
        //'hero',
        //'theme-features',
        // 'features',
        //'contact-us',
        // 'affiliates',
        // 'social-media',
        //'keep-in-touch',
        // 'newsletter',
        // 'pro-features',
        'info-alt'
      ]),
    ],

    props: {
      id: {
        type: String,
        default: 'home',
      },
    },
  }
</script>
