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
                    path: '/news',
                    component: resolve => require(['./views/news.vue'], resolve),
                    meta: { title: '新闻' }
                },
                {
                    path: '/addNews',
                    component: resolve => require(['./views/addNews.vue'], resolve),
                    meta: { title: '新建新闻' }
                },
                {
                    path: '/questionnaire',
                    component: resolve => require(['./views/questionnaire.vue'], resolve),
                    meta: { title: '问卷' }
                },
                {
                    path: '/wxMenu',
                    component: resolve => require(['./views/wxMenu.vue'], resolve),
                    meta: { title: '微信菜单' }
                },{
                    path: '/wxUser',
                    component: resolve => require(['./views/wxUser.vue'], resolve),
                    meta: { title: '关注用户', type: 0 }
                },{
                    path: '/wxCancelUser',
                    component: resolve => require(['./views/wxUser.vue'], resolve),
                    meta: { title: '取关用户', type: -1 }
                },
                {
                    path: '/activity',
                    component: resolve => require(['./views/activity.vue'], resolve),
                    meta: { title: '活动' }
                },
                {
                    path: '/activity-user',
                    component: resolve => require(['./views/activityUser.vue'], resolve),
                    meta: { title: '活动列表' }
                }

            ]
        },
        {
            path: '/login',
            component: resolve => require(['./views/Login.vue'], resolve)
        },
        {
            path: '/web/wxLogin',
            component: resolve => require(['./views/wxLogin.vue'], resolve)
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
