<template>
  <base-section
    id="news"
    space="72"
  >
    <v-container>
      <v-row justify="center">
        <v-col
          cols="12"
          md="8"
        >
        <!--
          <news-card
            v-for="(article, i) in articles"
            :key="i"
            :divider="i + 1 < articles.length"
            class="mb-12"
            v-bind="article"
          />
        -->
        <news-author v-bind="author" />
        <br>
        <br>
          <news-edu-back />
          <br>
          <news-work-experience />
          <br>
          <news-skill-set />
          <br>
          <news-interest />
          <br>
          <news-my-recent-news />
          <br>
          <!--<news-comment-reply />-->
          
        </v-col>

        <v-col
          cols="12"
          md="3"
        >

        <v-card flat>
        <news-search-bar />
         <!-- <news-search /> -->
          <news-categories />
<!--
          <news-archives />
-->

          <news-tags />
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </base-section>
</template>

<style>
  .b{
    position: fixed; 
  }
</style>

<script>
//import Preview from '../../components/Preview.vue';

  export default {
    name: 'SectionNews',
    components: {
      //NewsArchives: () => import('@/components/news/Archives'),
      //NewsCard: () => import('@/components/news/Card'),
      NewsSearchBar: () => import('@/components/news/SearchBar'),
      NewsCategories: () => import('@/components/news/Categories'),
      //NewsSearch: () => import('@/components/news/Search'),
      NewsTags: () => import('@/components/news/Tags'),
      NewsWorkExperience: () => import('@/components/news/WorkExperience'),
      NewsEduBack: () => import('@/components/news/EduBack'),
      NewsInterest: () => import('@/components/news/Interest'),
      //NewsCommentReply: () => import('@/components/news/CommentReply'),
      NewsAuthor: () => import('@/components/news/Author'),
      //Preview,
      NewsSkillSet: () => import('@/components/news/SkillSet'),
      NewsMyRecentNews: () => import('@/components/news/MyRecentNews'),
    },
    mounted :async function(){
       if(this.$store.getters.isLogin){
        const [res, success]  = await this.$request.get("/api/user/account/"+this.$store.getters.uid).catch(err=>{
        console.log(err)})
        if(success){
          this.author.name=res.displayName
          if(res.avatar==""){
            this.author.src="https://imgtestbucket-1302787472.cos.ap-nanjing.myqcloud.com/defaultimg.jpg"
          }
          else{
            this.author.src=res.avatar
          }
          if(res.description==""){
            this.author.blurb="this guy is lazy, has not write anything"
          }
          else{
            this.author.blurb=res.description
          }
        }
        else{
          console.log(res.data)
          alert("user does not exist")
        }
      }
      else{
      alert('not log in , please log in')
      this.$router.push('Login')  
      }
    },
    data: () => ({
      author: {
        name: '',
        blurb: '',
        src: '',
      },
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
  }
</script>
