<template>
  <base-info-card title="Education Background">
    <v-list class="py-0">
      <template v-for="(article, i) in articles">
        <v-list-item
          :key="i"
          class="px-0"
          three-line
        >
          <base-img
            :src="article.src"
            class="mr-4"
            color="grey lighten-1"
            height="72"
            max-width="72"
          />

          <v-list-item-content>
            <v-list-item-subtitle
              class="text-uppercase subtitle-2 font-weight-bold text--primary mb-n2"
              v-text="article.title"
            />

            <v-list-item-subtitle
              class="font-weight-bold"
              v-text="article.date"
            />
          </v-list-item-content>
        </v-list-item>

        <v-divider :key="`divider-${i}`" />
      </template>
    </v-list>
  </base-info-card>
</template>

<script>
  export default {
    name: 'NewsRecentArticles',

    data: () => ({
      articles: [
        {
          date: 'Bachlor of Science',
          title: 'University of Melbourne',
          src: require('@/assets/unimelb.svg'),
        },
        {
          date: 'Master of Software Engineering',
          title: 'University of Melbourne',
          src: require('@/assets/unimelb.svg'),
        },
      ],
    }),
  }
</script>
