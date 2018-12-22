import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        windowHeight: document.documentElement.clientHeight || document.body.clientHeight,
        windowWidth: document.documentElement.clientWidth || document.body.clientWidth,
        webType:1
    },
    mutations: {},
    actions: {},
    getters: {//getters 和 vue 中的 computed 类似 , 都是用来计算 state 然后生成新的数据 ( 状态 ) 的
        test(){
            let width="Store计算";
            return width;
        }
    }
})
