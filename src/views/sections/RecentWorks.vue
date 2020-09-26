<template>
  <base-section
    id="recent-works"
    space="0"
  >
    <v-container
      class="py-0"
      fluid
    >
      <v-row justify="center">
        <v-theme-provider dark>
          <v-col
            class="accent extra-padding"
            cols="12"
            md="4"
          >
            <v-responsive
              class="mx-auto"
              max-width="460"
            >
              <base-subtitle
                class="primary--text"
                title="Portfolio Showcase"
                space="2"
              />

              <base-title
                mobile-size="title"
                size="display-1"
                space="2"
                title="RECENT WORKS"
              />

              <base-divider color="primary" />

              <base-body :space="$vuetify.breakpoint.smAndDown ? 0 : undefined">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit obcaecati architecto adipisci ipsam dolore aut quisquam a hic corrupti. Autem natus explicabo doloribus?
              </base-body>

              <v-item-group
                v-model="category"
                class="hidden-sm-and-down"
              >
                <template v-for="(c, i) in categories">
                  <v-item
                    :key="i"
                    :value="c"
                  >
                    <v-btn
                      :input-value="c === category"
                      class="justify-start mb-1"
                      color="grey lighten-1"
                      small
                      text
                      width="125"
                      @click="c = category"
                    >
                      {{ c }}
                    </v-btn>
                  </v-item>

                  <br
                    v-if="i < categories.length"
                    :key="`br-${i}`"
                  >
                </template>
              </v-item-group>
            </v-responsive>
          </v-col>
        </v-theme-provider>

        <v-col
          class="grey lighten-5 d-flex align-center"
          cols="12"
          md="8"
        >
          <projects
            :filter="filter"
            height="325"
            width="325"
          />
        </v-col>
      </v-row>
    </v-container>
  </base-section>
</template>

<script>
  export default {
    name: 'SectionRecentWork',

    components: {
      Projects: () => import('@/views/sections/Projects'),
    },

    data: () => ({
      category: 'All',
      categories: [
        'All',
        'Wordpress',
        'Branding',
        'Statistics',
        'Shopping',
        'Photography',
        'Ecommerce',
      ],
    }),

    methods: {
      filter (card) {
        return card.category === this.category || this.category === 'All'
      },
    },
  }
</script>
