<template>
  <v-card
  color="accent"
  dark
  tile
  flat
  class="text-center pa-2 mx-auto"
  >
     <v-list color="accent">
      <template v-for="item in bloglist" >
        <v-list-item
          :key="item.cid"
          two-line
          color="accent"
        >
        <v-list-item>
          <v-list-item-icon>
            <v-icon color="indigo">
              mdi-clipboard-text-outline
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content >
            <v-list-item-title >{{item.title}} </v-list-item-title>
            <v-list-item-subtitle>{{item.createTime}}</v-list-item-subtitle>
          </v-list-item-content>         
          <v-list-item-icon>
            <v-btn
              color="red"
              depressed
              icon
            >
              <v-icon @click="deleteblog(item.cid)">
              mdi-delete
              </v-icon>
            </v-btn>
            <v-btn
              color="blue"
              depressed
              icon
            >
              <v-icon @click="editblog(item.cid)">
                mdi-pencil
              </v-icon>
            </v-btn>
        <v-tooltip bottom :disabled="!item.isDraft">
        <template v-slot:activator="{ on, attrs }">
            <v-btn
                    color="green"
                    depressed
                    icon
                    :disabled="!item.isDraft"
                    v-bind="attrs"
                    v-on="on"
                  >
          <v-icon @click="publishblog(item.cid)">
          mdi-cloud-upload
        </v-icon>
      </v-btn>
      </template>
        <span>Publish</span>
      </v-tooltip>    

      </v-list-item-icon>  
        </v-list-item>
        </v-list-item>
      </template>
     </v-list>
  </v-card>  
</template>

<script>
export default {
  name: 'EditPublish',
  props: {
      bloglist:{
        type:Array,
        default:null
      }
  },

  data() {
    return {
      dialog: false,
    }
  },
  methods:{
    validate() {
      return true
    },
    async deleteblog(cid){
      return await this.$emit('delete-blog',cid);
    },
    async editblog(cid){
     return await this.$emit('edit-blog',cid);
    },
    async publishblog(cid){
        return await this.$emit('publish-blog',cid);
    }
  }

}
</script>