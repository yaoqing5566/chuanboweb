import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
    //mode: 'history',
    //base: process.env.BASE_URL,
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
            console.log("后退")
            return savedPosition
        } else {
            console.log("前进")
            return {x: 0, y: 0}
        }

    },
    routes: [
        {
            path: '/',
            redirect: '/index'
        },
        {
            path: '/',
            component: resolve => require(['@/views/common/Home.vue'], resolve),
            children:[
                {
                    path: '/index',
                    component: resolve => require(['@/views/pages/Home.vue'], resolve),
                    meta: { title: '首页' }
                },
                {
                    path: '/detail',
                    component: resolve => require(['@/views/pages/detail.vue'], resolve),
                    meta: { title: '详情' }
                },
            ]
        },
        {
            path: '/about',
            name: 'about',
            component: resolve => require(['@/views/pages/About.vue'], resolve)
        }
    ]
})
