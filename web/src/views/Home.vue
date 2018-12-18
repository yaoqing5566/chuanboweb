<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png">
        <img width="100" alt="Vue logo" src="../../public/images/1.jpg">
        <div class="app-box"></div>
        {{$store.state}}
        {{$store.getters.test}}
        {{dataTable}}
    </div>
</template>

<script>
    // @ is an alias to /src
    export default {
        name: 'home',
        data () {
            return {
                dataTable:""
            }
        },
        components: {},
        created(){
            let that=this;
            $_get('/Views/admin/readTopNews.aspx?pageIndex=1&pageSize=10&type=0').then(function (response) {
                that.dataTable=response.data
            })
        }
    }
</script>
<style>
</style>