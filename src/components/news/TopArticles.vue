<template>
<base-info-card title="My Top Articles">
  <base-section
    class="py-0"
    id="news"
    space="72"
  >
    <v-container v-if="articles.length>0">
      <v-row justify="center">
          <news-article-card
            v-for="(article, i) in articles"
            :key="i"
            :divider="i + 1 < articles.length"
            class="mb-12"
            :truncate="100"
            v-bind="article"
            readMore
          />
      </v-row>
      <v-row justify="end">
        <v-btn
          outlined
          large
          color="primary"
          class=" primary--text font-weight-bold ml-2"
          @click="$router.push({
            name: 'Posts',
            params: { uid: $route.params.uid },
          })"
        > 
          <span class="text-with-icon"> View All My Posts </span>
          <v-icon class="ml-2"> mdi-arrow-right </v-icon>
        </v-btn>
      </v-row>
    </v-container>
    <v-fade-transition v-else>
      <NewsEmptyInfo />
    </v-fade-transition>
  </base-section>
</base-info-card>
</template>

<script>
  export default {
    name: 'TopArticles',

    components: {
      NewsArticleCard: () => import('@/components/news/ArticleCard'),
      NewsEmptyInfo: () => import('@/components/news/EmptyInfo'),
    },

    props: {
      articles: {
        type: Array,
        default: () => []
      }
    }

  }
</script>
