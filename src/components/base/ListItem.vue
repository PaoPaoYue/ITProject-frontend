<template>
  <v-row no-gutters class="d-flex align-center">
    <v-col cols="2">
      <v-icon
        v-if="icon"
        :color="color"
        class="mr-3"
        size="28"
        v-text="icon"
      >
        {{ icon }}
      </v-icon>
    </v-col>
    

    <v-col cols="9"
      v-if="text"
      class="subtitle-1"
      v-text="text"
    />
    <v-col cols="1">
      <slot>
      </slot>
    </v-col>
  </v-row>

</template>

<script>
  export default {
    name: 'BaseListItem',

    props: {
      color: {
        type: String,
        default: 'primary',
      },
      icon: {
        type: String,
        default: 'mdi-check-circle-outline',
      },
      text: String,
    },
  }
</script>
