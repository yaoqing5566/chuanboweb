import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {post,get} from './http'
import ElementUI from 'element-ui';
import common from './plugin/main'
import 'element-ui/lib/theme-chalk/index.css';    // 默认主题
global.$_common=common;
Vue.config.productionTip = false
global.$_post=post;
global.$_get=get;
Vue.use(ElementUI, { size: 'small' });
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
