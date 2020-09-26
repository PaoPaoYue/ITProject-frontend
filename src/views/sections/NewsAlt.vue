<template>
  <base-section
    id="news"
    space="72"
  >
    <v-container>
      <v-row justify="center">
        <v-col
          cols="12"
          md="6"
        >
          <news-card
            v-for="(article, i) in articles"
            :key="i"
            :divider="i + 1 < articles.length"
            class="mb-12"
            v-bind="article"
          />
        </v-col>

        <v-col
          cols="12"
          md="3"
        >
          <news-search />

          <news-categories />

          <news-archives />

          <news-tags />
        </v-col>
      </v-row>
    </v-container>
  </base-section>
</template>

<script>
  export default {
    name: 'SectionNews',

    components: {
      NewsArchives: () => import('@/components/news/Archives'),
      NewsCard: () => import('@/components/news/Card'),
      NewsCategories: () => import('@/components/news/Categories'),
      NewsSearch: () => import('@/components/news/Search'),
      NewsTags: () => import('@/components/news/Tags'),
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
        {
          icon: 'mdi-text',
          date: 'Jul 24, 2019',
          category: 'Business Partnerships',
          comments: 16,
          title: 'Lorem ipsum dolor, sit amet consectetur',
          text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero dolorem, eos sapiente, ad voluptatem eveniet, a cum blanditiis consequatur esse facere minima! Non, minus ullam facere earum labore aperiam aliquam.',
          src: require('@/assets/article-4.jpg'),
        },
        {
          icon: 'mdi-text',
          date: 'May 4, 2019',
          category: 'Analytics Implementation',
          comments: 5,
          title: 'Lorem ipsum dolor, sit amet consectetur',
          text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero dolorem, eos sapiente, ad voluptatem eveniet, a cum blanditiis consequatur esse facere minima! Non, minus ullam facere earum labore aperiam aliquam. ',
          src: require('@/assets/article-2.jpg'),
        },
      ],
    }),
  }
</script>
