<template>
  <v-list class="py-0">
    <v-list-item
      class="px-0"
      three-line
      style="height:68px"
    >

      <v-list-item-content>
        <v-list-item-subtitle
          class="font-weight-medium text--secondary font-italic text-center"
          v-html="info"
        >
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider/>
  </v-list>
</template>

<script>
  export default {
    name: 'EmptyInfo',
    data() {
      return {
        info: "--&nbsp&nbsp&nbspNot thing to show here&nbsp&nbsp&nbsp--"
      }
    },
  }
</script>
