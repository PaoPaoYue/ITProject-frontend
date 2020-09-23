<template>
  <base-section id="we-help-your-success">
    <base-section-heading
      title="We Help Your Success"
      icon="mdi-account-outline"
      outlined
    >
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, in! Asperiores, impedit libero. Veniam rerum saepe unde nihil possimus quibusdam esse accusamus mollitia magni fuga.
    </base-section-heading>

    <v-container>
      <v-row>
        <v-col
          v-for="n in 4"
          :key="n"
          cols="6"
          md="3"
        >
          <v-hover>
            <template v-slot="{ hover }">
              <base-img
                :height="$vuetify.breakpoint.mdAndUp ? 400 : 200"
                :src="require(`@/assets/team-${n}.jpg`)"
                color="grey lighten-1"
                flat
                tile
              >
                <v-overlay
                  :value="hover"
                  absolute
                  class="pa-6"
                  color="secondary"
                  opacity=".9"
                >
                  <base-subheading :title="`Name ${n}`" />

                  <base-body>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde recusandae provident, accusantium suscipit nesciunt dignissimos architecto saepe. Aspernatur, consequatur architecto. Fugit ex culpa adipisci in at voluptatem, laboriosam enim doloribus?
                  </base-body>
                </v-overlay>
              </base-img>
            </template>
          </v-hover>
        </v-col>
      </v-row>
    </v-container>
  </base-section>
</template>

<script>
  export default {
    name: 'SectionWeHelpYourSuccess',
  }
</script>
