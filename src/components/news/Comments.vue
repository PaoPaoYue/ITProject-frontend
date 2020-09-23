<template>
  <base-info-card
    :title="`Comments(${comments.length})`"
    class="mb-12"
  >
    <news-comment
      v-for="(comment, i) in comments"
      :key="i"
      v-bind="comment"
    />
  </base-info-card>
</template>

<script>
  export default {
    name: 'NewsComments',

    components: {
      NewsComment: () => import('./Comment'),
    },

    data: () => ({
      comments: [
        {
          name: 'Stacy Porter',
          comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, magni, pariatur, iste enim esse.',
          reply: false,
          src: require('@/assets/user-1.jpg'),
        },
        {
          name: 'James Brooker',
          comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, magni, pariatur, iste enim esse.',
          reply: true,
          src: require('@/assets/user-2.jpg'),
        },
        {
          name: 'Holly Campbell',
          comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, magni, pariatur, iste enim esse.',
          reply: false,
          src: require('@/assets/user-3.jpg'),
        },
      ],
    }),
  }
</script>
