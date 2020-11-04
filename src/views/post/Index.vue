<script>
	// Extensions
	import View from '@/views/View'

	// Mixins
	import LoadSections from '@/mixins/load-sections'

  export default {
		name: 'Article',

    metaInfo: { title: 'Article' },

    extends: View,

    mixins: [
      LoadSections([
        'hero-alt',
        'article',
      ]),
    ],

    props: {
        id: {
        type: String,
        default: 'article',
      },
    },
  }
</script>