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
  },
  components: {
      Ckeditor5: () => import('@/components/news/Ckeditor5'),
  },

  data:() => ({
    cked:{}
  }),
  methods:{
    async updateContent(blogcontent){
      return await this.$emit('update-content',blogcontent);
    },
    validate() {
      if (this.$refs.form.validate())
        return true
      else
        this.$emit('message', 'some invalid fields in article content!', 'warn')
      return false
    },
  },
  watch: {
    cid: function () {
      this.cked.cid=this.cid
      this.cked.contentdata=this.contentdata
    },
  },
  mounted:function(){
    this.cked.cid=this.cid,
    this.cked.contentdata=this.contentdata
  },
}
</script>