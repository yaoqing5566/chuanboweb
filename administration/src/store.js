import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        dialog:{
            title:'',
            visible:false,
            msg:'',
            confirm:''
        },
        windowHeight: document.documentElement.clientHeight || document.body.clientHeight,
        windowWidth: document.documentElement.clientWidth || document.body.clientWidth,
        userDetail:localStorage.getItem('ms_user')?JSON.parse(localStorage.getItem('ms_user')):''
    },
    mutations: {
        setDialog:(state,obj)=>{
            state.dialog.title=obj.title;
            state.dialog.visible=obj.visible;
            state.dialog.msg=obj.msg;
            state.dialog.confirm=obj.confirm;
        }
    },
    actions: {
        dialogConfirm:($state)=>{
            $state.state.dialog.visible=false;
            $state.state.dialog.confirm();
            console.log( $state.state)
        },
    },
    getters: {//getters 和 vue 中的 computed 类似 , 都是用来计算 state 然后生成新的数据 ( 状态 ) 的
        test(){
            let width="Store计算";
            return width;
        }
    }
})
