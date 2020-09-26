<template>
  <base-section
    id="customer-reviews"
    class="grey lighten-5"
    space="64"
  >
    <base-section-heading
      icon="mdi-chat-processing"
      space="0"
      title="Customer Reviews"
    />

    <v-carousel
      class="mt-n12"
      height="600"
      light
    >
      <v-carousel-item
        v-for="(customer, i) in customers"
        :key="i"
      >
        <v-container class="fill-height">
          <v-responsive
            class="mx-auto shrink text-center"
            max-width="90%"
            width="700"
          >
            <base-body
              :text="customer.review"
              tag="em"
              class="mb-6 d-block"
            />

            <v-avatar
              class="mb-6"
              size="128"
            >
              <base-img :src="require(`@/assets/user-${i + 1}.jpg`)" />
            </v-avatar>

            <base-title
              :title="customer.name"
              space="0"
            />

            <base-subtitle :title="customer.role" />
          </v-responsive>
        </v-container>
      </v-carousel-item>
    </v-carousel>
  </base-section>
</template>

<script>
  export default {
    name: 'SectionCustomerReviews',

    provide: {
      heading: { align: 'center' },
    },

    data: () => ({
      customers: [
        {
          review: '"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam aspernatur, sint recusandae cum temporibus quos saepe repellendus consectetur et reprehenderit. Ratione ipsam consequuntur quo eligendi mollitia veniam facere possimus inventore."',
          name: 'HENRY LUSIO',
          role: 'DIRECTOR OF EXAMPLE LTD',
        },
        {
          review: '"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam aspernatur, sint recusandae cum temporibus quos saepe repellendus consectetur et reprehenderit. Ratione ipsam consequuntur quo eligendi mollitia veniam facere possimus inventore."',
          name: 'HENRY LUSIO',
          role: 'DIRECTOR OF EXAMPLE LTD',
        },
        {
          review: '"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam aspernatur, sint recusandae cum temporibus quos saepe repellendus consectetur et reprehenderit. Ratione ipsam consequuntur quo eligendi mollitia veniam facere possimus inventore."',
          name: 'HENRY LUSIO',
          role: 'DIRECTOR OF EXAMPLE LTD',
        },
      ],
    }),
  }
</script>

<style lang="sass">
  #customer-reviews
    .v-carousel__controls
      background: transparent

    .base-body
      line-height: 2
</style>
