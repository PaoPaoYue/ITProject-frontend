<template>
  <base-section
    id="project"
    max-width="1024"
    class="mx-auto"
  >
    <v-container>
      <base-subheading
        title="A WONDERFUL SERENITY HAS TAKEN POSSESSION"
        tag="h1"
        space="12"
      />

      <base-img
        :height="$vuetify.breakpoint.mdAndUp ? 500 : 250"
        :src="require(`@/assets/project-${Math.floor(Math.random() * 10)}.jpg`)"
        class="mb-6 mb-md-12"
      />

      <v-row>
        <v-col
          cols="12"
          md="9"
        >
          <base-title title="CASE STUDY" />

          <base-body space="12">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut totam ipsam cum facere quam alias earum labore explicabo, corrupti molestias neque eaque assumenda adipisci nulla, nemo libero eligendi voluptatibus impedit, corrupti molestias neque eaque assumenda adipisci nulla, nemo libero eligendi voluptatibus impedit, corrupti molestias neque eaque assumenda adipisci nulla, nemo libero eligendi voluptatibus impedit!!
          </base-body>

          <v-row class="text-center">
            <v-col
              v-for="[value, title] of values"
              :key="title"
              cols="6"
              md="3"
            >
              <base-circular-progress v-bind="{ title, value }" />
            </v-col>
          </v-row>
        </v-col>

        <v-col
          cols="12"
          md="3"
        >
          <div class="mb-12">
            <base-title
              align="center"
              title="SHARE"
            />

            <div class="mx-n2 text-center">
              <v-icon
                v-for="icon in icons"
                :key="icon"
                class="px-2"
                @click="() => {}"
                v-text="icon"
              />
            </div>
          </div>

          <div class="caption">
            <base-title
              title="GENERAL INFO"
              space="2"
            />

            <v-divider />

            <div class="grey--text text--darken-1">
              <template v-for="([title, sub], i) of info">
                <v-row
                  :key="title"
                  class="mx-0 my-3"
                  justify="space-between"
                >
                  <span v-text="title" />

                  <strong v-text="sub" />
                </v-row>

                <v-divider :key="`divider-${i}`" />
              </template>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </base-section>
</template>

<script>
  export default {
    name: 'Project',

    data: () => ({
      icons: [
        'mdi-twitter',
        'mdi-facebook',
        'mdi-github',
        'mdi-snapchat',
      ],
      info: [
        ['LIVE SITE', 'ZERO-THEME-PRO.JOHNLEIDER.COM'],
        ['DEVELOPMENT TIME', '2 MONTHS'],
        ['TRAFFIC INCREASE', 'BY 91%'],
        ['CUSTOMER SATISFACTION', '99%'],
      ],
      values: [
        [75, 'Prototyping'],
        [50, 'UI/UX Design'],
        [100, 'Development'],
        [65, 'Marketing'],
      ],
    }),
  }
</script>
