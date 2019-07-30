<template>
  <div id="app">
    <router-view></router-view>
    <!-- 提示框 -->
    <el-dialog :title="$store.state.dialog.title" :visible.sync="$store.state.dialog.visible" width="300px" center>
      <div class="del-dialog-cnt">{{$store.state.dialog.msg}}</div>
      <span slot="footer" class="dialog-footer">
                <el-button @click="$store.state.dialog.visible = false">取 消</el-button>
                <el-button type="primary" @click="$store.dispatch('dialogConfirm')">确 定</el-button>
            </span>
    </el-dialog>
  </div>
</template>
<script>
    export default {
        name: 'App',
        created() {
            $('#preloader').delay(550).fadeOut('slow');
        }
    }
</script>
<style lang="scss">
  @import "../public/css/main.css";
  @import "../public/css/color-dark.css";


#navtest {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
