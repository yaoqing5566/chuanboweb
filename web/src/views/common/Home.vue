<template>
  <div class="home">
    <v-head></v-head>
    <router-view ></router-view>
  </div>
</template>
<script>
    import vHead from './Header.vue';
    export default {
        data(){
            return {

            }
        },
        components:{
            vHead
        },
        created(){

        }
    }
</script>