<template>
  <v-container class="pa-0">
    <v-overlay
      fixed
      color="secondary"
      v-model="edit"
      class="panel-overlay"
    >
      <v-card
        class="mx-auto mt-12 pa-4 rounded-t-xl edit-panel"
        :class="{'opened-edit-panel': open}"
        max-width="750"
        height="100%"
        width="100%"
        color="accent"
      >
        <v-card-title class="text-center justify-center py-2">
          <h1 class="font-weight-bold text-uppercase title">Account Settings</h1>
        </v-card-title>

        <v-btn depressed x-small fab absolute color="accent darken-1 blue-grey--text text--lighten-2" class="hide-btn">
          <v-icon>mdi-archive-arrow-down</v-icon>
        </v-btn>

        <v-card flat tile height=75% color="accent">
          <v-tabs
            v-model="tab"
            background-color="transparent"
            color="basil"
            grow
          >
            <v-tab
              v-for="item in items"
              :key="item"
            >
              {{ item }}
            </v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab">
            <v-tab-item
              v-for="item in items"
              :key="item"
            >
              <v-card
                color="accent"
                flat
                tile
                dark
              >
                <v-card-text>{{ text }}</v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-card>

        <v-container>
          <v-row no-gutters>
            <v-spacer></v-spacer>
            <v-col cols="4" class="text-center">
              <v-btn large rounded light width="100px" class="red--text">
                SAVE
              </v-btn>
            </v-col>
              
            <v-col cols="4" class="text-center">
              <v-btn large rounded light width="100px" class="green--text">
                CANCEL
              </v-btn>
            </v-col>
            <v-spacer></v-spacer>
          </v-row>
        </v-container>
      </v-card>

    </v-overlay>

    <v-slide-y-reverse-transition>
      <v-speed-dial
        v-model="dial"
        fixed
        bottom
        right
        direction="top"
        transition="slide-y-reverse-transition"
        class="speed-dial"
        v-if="!edit"
      >
        <template v-slot:activator>
          <v-btn
            color="blue darken-2"
            dark
            fab
          >
            <div
              class="panel-btn"
              :class="{'opened-panel-btn': dial}"
            >
              <v-icon>mdi-plus</v-icon>
            </div>
          </v-btn>
        </template>
        <v-btn
          fab
          dark
          small
          color="green"
          @click.stop="editContent"
        >
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn
          fab
          dark
          small
          color="indigo"
          @click.stop="editAboutMe"
        >
          <v-icon>mdi-book-multiple</v-icon>
        </v-btn>
        <v-btn
          fab
          dark
          small
          color="red"
          @click.stop="editSetting"
        >
          <v-icon>mdi-account-circle</v-icon>
        </v-btn>
        
      </v-speed-dial>
    </v-slide-y-reverse-transition>
    <v-fab-transition>
      <v-btn
        class="help-btn"
        fixed
        bottom
        right
        fab
        v-show="edit"
        @click.stop="getHelp"
      >
        <v-icon>mdi-help</v-icon>
      </v-btn>
    </v-fab-transition>
  </v-container>
</template>

<script>
  const ContentType = {
    setting: 1,
    about: 2,
    post: 3
  }

  export default {
    name: 'overlay',

    data: () => ({
      dial: false,
      edit: false,
      open: false,
      contentType: null,
      items: [
        'Appetizers', 'Entrees', 'Deserts', 'Cocktails',
      ],
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    }),

    methods: {
      togglePanel(){
        this.edit=false
        this.open=false
      },

      async editContent(){
        this.edit=true
        setTimeout(() => {
          this.open=true
          this.contentType = ContentType.post
        }, 200);
        
      },
      async editAboutMe(){
        this.edit=true
        setTimeout(() => {
          this.open=true
          this.contentType = ContentType.about
        }, 200);
      },
      async editSetting(){
        this.edit=true
        setTimeout(() => {
          this.open=true
          this.contentType = ContentType.setting
        }, 200);
      },
      getHelp(){
        this.edit=false
        this.open=false
      }
    }
  }
</script>
<style>

.panel-overlay .v-overlay__content {
  height: 100%;
  width: 100%;
}

.hide-btn{
  top: 10px;
  right: 10px;

}

.help-btn{
  z-index: 6 !important;
}

.edit-panel{
  z-index: 6;
  -webkit-transition: all 0.5s ease;
  -o-transition: all 0.5s ease;
  transition: all 0.5s ease;
  -webkit-transform: translateY(100%);
      -ms-transform: translateY(100%);
          transform: translateY(100%)
}

.opened-edit-panel{
  -webkit-transform: translateY(0%);
      -ms-transform: translateY(0%);
          transform: translateY(0%)
}

.panel-btn{
    -webkit-transition: all 0.5s ease;
    -o-transition: all 0.5s ease;
    transition: all 0.5s ease
  }
    

.opened-panel-btn{
  -webkit-transform: rotate(225deg);
      -ms-transform: rotate(225deg);
          transform: rotate(225deg)
}
    
</style>