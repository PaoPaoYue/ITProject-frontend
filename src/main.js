import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import request from "./utils/request";
import './plugins'

import Highlight from './highlight';
 
Vue.use(Highlight);
Vue.prototype.$request = request;
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
