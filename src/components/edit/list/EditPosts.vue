<template>
  <v-card
    color="accent"
    dark
    tile
    flat
    class="text-center pa-2"
  > 
    <v-col cols="12" md="10" offset-md="1">
      <base-info-card title="Create New Article" color="yellow">
        <v-row no-gutters justify="space-around">
          <v-col cols="6" class="justify-center pr-2">
            <v-hover
              v-slot:default="{ hover }"
              open-delay="200"
              class="mx-auto"
              style="max-width:250px"
            >
              <v-card
                class="px-4 pt-4 ma-2"
                light rounded='xl'
                :elevation="hover ? 20 : 0"
              >
                <v-img
                  src="@/assets/techblog.svg"
                  height="100px"
                  contain
                ></v-img>
                <v-card-actions style="justify-content:center">
                  <v-btn
                    color="primary"
                    text
                    fab
                    large
                    :disabled="loading"
                    @click="createPost('BLOG')"
                  >
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-hover>
          </v-col>
          <v-col cols="6" class="justify-center pl-2">
            <v-hover
              v-slot:default="{ hover }"
              open-delay="200"
              class="mx-auto"
              style="max-width:250px"
            >
              <v-card
                class="px-4 pt-4 ma-2"
                light rounded='xl'
                :elevation="hover ? 20 : 0"
              >
                <v-img
                  src="@/assets/pdf.svg"
                  height="100px"
                  contain
                ></v-img>
                <v-card-actions style="justify-content:center">
                  <v-btn
                    color="red"
                    text
                    fab
                    large
                    :disabled="loading"
                    @click="createPost('PDF')"
                  >
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>        
      </base-info-card>

      <base-info-card title="Edit Your Drafts" color="yellow">
        <v-card light class="px-4 py-6" rounded='xl' flat>
          <v-list two-line v-if="drafts.length > 0">
            <template v-for="item in drafts">
              <v-list-item
                :key="item.creatTime"
              >
                <v-list-item-avatar>
                  <v-icon
                    class="lighten-1 white--text" :class="iconColor(item.collectionType)"
                    v-text="iconType(item.collectionType)"
                  ></v-icon>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title v-text="item.title"></v-list-item-title>
                  <v-list-item-subtitle>
                    <v-icon small>mdi-clock-time-four</v-icon>
                    <span class="text-with-icon">
                      {{ toDateTime(toLocalTimestamp(item.createTime)) }}
                    </span>
                  </v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action>
                  <v-btn icon :disabled="loading" @click="editPost(item.cid)">
                    <v-icon color="grey lighten-1">mdi-pencil</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
              <v-divider :key="item.creatTime"/>
            </template>
          </v-list>
          <NewsEmptyInfo  v-else/>
        </v-card>
      </base-info-card>

      <base-info-card title="Edit Published Articles" color="yellow">
        <v-card light class="px-4 py-6" rounded='xl' flat>
          <v-list two-line v-if="posts.length > 0">
            <template v-for="item in posts">
              <v-list-item
                :key="item.creatTime"
              >
                <v-list-item-avatar>
                  <v-icon
                    class="lighten-1 white--text" :class="iconColor(item.collectionType)"
                    v-text="iconType(item.collectionType)"
                  ></v-icon>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title v-text="item.title"></v-list-item-title>
                  <v-list-item-subtitle>
                    <v-icon small>mdi-clock-time-four</v-icon>
                    <span class="text-with-icon">
                      {{ toDateTime(toLocalTimestamp(item.createTime)) }}
                    </span>
                  </v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action>
                  <v-btn icon :disabled="loading" @click="editPost(item.cid)">
                    <v-icon color="grey lighten-1">mdi-pencil</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
              <v-divider :key="item.creatTime"/>
            </template>
          </v-list>
          <NewsEmptyInfo  v-else/>
        </v-card>
      </base-info-card>
    </v-col>
  </v-card>  
</template>

<script>
import {toDateTime, toLocalTimestamp} from '@/utils/transform'

const ArticleType = {
  blog: 'BLOG',
  pdf: 'PDF',
}

export default {
  name: 'EditPosts',

  components: {
    NewsEmptyInfo: () => import('@/components/news/EmptyInfo'),
  },

  props: {
    
  },

  data() {
    return {
      loading: false,
      posts: {
        type: Array,
        default: () => ([])
      },
      drafts: {
        type: Array,
        default: () => ([])
      }
    }
  },

  computed: {
    defaultTitle() {
      return 'New Draft'
    },
  },

  methods: {
    toDateTime,
    toLocalTimestamp,
    iconType(articleType) {
      switch (articleType) {
        case ArticleType.blog:
          return 'mdi-file-document'
        case ArticleType.pdf:
          return 'mdi-file-pdf'
        default:
          return ''
      }
    },
    iconColor(articleType) {
      switch (articleType) {
        case ArticleType.blog:
          return 'primary'
        case ArticleType.pdf:
          return 'red'
        default:
          return ''
      }
    },
    async fetchDrafts() {
      const [res, success]  = await this.$request.get("/api/post/draft/"+this.$store.getters.uid)
        .catch(err=>console.log(err))
      if (success) {
        this.drafts = res
      }
      else {
        if (res.status === 401)
          this.$router.push({ 'name': 'NotLogin' })
        else
          this.$emit('message', res.error.message || res.error, 'error')
      }
    },
    async fetchPosts() {
      const [res, success]  = await this.$request.get("/api/post/all/"+this.$store.getters.uid)
        .catch(err=>console.log(err))
      if (success) {
        this.posts = res
      }
      else {
        if (res.status === 401)
          this.$router.push({ 'name': 'NotLogin' })
        else
          this.$emit('message', res.error.message || res.error, 'error')
      }
    },
    async createPost(type) {
      this.loading = true
      const [res, success]  = await this.$request.post("/api/post/new/", {collectionType:type, title:this.defaultTitle})
        .catch(err=>console.log(err))
      if (success) {
        await this.editPost(res.cid)
      }
      else {
        if (res.status === 401)
          this.$router.push({ 'name': 'NotLogin' })
        else
          this.$emit('message', res.error.message || res.error, 'error')
      }
      this.loading = false
    },
    async editPost(cid) {
      this.loading = true
      const [res, success]  = await this.$request.get("/api/post/edit/"+cid)
        .catch(err=>console.log(err))
      if (success) {
        this.$emit('edit-article', res)
      }
      else {
        if (res.status === 401)
          this.$router.push({ 'name': 'NotLogin' })
        else
          this.$emit('message', res.error.message || res.error, 'error')
      }
      this.loading = false
    },
  },

  mounted() {
    this.fetchDrafts()
    this.fetchPosts()
  },

}
</script>
