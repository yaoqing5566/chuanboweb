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
            redirect: '/login'
        },
        {
            path: '/',
            component: resolve => require(['./components/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children:[
                {
                    path: '/banner',
                    component: resolve => require(['./views/resource.vue'], resolve),
                    meta: { title: 'banner列表',type:4 }
                },
                {
                    path: '/news',
                    component: resolve => require(['./views/news.vue'], resolve),
                    meta: { title: '情报站' }
                },
                {
                    path: '/addNews',
                    component: resolve => require(['./views/addNews.vue'], resolve),
                    meta: { title: '新建情报站' }
                },
                {
                    path: '/resource',
                    component: resolve => require(['./views/resource.vue'], resolve),
                    meta: { title: '资源站管理',type:1 }
                },
                {
                    path: '/reservations',
                    component: resolve => require(['./views/reservations.vue'], resolve),
                    meta: { title: '预约活动' }
                }

            ]
        },
        {
            path: '/login',
            component: resolve => require(['./views/Login.vue'], resolve)
        },
        {
            path: '/404',
            component: resolve => require(['./views/404.vue'], resolve)
        },
        {
            path: '/403',
            component: resolve => require(['./views/403.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
