<template>
  <v-card
  color="accent"
  dark
  tile
  flat
  class="text-center pa-2 mx-auto"
  >
     <v-list color="accent">
      <template v-for="(item, i) in bloglist" >
        <v-list-item
          :key="item"
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
                    icon="true"
                  >
          <v-icon @click="deleteblog(i)">
          mdi-delete
        </v-icon>
      </v-btn>
              <v-dialog
          v-model="dialog"
          width="500"
          >
          <template v-slot:activator="{ on, attrs }">
      <v-btn
      
                    color="blue"
                    depressed
                    icon="true"
                    v-bind="attrs"
                    v-on="on"
                  >
          <v-icon @click="edit(i)">
          mdi-pencil
        </v-icon>
      </v-btn>
      </template>
                  <v-card>
          <v-card-title class="headline">
            Leave the current article?
          </v-card-title>
          <v-card-text>If you choose to edit a new blog, you will leave the current one and all the unsaved changes will be dismissed</v-card-text>
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
              @click="dialog = false"
            >
              Leave
            </v-btn>
          </v-card-actions>
        </v-card>
        </v-dialog>
            <v-btn
                    color="green"
                    depressed
                    icon="true"
                    :disabled="item.publishstate"
                  >
          <v-icon>
          mdi-cloud-upload
        </v-icon>
      </v-btn>
          

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
      bloglist:[
        {
          publishstate:true,
          title:"First class of Vue",
          createDate:(new Date().getMonth().toString()+"/"+new Date().getDate().toString()+"/"+new Date().getFullYear().toString()+" "+new Date().getHours().toString()+":"+new Date().getMinutes().toString()+":"+new Date().getSeconds().toString()),
        },
        {
          publishstate:false,
          title:"Second class of Vue",
          createDate:(new Date().getMonth().toString()+"/"+new Date().getDate().toString()+"/"+new Date().getFullYear().toString()+" "+new Date().getHours().toString()+":"+new Date().getMinutes().toString()+":"+new Date().getSeconds().toString()),
        },
      ]
    }
  },
  methods:{
    deleteblog(i){

    }
  }

}
</script>