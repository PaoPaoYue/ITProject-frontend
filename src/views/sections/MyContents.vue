<template>
  <base-section
    id="news"
    space="72"
  >
    <v-container>
<!--The Articles-->
      <v-row justify="center">
        <v-col
          cols="12"
          md="8"
        >
 <v-container>
      <v-row>
        <v-col
          v-for="(news, i) in articles"
          :key="i"
          cols="12"
          md="4"
        >
          <news-card
            v-bind="news"
            :src="require(`@/assets/article-${i + 1}.jpg`)"
          />
        </v-col>
      </v-row>
    </v-container>
        </v-col>

<!--the search bar and the tags-->
        <v-col
          cols="12"
          md="3"
        >
          <news-search />
          <news-categories />
          <news-tags />
        </v-col>
      </v-row>
    </v-container>
  </base-section>
</template>

<script>
//import Preview from '../../components/Preview.vue';
  export default {
    name: 'SectionNews',

    components: {
      NewsCategories: () => import('@/components/news/Categories'),
      NewsSearch: () => import('@/components/news/Search'),
      NewsTags: () => import('@/components/news/Tags'),
      NewsCard: () => import('@/components/news/Card'),
    },
    data: () => ({
      articles: [
        {
          icon: 'mdi-image',
          date: 'Jan 12, 2020',
          category: 'Design',
          comments: 5,
          title: 'Lorem ipsum dolor, sit amet consectetur',
          text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur, nulla voluptas sed[...]',
        },
        {
          icon: 'mdi-play',
          date: 'Oct 19, 2019',
          category: 'Strategy',
          comments: 8,
          title: 'Lorem ipsum dolor, sit amet consectetur',
          text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur, nulla voluptas sed[...]',
        },
        {
          icon: 'mdi-text',
          date: 'Jul 24, 2019',
          category: 'Business',
          comments: 13,
          title: 'Lorem ipsum dolor, sit amet consectetur',
          text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur, nulla voluptas sed[...]',
        },
      ],
    }),
  }
</script>
