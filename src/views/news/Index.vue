<script>
  // Extensions
  import View from '@/views/View'

  // Mixins
  import LoadSections from '@/mixins/load-sections'

  export default {
    name: 'News',

    metaInfo: { title: 'Latest News' },

    extends: View,

    mixins: [
      LoadSections([
        'hero-alt',
        'news-alt',
        'newsletter',
        'info-alt',
      ]),
    ],

    props: {
      id: {
        type: String,
        default: 'news',
      },
    },
  }
</script>
