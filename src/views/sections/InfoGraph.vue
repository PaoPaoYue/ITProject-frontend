<template>
  <base-section
    id="info-graph"
    space="0"
  >
    <v-container
      fluid
      class="py-0"
    >
      <v-row>
        <v-col
          class="grey lighten-5 extra-padding"
          cols="12"
          md="4"
        >
          <v-responsive
            class="mx-auto"
            max-width="460"
          >
            <base-info-card
              subtitle="Monthly Status"
              title="Our Detailed Analysis"
              color="grey lighten-4"
            />

            <base-body>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, impedit hic, porro numquam ipsum iste, earum adipisci dignissimos sapiente cupiditate veritatis consequatur eaque culpa enim nesciunt esse tempora iusto in?
            </base-body>

            <base-btn>Explore More</base-btn>
          </v-responsive>
        </v-col>

        <v-col
          class="accent d-flex flex-wrap child-flex"
          cols="12"
          md="4"
        >
          <v-sparkline
            :smooth="16"
            :gradient="gradient"
            :value="value"
            fill
          />
        </v-col>

        <v-col
          class="grey lighten-5 extra-padding"
          cols="12"
          md="4"
        >
          <v-responsive
            class="mx-auto"
            max-width="460"
          >
            <base-info-card
              subtitle="Our Stuff"
              title="Amazing Skills"
              color="grey lighten-4"
            />

            <base-progress
              v-for="([title, value], i) in progress"
              :key="i"
              :title="`${title} - ${value}%`"
              :value="value"
            />
          </v-responsive>
        </v-col>
      </v-row>
    </v-container>
  </base-section>
</template>

<script>
  export default {
    name: 'SectionInfoGraph',

    data: () => ({
      progress: [
        ['Marketing', 90],
        ['Graphic Design', 75],
        ['Wordpress', 60],
      ],
      value: [4, 2, 6, 10, 12, 8, 4, 12, 4, 2, 6, 10, 12, 8, 4, 12],
    }),

    computed: {
      gradient () {
        const {
          primary,
          accent,
        } = this.$vuetify.theme.themes.light

        return [primary, accent]
      },
    },
  }
</script>
