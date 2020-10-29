<template>
  <v-col cols="12" max-width=100% class="px-0">
    <router-link
      :to="{
        name: 'Post',
        params: { cid: cid }
      }"
      class="d-block"
    >
      <base-img
        aspect-ratio=3.0
        :max-height="prominent ? 400 : 250"
        :src=" !coverImg ? require('@/assets/draft.png'): coverImg "
        flat
        tile
      >
        <v-row
          class="ma-0 fill-height"
          align="end"
          justify="end"
        >
          <v-sheet
            class="pa-2 d-inline-flex align-center justify-center"
            color="primary"
            dark
            tile
            height="40"
            width="40"
          >
            <v-icon> {{fileType}} </v-icon>
          </v-sheet>
        </v-row>
      </base-img>
    </router-link>

    <v-sheet
      class="d-flex"
      dark
      tile
    >
      <div class="grow pa-2 body-2">
        <div class="d-flex align-center fill-height">
          <span
            class="px-2"
            v-text="date"
          />
          /
          <span
            class="px-2"
            v-text="category"
          />

          <template v-if="$vuetify.breakpoint.mdAndUp">
            /
            <span
              class="px-2"
              v-text="`${tag[0]}`"
            />
          </template>
          <span
              class="px-4"
              
          >
            <v-icon> mdi-eye </v-icon>
            <span v-text="view" class="text-with-icon ml-1"> </span>
          </span>
        </div>
        
      </div>

      <v-sheet
        class="pa-2 d-md-inline-block text-center d-none"
        color="white"
        dark
        height="40"
        min-width="40"
        tile
        width="40"
      >
      </v-sheet>
    </v-sheet>

    <div class="pa-4">
      <base-title
        :title="title"
        class="text-truncate text-uppercase"
      />

      <base-body
        :text="truncatedText"
        space="0"
      />
    </div>

    <v-btn
      v-if="readMore"
      class="font-weight-bold"
      text
    >
      Read More
    </v-btn>

    <v-divider
      v-if="divider"
      class="mt-6"
    />
  </v-col>
</template>

<script>
  import {toLocalTimestamp} from '@/utils/transform'
  export default {
    name: 'ArticleCard',

    props: {
      cid: String,
      title: String,
      collectionType: String,
      createTime: Number,
      coverImg: String,
      view: Number,
      description: String,
      tag: Array,
      divider: Boolean,
      prominent: Boolean,
      readMore: Boolean,
      truncate: {
        type: [Number, String],
        default: 50
      }
    },

    computed: {
      date() {
        return new Date(this.toLocalTimestamp(this.createTime)).toString().split(' ').slice(1,4).join(' ')
      },
      category() {
        switch (this.collectionType) {
          case 'BLOG':
            return 'Tech Blog'
          case 'PDF':
            return 'PDF File'
          default:
            return ''
        }
      },
      fileType() {
        switch (this.collectionType) {
          case 'BLOG':
            return 'mdi-file-document'
          case 'PDF':
            return 'mdi-file-pdf'
          default:
            return ''
        }
      },


      truncatedText () {
        if (!this.description) return ''

        const truncate = Number(this.truncate)

        return this.description.length > truncate
          ? this.description.slice(0, truncate) + ' [...]'
          : this.description
      },
    },

    methods: {
      toLocalTimestamp
    },
  }
</script>