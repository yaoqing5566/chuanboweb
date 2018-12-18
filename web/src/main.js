import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {post,get} from './http'
Vue.config.productionTip = false
global.$_post=post;
global.$_get=get;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
