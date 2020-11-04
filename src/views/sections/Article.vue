<template>
  <base-section
    id="article"
    space="72"
  >
    <v-container class="py-0">
      <v-row class="mb-3 mb-md-12 ">
        <v-btn
          outlined
          large
          color="primary"
          class=" primary--text font-weight-bold ml-2"
          @click="$router.history.go(-1)"
        > 
          <v-icon class="mr-2"> mdi-arrow-left </v-icon>
          <span class="text-with-icon"> Back To Last Page </span>
        </v-btn>
      </v-row>
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


          <v-row no-gutters class="mb-12" v-if="article.info.collectionType === 'BLOG'">
            <v-col v-html="article.content.text" class="formatted" v-highlightB>
            </v-col>
          </v-row>

          <v-row no-gutters class="mb-12" v-else-if="article.info.collectionType === 'PDF' && !!article.content.file">
            <v-col class="formatted">
              <h2>
                Dowload Link
              </h2>
              <a :href="article.content.file" class="text-decoration-none primary--text" target="_blank" >
                <span class="text-with-icon text-decoration-underline">{{article.content.file}}</span>  
                <v-icon small > mdi-download </v-icon>
              </a>
              <h2>
                Preview
              </h2>
              <iframe :src="article.content.file" width="100%" height="500px" style="border: 0px"> 
                <p>You need a Frames Capable browser to view this content.</p>
              </iframe>
            </v-col>
          </v-row>

          <news-share v-on="$listeners"/>

        </v-col>

        <v-col
          class="hidden-sm-and-down"
          cols="3"
        >
          <news-author-preview v-bind="author"/>
          <news-categories :uid="this.article.info.uid"/>
          <news-tags :uid="this.article.info.uid"/>
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
        info: {},
        content: {}
      },
      author: {
      },
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
          this.author = res
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
