<template>
  <v-card
    color="accent"
    dark
    tile
    flat
    class="text-center pa-2 mx-auto"
  >

    <v-col cols="12" md="10" offset-md="1" class="pa-0 editor-wapper">
      <v-row no-gutters class="pa-2">
        <v-col cols="6" style="text-align:left "> 
          <v-icon>mdi-history</v-icon> 
          <span class="text-with-icon"> Last Update: {{toDateTime(blogContent.lastUpdate)}} </span>
        </v-col>
        <v-col cols="6" style="text-align:right">  
          <template v-if="status==0">
            <v-progress-circular size="24" indeterminate color="primary"/>
            <span class="text-with-icon"> Fetching Data... </span>
          </template>
          <template v-else-if="status==1">
            <v-icon class="green--text">mdi-check-all</v-icon> 
            <span class="text-with-icon green--text"> All Changes Autosaved </span>
          </template>
          <template v-else-if="status==2">
            <v-progress-circular size="24" indeterminate color="primary"/>
            <span class="text-with-icon"> Saving Data... </span>
          </template>
          <template v-else-if="status==3">
            <v-progress-circular size="24" indeterminate color="red"/>
            <span class="text-with-icon"> Trying to Reconnect... </span>
          </template>
        </v-col>
      </v-row >
      <v-card light flat class="pa-0" min-height="60vh">
       <v-skeleton-loader
        :loading="loading"
        type="article"
        light
        >
          <v-card flat class="pa-0">
            <Ckeditor5 class="editor formatted" ref="editor" :blogContent="blogContent" :save="autosave"/>
          </v-card>
        </v-skeleton-loader>
      </v-card>
    </v-col>
  </v-card>
</template>

<script>
import {toDateTime} from '@/utils/transform'

const syncStatus = {
  fetch: 0,
  idle: 1,
  update: 2,
  error: 3
}

export default {
  name: 'EditContent',
  components: {
      Ckeditor5: () => import('@/components/news/Ckeditor5'),
  },

  props: {
    blogContent: {
      type: Object,
      default: () => ({

      })
    },
    cid: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      loading: true,
      status: syncStatus.fetch
    }
  },

  methods: {
    toDateTime,
    autosave() {
      if (this.status != syncStatus.error)
        this.status = syncStatus.update
      return this.$request.post("/api/post/update/blog/"+this.cid, {text: this.blogContent.text})
        .then(([res, success]) => { 
          return new Promise((resolve, reject) => {
            if (success) {
              if (this.status === syncStatus.error)
                this.$emit('message', 'blog synchronization service reconnected!', 'success')
              this.status = syncStatus.idle
              this.blogContent.lastUpdate = new Date().getTime()
              resolve()
            }
            else {
              if (res.status === 401) {
                this.$router.push({ 'name': 'NotLogin' })
                resolve()
              }
              else {
                if (this.status === syncStatus.update)
                  this.$emit('message', 'encounter network issue, trying to reconnect...', 'error')
                this.status = syncStatus.error
                reject()
              }
              return false
            }
          })
        })
        .catch(err => console.log(err))
    }
  },

  mounted() {
    setTimeout(() => {
      this.loading = false
      this.status = syncStatus.idle
    }, 2000);
  },

}
</script>
<style>
.ck-editor__editable_inline {
  height: 58vh;
}

</style>
