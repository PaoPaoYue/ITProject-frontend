<template>
  <v-card
    color="accent"
    dark
    tile
    flat
    class="text-center pa-2 mx-auto"
  > 
    <base-info-card title="preview" color="yellow">
      <v-card light class="pa-4" height="40rem">
        <news-edu-back/>
      </v-card>
    </base-info-card>
  </v-card>  
</template>

<script>
export default {
  name: 'EditEducation',
  components: {
    NewsEduBack: () => import('@/components/news/EduBack'),
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