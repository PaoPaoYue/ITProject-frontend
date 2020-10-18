<script>
  // Extensions
  import View from '@/views/View'

  // Mixins
  import LoadSections from '@/mixins/load-sections'

  export default {
    name: 'Pdf',

    metaInfo: { title: 'Paper Display' },

    extends: View,

    mixins: [
      LoadSections([
        'hero-alt',
        'pdf-article',
        //'social-media',
        //'news',
        //'newsletter-alt',
        //'info',
      ]),
    ],

    props: {
      id: {
        type: String,
        default: 'pdf',
      },
    },
  }
</script>
