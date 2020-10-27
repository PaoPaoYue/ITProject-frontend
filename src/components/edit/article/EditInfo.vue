<template>
  <v-card
  color="accent"
  dark
  tile
  flat
  class="text-center pa-2 mx-auto"
  >       
    <v-col cols="12">
      <v-text-field label="Title" v-model="title_m"></v-text-field>
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
  </v-card>  
</template>

<script>
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
    }
  },
  mounted:function(){      
      this.oldimg=this.coverImg
      this.tag_m=this.tag
      this.cid_m=this.cid
      this.coverImg_m=this.coverImg
      this.isDraft_m=this.isDraft
      this.title_m=this.title;

  },
  watch: {
    cid: function () {
      this.oldimg=this.coverImg
      this.tag_m=this.tag
      this.cid_m=this.cid
      this.coverImg_m=this.coverImg
      this.isDraft_m=this.isDraft
      this.title_m=this.title;
    },
  },
  methods:{
    validate() {
      if (this.$refs.form.validate())
        return true
      else
        this.$emit('message', 'some invalid fields in article heading!', 'warn')
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