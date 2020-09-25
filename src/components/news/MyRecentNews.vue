<template>
<base-info-card title="My Recent News">
  <base-section
    class="py-0"
    id="news"
    space="72"
  >
    <v-container>
      <v-row justify="center">
          <news-my-profile-card
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
      NewsMyProfileCard: () => import('@/components/news/MyProfileCard'),
    },

    data: () => ({
      articles: [
          {
          date: 'Jan 12, 2020',
          category: 'Project',
          language:"Python",
          title: 'Lorem ipsum dolor, sit amet consectetur',
          text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur, nulla voluptas sed[...]',
          src: require('@/assets/article-2.jpg'),
        },
        {
          date: 'Jan 12, 2020',
          category: 'Tech Blog',
          language:"Vue",
          title: 'Lorem ipsum dolor, sit amet consectetur',
          text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur, nulla voluptas sed[...]',
          src: require('@/assets/article-1.jpg'),
        },
      ],
    }),
  }
</script>
