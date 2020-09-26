<template>
  <base-section id="gallery">
    <v-tabs
      v-model="tab"
      centered
      class="mb-12"
    >
      <v-tab
        v-for="(tab, i) in tabs"
        :key="i"
        :href="`#${tab.toLowerCase()}`"
        class="text-capitalize"
      >
        {{ tab }}
      </v-tab>
    </v-tabs>

    <v-container>
      <v-fade-transition
        group
        hide-on-leave
        tag="v-row"
      >
        <v-col
          v-for="(project, i) in projects"
          :key="project.title"
          class="gallery-card"
          cols="12"
          sm="6"
          md="4"
        >
          <project-card
            v-bind="project"
            :src="require(`@/assets/project-${i + 1}.jpg`)"
            height="300"
            width="100%"
          />
        </v-col>
      </v-fade-transition>
    </v-container>
  </base-section>
</template>

<script>
  export default {
    name: 'SectionGallery',

    components: {
      ProjectCard: () => import('@/components/ProjectCard'),
    },

    data: () => ({
      tab: 'All',
      tabs: [
        'All',
        'Wordpress',
        'Branding',
        'Statistics',
        'Ecommerce',
        'Photography',
      ],
    }),

    computed: {
      projects () {
        return [
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
        ].filter(project => {
          if (this.tab.toLowerCase() === 'all') return true

          return project.subtitle.toLowerCase() === this.tab.toLowerCase()
        })
      },
    },
  }
</script>

<style lang="sass">
  .gallery-card
    transform-origin: center center 0
    transition: .3s cubic-bezier(.25,.8,.50,1)
</style>
