
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
        'findusers'
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
