<template>
  <v-card
    color="accent"
    dark
    tile
    flat
    class="text-center pa-2 mx-auto"
  >
    <v-card
    color="accent"
    dark
    tile
    flat
    class="text-center pa-2 mx-auto"
  > 
    <base-info-card title="preview" color="yellow">
      <v-card light class="pa-4" height="40rem">
        <news-work-experience/>
      </v-card>
    </base-info-card>
  </v-card>  
  </v-card>  
</template>

<script>
export default {
  name: 'EditWork',

  components: {
    NewsWorkExperience: () => import('@/components/news/WorkExperience'),
  },

  props: {
      
  },

  data() {
    return {
      valid: true
    }
  },


}
</script>