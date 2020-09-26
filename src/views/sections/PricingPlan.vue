<template>
  <base-section
    id="pricing-plan"
    class="text-center"
  >
    <base-section-heading title="Select Pricing Plan">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, in! Asperiores, impedit libero. Veniam rerum saepe unde nihil possimus quibusdam esse accusamus mollitia magni fuga.
    </base-section-heading>

    <v-btn-toggle
      v-model="interval"
      background-color="white"
      tile
    >
      <v-btn
        active-class="primary white--text"
        width="125"
      >
        Monthly
      </v-btn>

      <v-btn
        active-class="primary white--text"
        width="125"
      >
        Yearly
      </v-btn>
    </v-btn-toggle>

    <div class="pa-8" />

    <v-container>
      <v-row>
        <v-col
          v-for="(plan, i) in plans"
          :key="i"
          cols="12"
          md="4"
        >
          <price-card v-bind="plan" />
        </v-col>
      </v-row>
    </v-container>
  </base-section>
</template>

<script>
  export default {
    name: 'SectionPricingPlan',

    components: {
      PriceCard: () => import('@/components/PriceCard'),
    },

    provide: {
      heading: { align: 'center' },
    },

    data: () => ({
      features: [
        'Full statistics',
        'Max 100 items/month',
        'Up to 5 users',
        'Unlimited Queries',
      ],
      internalPlans: [
        {
          title: 'Basic',
          subtitle: 'Best Plan for Small Businesses',
          monthly: 10,
          yearly: 110,
        },
        {
          title: 'Popular',
          subtitle: 'Best Plan for Professional Users',
          monthly: 39,
          yearly: 312,
          value: true,
        },
        {
          title: 'Premium',
          subtitle: 'Best Plan for Power Users',
          monthly: 79,
          yearly: 632,
        },
      ],
      interval: 0,
    }),

    computed: {
      plans () {
        return this.internalPlans.map(plan => {
          return {
            ...plan,
            features: this.features,
            interval: !this.interval
              ? 'Month'
              : 'Year',
            title: plan.title,
            subtitle: plan.subtitle,
            price: !this.interval
              ? plan.monthly
              : plan.yearly,
          }
        })
      },
    },
  }
</script>
