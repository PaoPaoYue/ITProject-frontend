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
      v-if="$route.params.uid==$store.getters.uid" 
      v-on="$listeners"
      :author="author"
      :about="about"
      :draftNum='0'
      @update-about='updateAbout'
      @update-author='updateAuthor'
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
      NewsMyRecentNews: () => import('@/components/news/MyRecentNews'),

      NewsSearchBar: () => import('@/components/news/SearchBar'),
      NewsCategories: () => import('@/components/news/Categories'),
      NewsTags: () => import('@/components/news/Tags'),

    },
    created () {
      this.fetchAuthor()
      this.fetchAboutMe()
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
      // ****************************** //
      updateAbout(about) {
        this.about.education = JSON.parse(about.education)
        this.about.work = JSON.parse(about.work)
        this.about.award = JSON.parse(about.award)
        this.about.interest = JSON.parse(about.interest)
        this.about.skillset = JSON.parse(about.skillset)
        this.$forceUpdate()
      },
      updateAuthor(author) {
        this.author = author
        this.$forceUpdate()
      }
    },
  }
</script>
