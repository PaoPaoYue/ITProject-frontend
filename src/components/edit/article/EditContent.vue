<template>
  <v-card
  color="accent"
  dark
  tile
  flat
  class="text-center pa-2 mx-auto"
  >
  <v-card light>
  <Ckeditor5 />
   </v-card>
  
  </v-card>  
</template>

<script>
export default {
  name: 'EditContent',
  components: {
      Ckeditor5: () => import('@/components/news/Ckeditor5'),
  },

}
</script>