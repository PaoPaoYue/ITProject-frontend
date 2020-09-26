<template>
  <base-section id="marketing">
    <v-container>
      <v-row>
        <v-col
          cols="3"
          class="text-center hidden-sm-and-down"
        >
          <template v-for="(card, i) in cards">
            <base-avatar-card
              :key="card.title"
              align="center"
              v-bind="card"
            />

            <v-divider
              v-if="i + 1 !== cards.length"
              :key="`divider-${i}`"
              class="my-8"
            />
          </template>
        </v-col>

        <v-col
          cols="2"
          class="hidden-sm-and-down text-center"
        >
          <v-responsive
            height="calc(100% - 16px)"
            class="mt-2"
          >
            <v-divider vertical />
          </v-responsive>
        </v-col>

        <v-col
          cols="12"
          md="7"
        >
          <base-subheading
            size="display-1"
            title="MARKETING"
            space="0"
          />

          <base-title
            class="primary--text"
            title="SERVICES"
            tag="div"
          />

          <base-body>
            Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est omnis dolor repellendus.
            Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et mo lestiae non recusandae Itaque earum rerum hic tenetur.
            a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores
          </base-body>

          <base-btn class="mb-12">
            Discover More
          </base-btn>

          <v-row>
            <v-col
              v-for="(text, i) in marketing"
              :key="i"
              cols="12"
              md="6"
            >
              <base-list-item :text="text" />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </base-section>
</template>

<script>
  export default {
    name: 'SectionMarketing',

    data: () => ({
      cards: [
        {
          title: 'Graphic Design',
          icon: 'mdi-mouse',
        },
        {
          title: 'Marketing',
          color: 'primary',
          dark: true,
          icon: 'mdi-headphones',
        },
        {
          title: 'Development',
          icon: 'mdi-vuetify',
        },
      ],
      marketing: [
        'Search Engine optimization',
        'Virtual Marketing',
        'Content Management',
        'Virtual Marketing',
        'Keyword Analysis',
        'Content Management',
      ],
    }),
  }
</script>
