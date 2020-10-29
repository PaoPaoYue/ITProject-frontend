<template>
<base-info-card title="My Top Articles">
  <base-section
    class="py-0"
    id="news"
    space="72"
  >
    <v-container>
      <v-row justify="center">
          <news-article-card
            v-for="(article, i) in articles"
            :key="i"
            :divider="i + 1 < articles.length"
            class="mb-12"
            :truncate="100"
            v-bind="article"
          />
      </v-row>
    </v-container>
  </base-section>
</base-info-card>
</template>

<script>
  export default {
    name: 'TopArticles',

    components: {
      NewsArticleCard: () => import('@/components/news/ArticleCard'),
    },

    props: {
      articles: Array
    }

  }
</script>
