<script>
  // Extensions
  import View from '@/views/View'

  // Mixins
  import LoadSections from '@/mixins/load-sections'

  export default {
    name: 'FourOhOne',

    metaInfo: { title: 'Oops! Check Login Failed' },

    extends: View,

    mixins: [
      LoadSections([
        '401',
      ]),
    ],

    props: {
      id: {
        type: String,
        default: 'four-oh-one',
      },
    },
  }
</script>
