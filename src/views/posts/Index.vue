<script>
  // Extensions
  import View from '@/views/View'

  // Mixins
  import LoadSections from '@/mixins/load-sections'

  export default {
    name: 'Contents',

    metaInfo: { title: 'Contents' },

    extends: View,

    mixins: [
      LoadSections([
        'my-contents',
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
