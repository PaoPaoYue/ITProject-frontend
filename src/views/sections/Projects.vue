<template>
  <v-slide-group
    :key="String(reset)"
    v-intersect.once="onObserve"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <v-slide-item
      v-for="(card, i) in filtered"
      :key="i"
      v-slot:default="{ active, toggle }"
    >
      <div>
        <project-card
          :active="active"
          :height="height"
          :src="require(`@/assets/project-${i + 1}.jpg`)"
          :width="width"
          v-bind="card"
          class="mx-3"
          @click="toggle"
        />
      </div>
    </v-slide-item>
  </v-slide-group>
</template>

<script>
  export default {
    name: 'SectionProjects',

    components: {
      ProjectCard: () => import('@/components/ProjectCard'),
    },

    props: {
      filter: {
        type: Function,
        default: v => !!v,
      },
      height: {
        type: [Number, String],
        default: 125,
      },
      width: {
        type: [Number, String],
        default: 175,
      },
    },

    data: () => ({
      cards: [
        { title: 'Cierra Vega', subtitle: 'Wordpress' },
        { title: 'Pierre Cox', subtitle: 'Statistics' },
        { title: 'Alden Cantrell', subtitle: 'Wordpress' },
        { title: 'Kierra Gentry', subtitle: 'Branding' },
        { title: 'Thomas Crane', subtitle: 'Shopping' },
        { title: 'Miranda Shaffer', subtitle: 'Branding' },
        { title: 'Bradyn Kramer', subtitle: 'Photography' },
        { title: 'Bailey Wolfe', subtitle: 'Wordpress' },
        { title: 'Lorelei Holloway', subtitle: 'Ecommerce' },
        { title: 'Justine Elliott', subtitle: 'Ecommerce' },
      ],
      reset: false,
    }),

    computed: {
      filtered () {
        return this.cards.filter(this.filter)
      },
    },

    methods: {
      onObserve (/*x, y, isVisible*/) {
        if (this.reset) return

        // Workaround for now
        // Issue lies within the slide-group's
        // logic to re-calculate the container's
        // overflow
        setTimeout(() => {
          this.reset = !this.reset
        }, 100)
      },
    },
  }
</script>
