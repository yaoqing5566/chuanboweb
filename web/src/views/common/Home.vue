<template>
  <div class="home">
    <v-head></v-head>
    <router-view ></router-view>
    <v-footer></v-footer>
  </div>
</template>
<script>
    import vHead from './Header.vue';
    import vFooter from './Footer.vue';
    export default {
        data(){
            return {

            }
        },
        components:{
            vHead,
            vFooter
        },
        created(){

        }
    }
</script>