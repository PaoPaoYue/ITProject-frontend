<template>
  <base-section id="news">
    <base-section-heading title="Latest News">
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur, nulla voluptas sed consequuntur ipsam temporibus impedit, laboriosam corrupti debitis.
    </base-section-heading>

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
  </base-section>
</template>

<script>
  export default {
    name: 'SectionNews',

    components: {
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
