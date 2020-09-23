<template>
  <v-card
    :color="value ? 'white' : 'grey lighten-5'"
    :elevation="value ? 12 : 0"
    class="pa-2"
    outlined
    tile
  >
    <v-card
      flat
      outlined
      tile
    >
      <div
        :class="value && 'grey lighten-4'"
        class="pa-6 pb-12 mb-8"
      >
        <base-title
          :title="title"
          class="text-uppercase"
          space="1"
        />

        <base-subtitle
          :title="subtitle"
          space="8"
        />

        <div class="d-flex align-center justify-center">
          <base-heading
            mobile-size="display-2"
            space="0"
            tag="h3"
          >
            <sup><small>$</small></sup>{{ price }}
          </base-heading>

          <div class="text-left ml-4 body-2 font-weight-bold mt-1 text-uppercase">
            PER
            <base-divider
              align="left"
              color="primary"
              space="0"
            />
            {{ interval }}
          </div>
        </div>
      </div>

      <div class="mb-8" />

      <div class="pb-12">
        <div class="px-8 mb-12">
          <template v-for="(feature, i) in features">
            <div
              :key="feature"
              class="my-3"
              v-text="feature"
            />

            <v-divider
              v-if="i + 1 < features.length"
              :key="`divider-${i}`"
            />
          </template>
        </div>

        <base-btn
          :color="value ? 'primary' : 'accent'"
          :outlined="!value"
          width="196"
        >
          Get Started
        </base-btn>
      </div>
    </v-card>
  </v-card>
</template>

<script>
  export default {
    name: 'PriceCard',

    provide: {
      heading: { align: 'center' },
    },

    props: {
      features: {
        type: Array,
        default: () => ([]),
      },
      price: [Number, String],
      subtitle: String,
      title: String,
      interval: {
        type: String,
        required: true,
      },
      value: Boolean,
    },
  }
</script>
