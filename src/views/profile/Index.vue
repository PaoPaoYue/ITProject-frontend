<script>
  // Extensions
  import View from '@/views/View'

  // Mixins
  import LoadSections from '@/mixins/load-sections'

  export default {
    name: 'Profile',

    metaInfo: { title: 'Profile' },

    extends: View,

    mixins: [
      LoadSections([
        'my-hero-alt',
        'my-news-alt',
        //'marketing',
        //'pro-features',
        //'contact-us',
        //'features',
        //'mobile',
        //'affiliates',
        //'customer-reviews',
        //'social-media',
        //'newsletter',
        //'info-alt',
      ]),
    ],

    props: {
      id: {
        type: String,
        default: 'marketing',
      },
    },
  }
</script>
