<template>
  <base-section
    id="article"
    space="72"
  >
    <v-container class="py-0">
      <v-row justify="center">
        <v-col
          cols="12"
          md="9"
        >
          <news-article-card
            class="mb-4"
            prominent
            v-bind="article.info"
            v-if="article.info"
            :truncate="article.info.description? article.info.description.length: 50"
          />

          <v-row no-gutters class="mb-12">
            <v-col v-html="article.content.text" class="formatted" v-highlightB>
            </v-col>
          </v-row>

          <news-share />

        </v-col>

        <v-col
          class="hidden-sm-and-down"
          cols="3"
        >
          <news-author-preview v-bind="author"/>
          <news-categories />
          <news-tags />
        </v-col>
      </v-row>
    </v-container>
  </base-section>
</template>

<script>
  export default {
    name: 'SectionArticle',

    components: {
      NewsArticleCard: () => import('@/components/news/ArticleCard'),
      NewsCategories: () => import('@/components/news/Categories'),
      NewsAuthorPreview: () => import('@/components/news/AuthorPreview'),
      NewsShare: () => import('@/components/news/Share'),
      NewsTags: () => import('@/components/news/Tags'),
    },

    data: () => ({
      article: {
        info: null,
        content: {

        }
      },
      author: {
        avatar: '',
        displayName: '',
        description: '',
      }
    }),

    methods: {
      async fetchArticle() {
        const [res, success]  = await this.$request.get("/api/post/"+this.$route.params.cid)
          .catch(err=>console.log(err))
        if (success) {
          this.article = res
        }
        else {
          if (res.status === 422)
            this.$router.push({name:'FourOhFour'})
          else
            this.$emit('message', res.error.message || res.error, 'error')
        }
      },
      async fetchAuthor (uid) {
        const [res, success]  = await this.$request.get("/api/user/account/"+uid)
          .catch(err=>console.log(err))
        if (success) {
          this.author.avatar = res.avatar
          this.author.displayName = res.displayName
          this.author.description = res.description
        }
        else {
          this.$emit('message', res.error.message || res.error, 'error')
        }
      },
    },

    async mounted() {
      await this.fetchArticle()
      this.fetchAuthor (this.article.info.uid) 
    },
  }
</script>
