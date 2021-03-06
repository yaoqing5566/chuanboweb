import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';    // 默认主题
Vue.config.productionTip = false
Vue.use(ElementUI, { size: 'small' });

import {post,get} from './http'
Vue.config.productionTip = false
global.$_post=post;
global.$_get=get;

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    // 强制给index.html 加上时间戳
    if (document.URL.indexOf('index.html?t=') < 0) {
        let timestamp = (new Date()).valueOf()
        window.location.href = 'index.html?t=' + timestamp + '#' + to.fullPath
    }
    let ms_user =JSON.parse(localStorage.getItem('ms_user'));
    let role='';

    if(ms_user){
        role=ms_user.name;
    }
    console.log(to.path,to.path.indexOf('/web'))
    if(!role && to.path !== '/login'&& to.path.indexOf('/web')==-1){
        next('/login');
    }else if(to.meta.permission){
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
      role === 'admin' ? next() : next('/403');
    }else{
        // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
        if(navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor'){
            Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
                confirmButtonText: '确定'
            });
        }else{
            next();
        }
    }
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
