<template>
<base-info-card title="My Interest">
  <base-section
    class="py-0"
    id="news"
    space="72"
  >
    <v-container>
      <v-row justify="center">
          <news-card
            v-for="(article, i) in articles"
            :key="i"
            :divider="i + 1 < articles.length"
            class="mb-12"
            v-bind="article"
          />
      </v-row>
    </v-container>
  </base-section>
</base-info-card>
</template>

<script>
  export default {
    name: 'MyRecentNews',

    components: {
      NewsCard: () => import('@/components/news/Card'),
    },

    data: () => ({
      articles: [
        {
          icon: 'mdi-image',
          date: 'Jan 12, 2020',
          category: 'Research Discussions',
          comments: 5,
          title: 'Lorem ipsum dolor, sit amet consectetur',
          text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero dolorem, eos sapiente, ad voluptatem eveniet, a cum blanditiis consequatur esse facere minima! Non, minus ullam facere earum labore aperiam aliquam.',
          src: require('@/assets/article-3.jpg'),
        },
        {
          icon: 'mdi-play',
          date: 'Oct 19, 2019',
          category: 'Growth Strategy',
          comments: 8,
          title: 'Lorem ipsum dolor, sit amet consectetur',
          text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero dolorem, eos sapiente, ad voluptatem eveniet, a cum blanditiis consequatur esse facere minima! Non, minus ullam facere earum labore aperiam aliquam.',
          src: require('@/assets/article-1.jpg'),
        }, 
      ],
    }),
  }
</script>
