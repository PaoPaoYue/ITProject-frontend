<template>
  <v-app-bar app color="blue-grey lighten-3" dark>
    <div class="d-flex align-center">
      <v-img alt="Logo" class="shrink mr-2" contain
        :src="require('../assets/mylogo.png')" transition="scale-transition" width="40" />
  
      <v-btn color="white" to="/" text>
        <span>Home</span>
      </v-btn>
      <v-btn color="white" to="/demo" text>
        <span>Demo</span>
      </v-btn>
      <v-btn color="white" to="/about" text>
        <span>About Vuetify</span>
      </v-btn>
      <v-btn color="white" to="/logintest" text>
        <span>LoginTest</span>
      </v-btn>
    </div>
  
    <v-spacer></v-spacer>
  
    <v-btn color="white" href="https://github.com/PaoPaoYue/ITProject-frontend" target="_blank" text>
      <span class="mr-2">Github Repositry</span>
      <v-icon>mdi-open-in-new</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>

  export default {
    name: 'Navigation',

    data: () => ({
      
    }),
  }
</script>
