<template>
  <v-card
  color="accent"
  dark
  tile
  flat
  class="text-center pa-2 mx-auto"
  >
  <v-card light>
  <Ckeditor5 v-bind="cked" v-on="$listeners" @updatecontent="updateContent"/>
   </v-card>
  
  </v-card>  
</template>

<script>
export default {
  name: 'EditContent',
    props:{
    cid:{
      type:String,
      default:'',
    },
    contentdata:{
      type:String,
      default: ''
    },
    saved:{
      type:Boolean,
      default:true
    }
  },
  components: {
      Ckeditor5: () => import('@/components/news/Ckeditor5'),
  },

  data:() => ({
    cked:{}
  }),
  methods:{
    async updateContent(blogcontent){
      this.$emit('update-content',blogcontent)
    },
    validate() {
        return true
    },
  },
  watch: {
    cid: function () {
      this.cked.cid=this.cid
      this.cked.contentdata=this.contentdata
    },
    saved:function(){
      this.cked.saved=this.saved
    }
  },
  mounted:function(){
    this.cked.cid=this.cid,
    this.cked.contentdata=this.contentdata
    this.cked.saved=this.saved
  },
}
</script>