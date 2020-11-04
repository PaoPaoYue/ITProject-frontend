<template>
  <base-section
    id="profile-main"
    space="72"
  >
    <v-container>
      <v-row justify="center">

        <v-col
          cols="12"
          md="8"
        >
          <base-info-card title="Preview">
            <news-author v-bind="author" />
          </base-info-card>
          <br>
          <news-education v-model="about.education"/>
          <br>
          <news-work-experience v-model="about.work"/>
          <br>
          <news-achievement v-model="about.award"/>
          <br>
          <news-skillset v-bind="about.skillset"/>
          <br>
          <news-interest v-model="about.interest"/>
          <br>
          <news-top-articles :articles="articles"/>
          <br>          
        </v-col>

        <v-col
          cols="12"
          md="3"
          class="d-none d-md-flex"
        >
          <v-card flat>
            <news-search-bar :uid="this.$route.params.uid"/>
            <news-categories :uid="this.$route.params.uid"/>
            <news-tags :uid="this.$route.params.uid"/>
          </v-card>
        </v-col>

      </v-row>
    </v-container>
    <edit-layer 
      v-if="$route.params.uid==$store.getters.uid" 
      v-on="$listeners"
      :author="author"
      :about="about"
      :draftNum='0'
      @update-about='updateAbout'
      @update-author='updateAuthor'
      @update-articles='updateArticles'
    />
  </base-section>
</template>

<script>

  export default {
    name: 'ProfileMain',
    components: {
      EditLayer: () => import('@/views/sections/EditLayer'),

      NewsAuthor: () => import('@/components/news/Author'),
      NewsEducation: () => import('@/components/news/Education'),
      NewsWorkExperience: () => import('@/components/news/WorkExperience'),
      NewsAchievement: () => import('@/components/news/Achievement'),
      NewsInterest: () => import('@/components/news/Interest'),
      NewsSkillset: () => import('@/components/news/Skillset'),
      NewsTopArticles: () => import('@/components/news/TopArticles'),

      NewsSearchBar: () => import('@/components/news/SearchBar'),
      NewsCategories: () => import('@/components/news/Categories'),
      NewsTags: () => import('@/components/news/Tags'),

    },
    mounted () {
      this.fetchAuthor()
      this.fetchAboutMe()
      this.fetchArticles()
    },
    data: () => ({
      author: {},
      about: {},
      articles: [],
    }),
    methods: {
      // ************ apis ************ //
      async fetchAuthor () {
        const [res, success]  = await this.$request.get("/api/user/account/"+this.$route.params.uid)
          .catch(err=>console.log(err))
        if (success) {
          this.updateAuthor(res)
        }
        else {
          if (res.status === 422)
            this.$router.push({name:'FourOhFour'})
          else
            this.$emit('message', res.error.message || res.error, 'error')
        }
      },
      async fetchAboutMe () {
        const [res, success]  = await this.$request.get("/api/user/about/"+this.$route.params.uid)
          .catch(err=>console.log(err))
        if (success) {
          this.updateAbout(res)
        }
        else {
          this.$emit('message', res.error.message || res.error, 'error')
        }
      },
      async fetchArticles() {
        const [res, success]  = await this.$request.get("/api/post/top/"+this.$route.params.uid)
          .catch(err=>console.log(err))
        if (success) {
          this.articles = res
        }
        else {
          this.$emit('message', res.error.message || res.error, 'error')
        }
      },
      // ****************************** //
      updateAbout(about) {
        this.about = {
          education : JSON.parse(about.education),
          work : JSON.parse(about.work),
          award : JSON.parse(about.award),
          interest : JSON.parse(about.interest),
          skillset : JSON.parse(about.skillset)
        }
      },
      updateAuthor(author) {
        this.author = author
      },
      updateArticles() {
        this.fetchArticles()
      },
    },
  }
</script>
