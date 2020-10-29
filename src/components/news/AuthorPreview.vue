<template>
  <div>
    <base-info-card title="About Me">
      <v-row no-gutters class="mb-4 mt-2" justify="center">
        <v-avatar
          color="grey lighten-1"
          size="128"
        >
          <v-img :src=" avatar==='' ? require('@/assets/profile/defaultAvatar.jpg'): avatar "/>
        </v-avatar>
      </v-row>
      <base-subheading align="center" class="accent--text">
        {{displayName}}
      </base-subheading>
      <base-body>
        {{!description ? 'this guy is lazy, and has not written anything': description }}
      </base-body>

    </base-info-card>

  </div>
</template>

<script>
  export default {
    name: 'AuthorPreview',

    props: {
      avatar: {
        type:String,
        default: '',
      },
      displayName: {
        type:String,
        default: '',
      },
      description: {
        type:String,
        default: '',
      },
    },
    
    data: () => ({

    }),

  }
</script>
