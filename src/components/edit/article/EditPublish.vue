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
          :key="item.id"
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
            <v-list-item-subtitle>{{item.createDate}}</v-list-item-subtitle>
          </v-list-item-content>         
          <v-list-item-icon>
                  <v-btn
                    color="red"
                    depressed
                    icon
                  >
          <v-icon @click="deleteblog(item.id)">
          mdi-delete
        </v-icon>
      </v-btn>
        <v-dialog
          width="500"
          v-model="dialog"
          :retain-focus="false"
          >
          <template v-slot:activator="{ on, attrs }">
      <v-btn
      
                    color="blue"
                    depressed
                    icon
                    v-bind="attrs"
                    v-on="on"
                  >
          <v-icon>
          mdi-pencil
        </v-icon>
      </v-btn>
      </template>
        <v-card>
          <v-card-title class="headline">
            Leave the current blog?
          </v-card-title>
          <v-card-text>If you choose to edit another blog, you will leave the current one and all the unsaved changes will be dismissed</v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="green darken-1"
              text
              @click="dialog = false"
            >
              Stay
            </v-btn>
            <v-btn
              color="green darken-1"
              text
              @click="dialog = false; edit(item.id)"
            >
              Leave
            </v-btn>
          </v-card-actions>
        </v-card>
        </v-dialog>
        <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
            <v-btn
                    color="green"
                    depressed
                    icon
                    :disabled="item.publishstate"
                    v-bind="attrs"
                    v-on="on"
                  >
          <v-icon @click="publishblog(item.id)">
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
      
  },

  data() {
    return {
      valid: true,
      dialog: false,
      bloglist:[
        {
          id:0,
          publishstate:true,
          title:"First class of Vue",
          createDate:(new Date().toLocaleString()),
        },
        {
          id:1,
          publishstate:false,
          title:"Second class of Vue",
          createDate:(new Date().getMonth().toString()+"/"+new Date().getDate().toString()+"/"+new Date().getFullYear().toString()+" "+new Date().getHours().toString()+":"+new Date().getMinutes().toString()+":"+new Date().getSeconds().toString()),
        },
      ]
    }
  },
  methods:{
    deleteblog(id){
      
    },
    edit(id){
    },
    publishblog(id){

    }
  }

}
</script>