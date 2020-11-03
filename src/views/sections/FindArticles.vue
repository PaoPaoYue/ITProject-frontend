<template>
  <base-section
    id="find-articles"
    space="72"
  >
    <v-container class="py-0">
      <v-row>
        <v-btn
          outlined
          large
          color="primary"
          class=" primary--text font-weight-bold ml-2"
          @click="$router.history.push({name:'Profile', params:{uid: $route.params.uid}})"
        > 
          <v-icon class="mr-2"> mdi-arrow-left </v-icon>
          <span class="text-with-icon"> Back To Profile Page </span>
        </v-btn>
      </v-row>

      <v-row justify="center">
        <v-col
          cols="12"
          md="9"
        >
          <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="search" class="pt-8">
            <base-text-field
              v-model="query"
              append-icon="mdi-magnify"
              :label="label"
              :rules="[rules.required, rules.max]"
              @click:append="search"
              
            />
            <v-row no-gutters class="formatted">
              <base-body >
                <v-icon class="primary--text" >mdi-alert-circle-outline</v-icon> 
                <span class="text-with-icon"> Some tips for searching: </span>
                <ul>
                  <li> Search by tile directly. </li>
                  <li> Search by tag: "tag=Spring Boot" </li>
                  <li> Search by category: "category=[ blog || pdf ]" </li>
                </ul>
              </base-body>
            </v-row>
          </v-form>
          <base-info-card title="Search Results"/>
          <template v-if="articles.length>0">
            <news-article-card
              v-for="(article, i) in articles"
              :key="i"
              :divider="i + 1 < articles.length"
              class="mb-12"
              :truncate="100"
              v-bind="article"
            />
          </template>
          <v-fade-transition v-else>
            <NewsEmptyInfo />
          </v-fade-transition>

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
    name: 'FindArticles',

    components: {
      NewsCategories: () => import('@/components/news/Categories'),
      NewsAuthorPreview: () => import('@/components/news/AuthorPreview'),
      NewsArticleCard: () => import('@/components/news/ArticleCard'),
      NewsTags: () => import('@/components/news/Tags'),
      NewsEmptyInfo: () => import('@/components/news/EmptyInfo'),
    },
    data: () => ({
      valid: true,
      loading: false,
      articles: [
      ],
      query: '',
      rules: {
        required: v=> !!v || 'This field must not be empty.',
        max: v => (v && v.length<=200) || 'Maximum 200 characters.',
      },
      author: {
      }
    }),

    computed: {
      label() {
        if (this.author.displayName)
          return 'Search ' + this.author.displayName  + "'s articles"
        else
          return "Search user's articles"
      }
    },

    methods: {
      async search() {
        if(this.loading || !this.$refs.form.validate()) return
        this.loading = true
        this.$emit('message', 'searching...')
        let queryWapper = {}
        if (this.query.startsWith('tag='))
          queryWapper.tag = this.query.substr(4)
        else if(this.query.startsWith('category='))
          queryWapper.category = this.query.substr(9)
        else
          queryWapper.title = this.query
        const [res, success]  = await this.$request.get("/api/search/post/"+this.$route.params.uid, queryWapper)
          .catch(err=>console.log(err))
        
        if (success) {
          if (res.length == 0)
            this.$emit('message', 'no result', 'warn')
          else
            this.$emit('message', 'find results', 'success')
          this.articles = res
        }
        else {
          this.$emit('message', res.error.message || res.error, 'error')
        }
        this.loading = false
      },
      async fetchPosts(uid) {
        const [res, success]  = await this.$request.get("/api/post/all/"+uid)
          .catch(err=>console.log(err))
        if (success) {
          this.articles = res
        }
        else {
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
    mounted() {
      this.fetchAuthor(this.$route.params.uid)
      this.fetchPosts(this.$route.params.uid)
    },
  }
</script>
