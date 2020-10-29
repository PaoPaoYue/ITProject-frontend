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
          <!-- <news-my-card
            v-bind="news"
            :src="require(`@/assets/article-${i + 1}.jpg`)"
          /> -->
        </v-col>
      </v-row>
    </v-container>
        </v-col>

<!--the search bar and the tags-->
        <v-col
          cols="12"
          md="3"
        >
        <news-search-bar />
          <news-author-preview />
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
      NewsSearchBar: () => import('@/components/news/SearchBar'),
      NewsCategories: () => import('@/components/news/Categories'),
      NewsAuthorPreview: () => import('@/components/news/AuthorPreview'),
      NewsTags: () => import('@/components/news/Tags'),
      // NewsMyCard: () => import('@/components/news/MyCard'),
    },
    data: () => ({
      articles: [
        {
          date: 'Jan 12, 2020',
          category: 'Project',
          language:"Python",
          title: 'Lorem ipsum dolor, sit amet consectetur',
          text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur, nulla voluptas sed[...]',
        },
        {
          date: 'Jan 12, 2020',
          category: 'Tech Blog',
          language:"Vue",
          title: 'Lorem ipsum dolor, sit amet consectetur',
          text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur, nulla voluptas sed[...]',
        },
        {
          date: 'Oct 19, 2019',
          category: 'Paper',
          language:"Docker",
          title: 'Lorem ipsum dolor, sit amet consectetur',
          text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur, nulla voluptas sed[...]',
        },
        {
          date: 'Oct 19, 2008',
          category: 'Paper',
          language:"Docker",
          title: 'Lorem ipsum dolor, sit amet consectetur',
          text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur, nulla voluptas sed[...]',
        },
      ],
    }),
  }
</script>
