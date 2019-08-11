<template>
    <div class="login-wrap-wx" :style="{'height':$store.state.windowHeight+'px'}">
        <div class="loginArea_weixin">
            <h3>微信登录</h3>
            <div class="mtop" v-if="tableData.ticket">
                <img width="280" height="280" :src="'https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket='+tableData.ticket">
            </div>
            <div class="for_black_theme">扫码 &gt; 关注并登录</div>
        </div>
    </div>
</template>

<script>
    export default {
        data: function(){
            return {
                tableData:{
                    ticket:'',
                    time:''
                }
            }
        },
        methods: {
            getLogin(ticket){
                let _this=this;
                $_get('/Views/weixin/getUserByTicket.aspx?ticket='+ticket).then(function (response) {
                    console.log(response)
                    if (response.code == 1) {
                        clearInterval(_this.time)
                        localStorage.setItem('ms_user',JSON.stringify(response.data));
                        _this.$store.state.userDetail=response.data;
                        _this.$router.push('/news');
                    } else {
                       // _this.$message.error(response.msg);
                    }
                })
            }
        },
        created() {
            let _this=this;
            $_get('/Views/weixin/getQrCode.aspx').then(function (response) {
                if (response.code == 1) {
                    _this.tableData=response.data;

                   _this.time=setInterval(function () {
                        _this.getLogin( _this.tableData.ticket);
                    },1000)

                } else {
                    _this.$message.error(response.msg);
                }
            })

        }
    }
</script>

<style lang="scss">
    .login-wrap-wx{
        background-color: #333;
        text-align: center;
        .loginArea_weixin {

            position: absolute; width: 280px;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%); color: #fff;
            h3{
             padding-bottom: 20px;
            }
            .for_black_theme{
                width: 250px;
                font-size: 14px;
                margin: 20px auto;
                padding: 15px;
                background-color: #232323;
                border-radius: 100px;
                box-shadow: inset 0 5px 10px -5px #191919, 0 1px 0 0 #444;
            }
        }
    }
</style>
