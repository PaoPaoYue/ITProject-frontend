<template>
  <base-section id="mobile">
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="6"
        >
          <base-section-heading
            align="left"
            subtitle="Download Your App"
            tag="h2"
            title="Zero On Your Mobile"
          >
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia eos ut eveniet neque aut veritatis numquam aliquam commodi. Laudantium quo ipsum, expedita ipsa in itaque eum culpa dolores dolore ex.
          </base-section-heading>

          <v-row>
            <v-col
              v-for="([icon, title], i) in features"
              :key="i"
              cols="12"
              md="6"
            >
              <div class="d-flex align-center">
                <base-avatar
                  :icon="icon"
                  class="mr-6"
                  color="primary"
                  dark
                  outlined
                />

                <v-responsive max-width="112">
                  <base-subtitle
                    :title="title"
                    class="text--primary"
                  />
                </v-responsive>
              </div>
            </v-col>
          </v-row>
        </v-col>

        <v-col
          cols="12"
          md="6"
        >
          <base-img
            :src="require('@/assets/mobile.png')"
            class="ml-auto"
            contain
            height="400"
            max-width="300"
          />
        </v-col>
      </v-row>
    </v-container>
  </base-section>
</template>

<script>
  export default {
    name: 'SectionMobile',

    data: () => ({
      features: [
        ['mdi-cloud', 'Setup in minutes'],
        ['mdi-package', 'Easily & quickly upload products'],
        ['mdi-account-multiple', 'Get more clients'],
        ['mdi-cash-register', 'Start earning now'],
      ],
    }),
  }
</script>
