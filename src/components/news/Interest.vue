<template>
  <base-info-card title="My Interest">
<v-list class="py-0">
        <v-list-item
          class="px-0"
          three-line
        >
          <v-list-item-content>
            {{interests}}
          </v-list-item-content>
        </v-list-item>

        <v-divider/>
    </v-list>
</base-info-card>
</template>

<script>
  export default {
    name: 'Interest',

    data: () => ({
      interests:"My interesting area is sleeping, playing the game and staying there do nothing. Especially, at this stage, not writing any line of code is my biggest wish.  My hope for week 8 is that I can finish this stage 2 as soon as possible. Too tired", 
      articles: [
        {
          date: 'Bachlor of Science',
          title: 'University of Melbourne',
          src: require('@/assets/unimelb.svg'),
        },
        {
          date: 'Master of Software Engineering',
          title: 'University of Melbourne',
          src: require('@/assets/unimelb.svg'),
        },
      ],
    }),
  }
</script>
