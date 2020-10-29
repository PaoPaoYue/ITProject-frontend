<template>
  <v-card
    color="accent"
    dark
    tile
    flat
    class="text-center pa-2"
  > 
    <v-col cols="12" md="10" offset-md="1">

      <base-info-card title="Change Visability" color="yellow">
        <v-card light class="px-4 py-6" rounded='xl'  flat>
          <v-col cols="12" md="10" offset-md="1" class="pa-0">
            <base-body>
              <v-icon >mdi-alert-circle-outline</v-icon> 
              <span class="text-with-icon"> {{infoText}} </span>
            </base-body>

            <v-btn large width="100%" :color="info.isDraft? 'primary' : 'error'" @click="togglePublish">{{info.isDraft? 'publish' : 'withdraw'}}</v-btn>

          </v-col>
        </v-card>
      </base-info-card>

      <base-info-card title="Delete This Article" color="yellow">
        <v-card light class="px-4 py-6" rounded='xl'  flat>
          <v-col cols="12" md="10" offset-md="1" class="pa-0">
            <base-body >
              <v-icon class="red--text" >mdi-alert-circle-outline</v-icon> 
              <span class="text-with-icon red--text"> This article will be deleted permanently once you click the button! </span>
            </base-body>

            <v-btn large width="100%" color="error" @click="deleteArticle">Yes, delete anyway!</v-btn>

          </v-col>
        </v-card>
      </base-info-card>

    </v-col>
  </v-card>  
</template>

<script>


export default {
  name: 'EditPublish',

  props: {
    info: {
      type: Object,
      default: () => ({

      })
    }
  },

  computed: {
    infoText: function() {
      if (this.info.isDraft) 
        return 'This article is currently a draft. To share with others you should click this button to make it published, and save your change.'
      else
        return 'This article is currently published. You can withdraw and edit this article as a draft. Remember to save your change.'
    },
  },

  data() {
    return {
      
      
    }
  },


  methods: {
    togglePublish() {
      this.info.isDraft = !this.info.isDraft
    },
    deleteArticle() {
      this.$emit('delete-article')
    }
    
  },


}
</script>