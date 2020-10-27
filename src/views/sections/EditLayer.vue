<template>
  <base-section id="edit-layer" space="0">
    <v-overlay
      fixed
      color="secondary"
      v-show="edit"
      class="panel-overlay"
    >
      <v-card
        class="mx-auto mt-10 px-4 rounded-t-xl edit-panel align-stretch"
        :class="{'opened-edit-panel': open}"
        max-width="65rem"
        width="100%"
        color="accent"
        v-if="edit"
      >

        <v-btn depressed x-small fab absolute color="accent darken-1 blue-grey--text text--lighten-2" class="hide-btn" @click.stop="close">
          <v-icon>mdi-archive-arrow-down</v-icon>
        </v-btn>

        <v-row no-gutters class="fill-height flex-column">
          <v-col class="flex-grow-0 flex-shrink-0">            
            <v-row no-gutters justify="center">
              <v-card-title class="text-center justify-center py-4">
                <h1 class="font-weight-bold text-uppercase title">{{sections[contentType].name}}</h1>
              </v-card-title>
            </v-row>
          </v-col>

          <v-col class="flex-grow-0 flex-shrink-0">
            <v-tabs
              dark
              v-model="tab"
              background-color="transparent"
              grow
              centered
              show-arrows
            >
              <v-tab
                v-for="item in sections[contentType].items"
                :key="item.name"
              >
                {{ item.tab }}
              </v-tab>
            </v-tabs>
          </v-col>

          <v-col class="flex-grow-1 flex-shrink-0" style="overflow-y:scroll">
            <v-tabs-items v-model="tab" dark>
              <template v-if="contentType===0">
                <v-tab-item key="basic">
                  <edit-basic ref="basic" v-bind="author" v-on="$listeners"/>
                </v-tab-item>
                <v-tab-item key="contact">
                  <edit-contact ref="contact" v-bind="author" v-on="$listeners"/>
                </v-tab-item>
                <v-tab-item key="location">
                  <edit-location ref="location" v-bind="author" v-on="$listeners"/>
                </v-tab-item>
                <v-tab-item key="password">
                  <edit-password ref="password" v-on="$listeners"/>
                </v-tab-item>
              </template>
              <template v-else-if="contentType===1">
                <v-tab-item key="education">
                  <edit-education ref="education" v-bind="about" v-on="$listeners"/>
                </v-tab-item>
                <v-tab-item key="work">
                  <edit-work ref="work" v-bind="about" v-on="$listeners"/>
                </v-tab-item>
                <v-tab-item key="achievement">
                  <edit-achievement ref="achievement" v-bind="about" v-on="$listeners"/>
                </v-tab-item>
                <v-tab-item key="skillset">
                  <edit-skillset ref="skillset" v-bind="about" v-on="$listeners"/>
                </v-tab-item>
                <v-tab-item key="interest">
                  <edit-interest ref="interest" v-bind="about" v-on="$listeners"/>
                </v-tab-item>
              </template>
              <template v-else>
                <v-tab-item
                  eager key="info"
                >
                  <edit-info
                    ref="info"
                    v-bind="article"
                    v-on="$listeners"
                  />
                </v-tab-item>
                <v-tab-item
                  eager key="content"
                >
                  <edit-content
                    ref="content"
                    v-bind="article"
                    v-on="$listeners"
                    @delete-article="deleteArticle"
                  />
                </v-tab-item>
                <v-tab-item
                  eager key="publish"
                >
                  <edit-publish
                    ref="publish"
                    v-bind="article"
                    v-on="$listeners"
                    @update-content="updateContent"
                  />
                </v-tab-item>
              </template>
            </v-tabs-items>
          </v-col>

          <v-col class="flex-grow-0 flex-shrink-0">
            <v-row no-gutters class="save-section py-4">
              <v-spacer/>
              <v-col cols="4" class="text-center">
                <v-btn 
                  large
                  rounded 
                  light 
                  width="100%" 
                  class="green--text" 
                  @click.stop="save" 
                  :disabled="loading"
                >
                  SAVE
                </v-btn>
              </v-col>
              <v-spacer/>
            </v-row>
          </v-col>
        </v-row>
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
          @click.stop="editAritcle"
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
          color="brown"
          @click.stop="editSetting"
        >
          <v-icon>mdi-account-circle</v-icon>
        </v-btn>
         <v-btn
          fab
          dark
          small
          color="red"
          @click.stop="logout"
        >
          <v-icon>mdi-logout</v-icon>
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
  </base-section>
</template>

<script>
  const ContentType = {
    setting: 0,
    about: 1,
    article: 2
  }
  
  import EditAritcle from '@/mixins/edit-article'
  import EditAbout from '@/mixins/edit-about'
  import EditSetting from '@/mixins/edit-setting'

  export default {
    name: 'EditLayer',
    components: {
      EditBasic: () => import('@/components/edit/setting/EditBasic'),
      EditContact: () => import('@/components/edit/setting/EditContact'),
      EditLocation: () => import('@/components/edit/setting/EditLocation'),
      EditPassword: () => import('@/components/edit/setting/EditPassword'),

      EditEducation: () => import('@/components/edit/about/EditEducation'),
      EditWork: () => import('@/components/edit/about/EditWork'),
      EditAchievement: () => import('@/components/edit/about/EditAchievement'),
      EditSkillset: () => import('@/components/edit/about/EditSkillset'),
      EditInterest: () => import('@/components/edit/about/EditInterest'),

      EditInfo: () => import('@/components/edit/article/EditInfo'),
      EditContent: () => import('@/components/edit/article/EditContent'),
      EditPublish: () => import('@/components/edit/article/EditPublish'),
    },

    mixins: [EditAritcle, EditAbout, EditSetting],

    props: {
      author: {
        type: Object,
        default: () => ({})
      },
      about: {
        type: Object,
        default: () => ({})
      },
    },

    data: () => ({
      dial: false,
      edit: false,
      open: false,
      loading: false,
      tab: null,
      contentType: null,
      sections: [
        {
          name: "Account Settings",
          items: [
            { tab: 'Basic', name: 'basic' },
            { tab: 'Contact', name: 'contact' },
            { tab: 'Location', name: 'location' },
            { tab: 'Password', name: 'password' }
          ],
        },
        {
          name: "About Me",
          items: [
            { tab: 'Education', name: 'education' },
            { tab: 'Work', name: 'work' },
            { tab: 'Achievement', name: 'achievement' },
            { tab: 'Skillset', name: 'skillset' },
            { tab: 'Interest', name: 'interest' },
          ],
        },
        {
          name: "Edit Article",
          items: [
            { tab: 'Heading', name: 'info' },
            { tab: 'Writing', name: 'content' },
            { tab: 'Publish', name: 'publish' },
          ],
        }
      ],
    }),

    methods: {
      // ************* fab buttons ************* //
      editAritcle(article=null){
        if (!article) {
          //todo: get cid
          //call: create article api
          this.createArticle()
        } else {
          this.article = article
        }

        this.edit = true
        this.tab=0
        this.contentType = ContentType.article
        setTimeout(() => {
          this.open=true
        }, 200);
        
      },
      editAboutMe(){
        this.edit=true
        this.tab=0
        this.contentType = ContentType.about
        setTimeout(() => {
          this.open=true
        }, 200);
      },
      editSetting(){
        this.tab=0
        this.edit=true
        this.contentType = ContentType.setting
        setTimeout(() => {
          this.open=true
        }, 200);
      },
      logout(){
        this.$store.dispatch('logout')
        this.$router.push({name:'Login'})
      },

      // ************* panel buttons ************* //
      validate() {
        let valid = true
        this.sections[this.contentType].items.forEach(element => {
          let component = this.$refs[element.name]
          if (component && component.validate && !component.validate()) {
            valid = false
            return
          }
        });
        return valid
      },
      async save() {
        if (!this.validate()) return
        this.$emit('message', 'saving updates...')
        this.loading = true

        if (this.contentType === ContentType.article) {
          await this.saveArticle()  
        } else if (this.contentType === ContentType.about) {
          await this.saveAbout()
        } else if (this.contentType === ContentType.setting) {
          await this.saveSetting()
        }
        this.loading = false
        this.close()
      },
      close(){
        if (this.loading) return
        this.edit=false
        this.open=false
      },
      
      // ************* help button ************* //
      getHelp(){
        
      }
    }
  }
</script>

<style lang="scss">
.panel-overlay ::-webkit-scrollbar {
    display: none;
}

.panel-overlay .v-overlay__content {
  height: 100%;
  width: 100%;
  display: flex;
}

.panel-overlay .v-window,
.panel-overlay .v-window__container,
.panel-overlay .v-window-item {
  height: 100%;
  overflow-y: visible;
  background-color: transparent;
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
