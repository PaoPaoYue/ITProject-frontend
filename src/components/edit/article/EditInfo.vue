<template>
  <v-card
  color="accent"
  dark
  tile
  flat
  class="text-center pa-2 mx-auto"
  > 
    <v-form ref="form" v-model="valid" lazy-validation @submit.prevent>    
    <v-col cols="12">
      <v-text-field label="Title" v-model="title_m" :rules="[rules.required]"></v-text-field>
      <v-combobox
        v-model="tag_m"
        :items="['Programming','Design','Vue','Java']"
        label="Tags"
        multiple
        chips
      >
        <template v-slot:selection="data">
          <v-chip
            :key="JSON.stringify(data.item)"
            v-bind="data.attrs"
            :input-value="data.selected"
            :disabled="data.disabled"
            @click:close="data.parent.selectItem(data.item)"
          >
            <v-avatar
              class="accent white--text"
              left
              v-text="data.item.slice(0, 1).toUpperCase()"
            ></v-avatar>
            {{ data.item }}
          </v-chip>
        </template>
      </v-combobox>
      <div class="title mb-1">COVER IMG</div>
      <v-img :src="coverImg_m==='' ? require('@/assets/article-1.jpg'): coverImg_m " aspect-ratio="3" contain></v-img>

    </v-col>
     <v-row>
     <v-col>
      <v-file-input
      show-size
      v-model="coverImgfile"
      accept="image/png, image/jpeg, image/bmp"
      placeholder="Pick an IMG"
      prepend-icon="mdi-camera"
      label="CoverIMG"
      @change="change"
    ></v-file-input>
    </v-col>
    </v-row>
  </v-form>  
  </v-card>  
</template>

<script>
import {toSubtitle} from '@/utils/transform' 
export default {
  name: 'EditInfo',
  props: {
      title: {
      type: String,
      default: ''
    },
    tag: {
      type: Array,
      default: () =>['Programming']
    },
    coverImg: {
      type: String,
      default: ''
    },
    cid: {
      type: String,
      default: ''
    },
    isDraft:{
      type:Boolean,
      default:true
    }
  },
  data() {
    return {
      valid: true,
      coverImgfile:null,
      oldimg:'',
      coverImg_m:'',
      title_m:'',
      tag_m:'',
      cid_m:'',
      isDraft_m:'',
      rules:{
        required: v=> !!v || 'This field must not be empty.',
      }
    }
  },
  mounted:function(){      
      this.oldimg=this.coverImg
      this.cid_m=this.cid
      this.coverImg_m=this.coverImg
      this.isDraft_m=this.isDraft
      this.title_m=this.title
      this.tag_m=this.tag
  },
  watch: {
    cid: function () {
      this.oldimg=this.coverImg
      this.cid_m=this.cid
      this.coverImg_m=this.coverImg
      this.isDraft_m=this.isDraft
      this.title_m=this.title;     
      var j;
      if(this.tag.length>1||this.tag[0]!=''){
        for(j=0;j<this.tag.length;j++){
          this.tag_m[j]=this.toSubtitle(this.tag[j])
        }
      }
      else{
        this.tag_m=[]
      }
    },
  },
  methods:{
    toSubtitle,
    validate() {
      if (this.$refs.form.validate())
        return true
      else
        this.$emit('message', 'Article Title Can Not be Empty!', 'warn')
      return false
    },
    change(file) {
      if (this.valid) {
        
        if (file)
          this.coverImg_m = URL.createObjectURL(file);
        else{
          this.coverImg_m=this.oldimg
        }
      }
    }
  }
}
</script>