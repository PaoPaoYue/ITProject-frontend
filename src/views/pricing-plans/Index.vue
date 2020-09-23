<script>
  // Extensions
  import View from '@/views/View'

  // Mixins
  import LoadSections from '@/mixins/load-sections'

  export default {
    name: 'PricingPlans',

    metaInfo: { title: 'Pricing Plans' },

    extends: View,

    mixins: [
      LoadSections([
        'hero-alt',
        'pricing-plan',
        'customer-reviews',
        'about-our-product',
        'info-graph',
        'marketing',
        'features',
        'mobile',
        'contact-us',
        'keep-in-touch',
        'info-alt',
      ]),
    ],

    props: {
      id: {
        type: String,
        default: 'pricing-plans',
      },
    },
  }
</script>
