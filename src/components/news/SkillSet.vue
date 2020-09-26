<template>
  <base-info-card title="Skills Sets">
    <v-list class="py-0">
      <template v-for="(article, i) in articles">
        <v-list-item
          :key="i"
          class="px-0"
          three-line
        >

          <v-list-item-content>
            <v-list-item-subtitle
              class="text-uppercase subtitle-2 font-weight-bold text--primary mb-n2"
              v-text="article.title"
            />
            <v-col
              v-for="(text, i) in article.marketing"
              :key="i"
              cols="12"
              md="4"
            >
              <base-list-item :text="text" />
            </v-col>
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
          title: 'Knowledge',
          marketing: [
        'Programming',
        'Machine Learning',
        'Algorithm',
        'Computer Science'
      ],
        },
        {
          title: 'Language and Tool',
          marketing: [
        'Spring  Boot',
        'Vue.js',
        'JavaScipt',
        'MySQL',
        'Java', 
        'Python',
      ],
        },
        {
          title: 'Other',
          marketing: [
        'Natural Language Processing',
      ],
        },
      ],
    }),
  }
</script>
