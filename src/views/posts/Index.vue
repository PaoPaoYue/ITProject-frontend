<script>
  // Extensions
  import View from '@/views/View'

  // Mixins
  import LoadSections from '@/mixins/load-sections'

  export default {
    name: 'Articles',

    metaInfo: { title: 'Articles' },

    extends: View,

    mixins: [
      LoadSections([
        'hero-alt',
        'find-articles',
      ]),
    ],

    props: {
      id: {
        type: String,
        default: 'Articles',
      },
    },
  }
</script>
