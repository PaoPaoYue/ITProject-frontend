<script>
  // Extensions
  import View from '@/views/View'

  // Mixins
  import LoadSections from '@/mixins/load-sections'

  export default {
    name: 'Register',

    metaInfo: { title: 'Register' },

    extends: View,

    mixins: [
      LoadSections([
        'register',
      ]),
    ],

    props: {
      id: {
        type: String,
        default: 'register',
      },
    },
  }
</script>
