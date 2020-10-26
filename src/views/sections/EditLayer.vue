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
                <!-- <v-icon large v-text="mid-cloud-refresh"/>
                <span> </span> -->
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
    props: {
      author: {
        type: Object,
        default: () => ({})
      },
      about: {
        type: Object,
        default: () => ({})
      },
      draftNum: {
        type: Number,
        default: 0
      }
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
      article: {},
    }),
    computed: {
      defaultArticle: function() {
        var date = new Date();
        var createdate=date.toLocaleDateString();
        createdate=createdate+"_"+date.getHours().toString()+":"+date.getMinutes().toString();
        return {
          cid: "",
          title: "Draft " + createdate,
          blogimg: "",
          isDraft: true,
          tag:[],
          contentdata:""
        }
      },
    },
    methods: {
      // ************ apis ************ //
      async updateSetting(author){
        const [res, success]  = await this.$request.post("/api/user/account/update", author)
          .catch(err=>console.log(err))
        if (success) {
          return true
        }
        else {
          if (res.status == 401)
            this.$router.push({'name':'NotLogin'})
          else
            this.$emit('message', res.error.message || res.error, 'error')
          return false
        }
      },
      async updateAbout(about){
        const [res, success]  = await this.$request.post("/api/user/about/update", about)
          .catch(err=>console.log(err))
        if (success) {
          return true
        }
        else {
          if (res.status === 401)
            this.$router.push({'name':'NotLogin'})
          else
            this.$emit('message', res.error.message || res.error, 'error')
          return false
        }
      },
      async updatePassword(password){
        const [res, success]  = await this.$request.post("/api/user/password/update", {'password':password})
          .catch(err=>console.log(err))
        if (success) {
          return true
        }
        else {
          if (res.status === 401)
            this.$router.push({'name':'NotLogin'})
          if (res.status === 422)
            this.$emit('message', res.error.message, 'warn')
          else
            this.$emit('message', res.error.message || res.error, 'error')
          return false
        }
      },
      async updateAvatar(avatar){
        const [res, success] = await this.$request.uploadImg(avatar,'avatar/img')
          .catch(err => console.log(err))
        if (success) {
          this.author.avatar = res.location + '?timestamp='+Date.now()
          return true
        }
        else {
          if (res.status === 401)
            this.$router.push({'name':'NotLogin'})
          else
            this.$emit('message', res.error.message || res.error, 'error')
          return false
        }
      },
      async createArticle(){
        let articleinfo={
              "collectionType":"BLOG",
              "title":this.article.title,
        }
        const [res, success] = await this.$request.post("/api/post/new",articleinfo)
          .catch(err => console.log(err))
        if (success) {
          this.article.cid=res.cid;
          return true
        }
        else {
          this.$emit('message', res.error.message || res.error, 'error')
          return false
        }
      },
      async updateblogimg(blogimg){
        const [res, success] = await this.$request.uploadImg(blogimg,'blogimg/img')
          .catch(err => console.log(err))
        if (success) {
          this.article.blogimg=res.location + '?timestamp='+Date.now()
          this.$emit('lazy-message', 'Cover IMG updated!', 'success')
          return true
        }
        else {
          if (res.status === 401)
            this.$router.push({'name':'NotLogin'})
          else
            this.$emit('message', res.error.message || res.error, 'error')
          return false
        }
      },
      async updateArticle(){
        let newartileinfo={
          title:this.article.title,
          description:'',
          tag:this.article.tag,
          isDraft:this.article.isDraft,
          coverImg:this.article.blogimg
        }
        const [res, success] = await this.$request.post("/api/post/update/info/"+this.article.cid,newartileinfo)
          .catch(err => console.log(err))
        if (success) {
          return true
        }
        else {
          if (res.status === 401)
            this.$router.push({'name':'NotLogin'})
          else
            this.$emit('message', res.error.message || res.error, 'error')
          return false
        }
      },
      async deleteArticle(){
        //this.article
        //delete article by cid
        this.close()
      },
      async updateContent(content){
        this.article.contentdata=content
        if(this.article.cid==''){
          if(!await this.createArticle()){
            this.$emit('message', res.error.message || res.error, 'error')
            return false;
          }
        }
        const [res, success] = await this.$request.post("/api/post/update/blog/"+this.article.cid,{"text":content})
          .catch(err => console.log(err))
        if (success) {
          console.log("wula!")
          return true
        }
        else {
          if (res.status === 401)
            this.$router.push({'name':'NotLogin'})
          else
            this.$emit('message', res.error.message || res.error, 'error')
          return false
        }
      },
      // ****************************** //
      // * get component updated data * //
      assembleAuthor() {
        let author = {}
        author.avatar = this.author.avatar
        if (this.$refs.basic) {
          author.displayName = this.$refs.basic.displayName_m
          author.simpleDescription = this.$refs.basic.simpleDescription_m
          author.description = this.$refs.basic.description_m
        } else {
          author.displayName = this.author.displayName
          author.simpleDescription = this.author.simpleDescription
          author.description = this.author.description
        }
        if (this.$refs.contact) {
          author.email = this.$refs.contact.email_m
          author.phone = this.$refs.contact.phone_m
          author.contactFacebook = this.$refs.contact.contactFacebook_m
          author.contactLinkedin = this.$refs.contact.contactLinkedin_m
          author.contactGithub = this.$refs.contact.contactGithub_m
        } else {
          author.email = this.author.email
          author.phone = this.author.phone
          author.contactFacebook = this.author.contactFacebook
          author.contactLinkedin = this.author.contactLinkedin
          author.contactGithub = this.author.contactGithub
        }
        if (this.$refs.location) {
          author.location = this.$refs.location.location_m
        } else {
          author.location = this.author.location
        }
        return author
      },
      assembleArticle() {
        this.article.title=this.$refs.info.title_m
        this.article.cid=this.$refs.info.cid_m
        this.article.blogimg=this.$refs.info.blogimg_m
        this.article.isDraft=this.$refs.info.isDraft_m
        this.article.tag=this.$refs.info.tag_m
      },
      assembleAbout() {
        let about = {}
        about.education = JSON.stringify(this.$refs.education? this.$refs.education.education_m: this.about.education)
        about.work = JSON.stringify(this.$refs.work? this.$refs.work.work_m: this.about.work)
        about.award = JSON.stringify(this.$refs.achievement? this.$refs.achievement.award_m: this.about.award)
        about.skillset = JSON.stringify(this.$refs.skillset? this.$refs.skillset.skillset_m: this.about.skillset)
        about.interest = JSON.stringify(this.$refs.interest? this.$refs.interest.interest_m: this.about.interest)
        return about
      },
      // ****************************** //
      editAritcle(){
        this.article=this.defaultArticle;
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
      validate() {
        let valid = true
        this.sections[this.contentType].items.forEach(element => {
          let component = this.$refs[element.name]
          if (component && !component.validate()) {
            valid = false
            return
          }
        });
        return valid
      },
      async save() {
        /*if (!this.validate()) return*/
        this.$emit('message', 'saving updates...')
        this.loading = true
        if (this.contentType === ContentType.article) {
          this.assembleArticle();
          if(this.article.cid==''){
            if(await this.createArticle()){
              var blogimgcover=this.$refs.info.blogimgfile
              if(blogimgcover!=null){
                if(!await this.updateblogimg(blogimgcover)){
                    this.loading = false
                    return
                  }
                }
              if (await this.updateArticle()) {
                this.$emit('update-article', this.article)
                this.$emit('message', 'article updated!', 'success')
              } else {
                this.loading = false
                return
          }
            }
          }
          //re-assamble this.article

          
        } else if (this.contentType === ContentType.about) {
          let about = this.assembleAbout()
          if (await this.updateAbout(about)) {
            this.$emit('update-about', about)
            this.$emit('message', 'about me updated!', 'success')
          } else {
            this.loading = false
            return
          }
          
        } else if (this.contentType === ContentType.setting) {
          let password = this.$refs.password? this.$refs.password.password: ''
          if (password && !(await this.updatePassword(password))) {
            this.loading = false
            return
          }
          let avatar = this.$refs.basic? this.$refs.basic.avatarFile: null
          if (avatar && !(await this.updateAvatar(avatar))) {
            this.loading = false
            return
          }
          let author = this.assembleAuthor()
          if (await this.updateSetting(author)) {
            this.$emit('update-author', author)
            this.$emit('message', 'settings updated!', 'success')
            if (avatar)
              this.$emit('lazy-message', 'avatar updated!', 'success')
            if (password)
              this.$emit('lazy-message', 'password updated!', 'success')
          } else {
            this.loading = false
            return
          }
        }
        this.loading = false
        //this.close()
      },
      close(){
        if (this.loading) return
        this.edit=false
        this.open=false
      }, 
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
