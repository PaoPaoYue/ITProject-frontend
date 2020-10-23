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
          <news-edu-back :edit="true" v-model="about.education"/>
          <br>
          <news-work-experience :edit="true" v-model="about.work"/>
          <br>
          <news-achievement :edit="true" v-model="about.award"/>
          <br>
          <news-skill-set :edit="true" v-model="about.skillset"/>
          <br>
          <news-interest :edit="true" v-model="about.interest"/>
          <br>
          <news-my-recent-news />
          <br>          
        </v-col>

        <v-col
          cols="12"
          md="3"
          class="d-none d-md-flex"
        >
          <v-card flat>
            <news-search-bar />
            <news-categories />
            <news-tags />
          </v-card>
        </v-col>

      </v-row>
    </v-container>
    <edit-layer 
      v-if="$route.params.uid===$store.getters.uid" 
      v-on="$listeners"
      :author="author"
      :about="about"
      :draftNum='0'
    />
  </base-section>
</template>

<script>

  export default {
    name: 'ProfileMain',
    components: {
      EditLayer: () => import('@/views/sections/EditLayer'),

      NewsAuthor: () => import('@/components/news/Author'),
      NewsEduBack: () => import('@/components/news/EduBack'),
      NewsWorkExperience: () => import('@/components/news/WorkExperience'),
      NewsAchievement: () => import('@/components/news/Achievement'),
      NewsInterest: () => import('@/components/news/Interest'),
      NewsSkillSet: () => import('@/components/news/SkillSet'),
      NewsMyRecentNews: () => import('@/components/news/MyRecentNews'),

      NewsSearchBar: () => import('@/components/news/SearchBar'),
      NewsCategories: () => import('@/components/news/Categories'),
      NewsTags: () => import('@/components/news/Tags'),

    },
    mounted () {
      // this.fetchAuthor()
      // this.fetchAboutMe()
    },
    data: () => ({
      author: {},
      about: {},
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
    methods: {
      // ************ apis ************ //
      async fetchAuthor () {
        const [res, success]  = await this.$request.get("/api/user/account/"+this.$route.params.uid)
          .catch(err=>console.log(err))
        if (success) {
          this.author = res
          console.log(this.author)
        }
        else {
          this.$emit('message', res.error.message || res.error, 'error')
        }
      },
      async fetchAboutMe () {
        const [res, success]  = await this.$request.get("/api/user/about/"+this.$route.params.uid)
          .catch(err=>console.log(err))
        if (success) {
          this.about.education = JSON.parse(res.education)
          this.about.work = JSON.parse(res.work)
          this.about.award = JSON.parse(res.award)
          this.about.interest = JSON.parse(res.interest)
          this.about.skillset = JSON.parse(res.skillset)
          console.log(this.about)
        }
        else {
          this.$emit('message', res.error.message || res.error, 'error')
        }
      },
      // ****************************** //
    },
  }
</script>
