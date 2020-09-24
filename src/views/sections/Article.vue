<template>
  <base-section
    id="article"
    space="72"
  >
    <v-container class="py-0">
      <v-row justify="center">
        <v-col
          cols="12"
          md="7"
        >
          <news-card
            class="mb-4"
            prominent
            v-bind="article"
          />

          <news-share />
<!--
          <news-author v-bind="author" />

          <news-comments />

          <news-comment-reply />
-->
        </v-col>

        <v-col
          class="hidden-sm-and-down"
          cols="3"
        >
          <news-search />

          <news-categories />
<!--
          <news-recent-articles />

          <news-archives />
-->
          <news-tags />
        </v-col>
      </v-row>
    </v-container>
  </base-section>
</template>

<script>
  export default {
    name: 'SectionNews',

    components: {
      ///NewsArchives: () => import('@/components/news/Archives'),
      //NewsRecentArticles: () => import('@/components/news/RecentArticles'),
      //NewsAuthor: () => import('@/components/news/Author'),
      NewsCard: () => import('@/components/news/Card'),
      NewsCategories: () => import('@/components/news/Categories'),
      //NewsCommentReply: () => import('@/components/news/CommentReply'),
      //NewsComments: () => import('@/components/news/Comments'),
      NewsSearch: () => import('@/components/news/Search'),
      NewsShare: () => import('@/components/news/Share'),
      NewsTags: () => import('@/components/news/Tags'),
    },

    data: () => ({
      author: {
        name: 'John Leider',
        blurb: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, odio nostrum.',
        src: require('@/assets/author.png'),
      },
      article: {
        icon: 'mdi-image',
        date: 'Jan 12, 2020',
        category: 'Research Discussions',
        comments: 5,
        title: 'Lorem ipsum dolor, sit amet consectetur',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero dolorem, eos sapiente, ad voluptatem eveniet, a cum blanditiis consequatur esse facere minima! Non, minus ullam facere earum labore aperiam aliquam.',
        html: `
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero dolorem, eos sapiente, ad voluptatem eveniet, a cum blanditiis consequatur esse facere minima! Non, minus ullam facere earum labore aperiam aliquam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero dolorem, eos sapiente, ad voluptatem eveniet, a cum blanditiis consequatur esse facere minima! Non, minus ullam facere earum labore aperiam aliquam.</p>

          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero dolorem, eos sapiente, ad voluptatem eveniet, a cum blanditiis consequatur esse facere minima! Non, minus ullam facere earum labore aperiam aliquam.Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero dolorem, eos sapiente, ad voluptatem eveniet, a cum blanditiis consequatur esse facere minima! Non, minus ullam facere earum labore aperiam aliquam.</p>

          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero dolorem, eos sapiente, ad voluptatem eveniet, a cum blanditiis consequatur esse facere minima! Non, minus ullam facere earum labore aperiam aliquam.</p>

          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero dolorem, eos sapiente, ad voluptatem eveniet, a cum blanditiis consequatur esse facere minima! Non, minus ullam facere earum labore aperiam aliquam.Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero dolorem, eos sapiente, ad voluptatem eveniet, a cum blanditiis consequatur esse facere minima! Non, minus ullam facere earum labore aperiam aliquam. Vero dolorem, eos sapiente, ad voluptatem eveniet, a cum blanditiis consequatur esse facere minima! Non, minus ullam facere earum labore aperiam aliquam.</p>
        `,
        src: require('@/assets/article-1.jpg'),
      },
    }),
  }
</script>
