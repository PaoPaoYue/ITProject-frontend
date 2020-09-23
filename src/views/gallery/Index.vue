<script>
  // Extensions
  import View from '@/views/View'

  // Mixins
  import LoadSections from '@/mixins/load-sections'

  export default {
    name: 'Gallery',

    metaInfo: { title: 'Gallery' },

    extends: View,

    mixins: [
      LoadSections([
        'hero-alt',
        'gallery',
        'newsletter',
        'info-alt',
      ]),
    ],

    props: {
      id: {
        type: String,
        default: 'recent-works',
      },
    },
  }
</script>
