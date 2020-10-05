<template>
  <v-container class="pa-0">
    <v-overlay
      fixed
      color="secondary"
      v-model="edit"
      class="panel-overlay"
    >
      <v-card
        class="mx-auto mt-12 px-4 rounded-t-xl edit-panel"
        :class="{'opened-edit-panel': open}"
        max-width="750"
        height="100%"
        width="100%"
        color="accent"
        v-if="edit"
      >

        <v-btn depressed x-small fab absolute color="accent darken-1 blue-grey--text text--lighten-2" class="hide-btn" @click.stop="close">
          <v-icon>mdi-archive-arrow-down</v-icon>
        </v-btn>

        <v-container class="pa-0">
          <v-card-title class="text-center justify-center py-4">
            <h1 class="font-weight-bold text-uppercase title">{{sections[contentType].name}}</h1>
          </v-card-title>

          <v-row no-gutters>
            <v-tabs
              dark
              v-model="tab"
              background-color="transparent"
              grow
              show-arrows
            >
              <v-tab
                v-for="item in sections[contentType].items"
                :key="item.tab"
              >
                {{ item.tab }}
              </v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab" dark>
              <v-tab-item
                v-for="item in sections[contentType].items"
                :key="item.tab"
              >
                <v-card
                  color="accent"
                  dark
                  tile
                  flat
                  height="70vh"
                  class="fill-width text-center pa-2"
                >
                  {{ item.content }}
                </v-card>  
              </v-tab-item>
            </v-tabs-items>
          </v-row>

          <v-row no-gutters>
            <v-spacer></v-spacer>
            <v-col cols="6" class="text-center">
              <v-btn large rounded light width="80%" class="green--text" @click.stop="close">
                SAVE
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
    setting: 0,
    about: 1,
    post: 2
  }

  export default {
    name: 'overlay',

    data: () => ({
      dial: false,
      edit: false,
      open: false,
      contentType: ContentType.setting,
      tab: null,
      sections: [
        {
          name: "Account Settings",
          items: [
            { tab: 'Basic', content: 'edit basic information' },
            { tab: 'Contact', content: 'edit contact' },
            { tab: 'Location', content: 'edit location' },
            { tab: 'Password', content: 'change password' }
          ],
        },
        {
          name: "About Me",
          items: [
            { tab: 'Education', content: 'Tab 1 Content' },
            { tab: 'Work', content: 'Tab 2 Content' },
            { tab: 'Skillset', content: 'Tab 3 Content' },
            { tab: 'Interest', content: 'Tab 4 Content' },
            { tab: 'Achievement', content: 'Tab 5 Content' },
          ],
        },
        {
          name: "New Article",
          items: [
            { tab: 'Heading', content: 'Tab 1 Content' },
            { tab: 'Writing', content: 'Tab 2 Content' },
            { tab: 'Publish', content: 'Tab 3 Content' },
          ],
        }
      ]
      
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
        
      },
      close(){
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

.panel-overlay .v-window,
.panel-overlay .v-window__container,
.panel-overlay .v-window-item {
  width: 100%;
}

.hide-btn{
  top: 1.0rem;
  right: 1.0rem;

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