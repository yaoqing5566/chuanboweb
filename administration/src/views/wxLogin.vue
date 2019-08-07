<template>
    <div class="login-wrap-wx" :style="{'height':$store.state.windowHeight+'px'}">
        <div class="loginArea_weixin">
            <h3>微信登录</h3>
            <div class="mtop">
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
                tableData:{}
            }
        },
        methods: {

        },
        created() {
            let _this=this;
            $_get('/Views/weixin/getQrCode.aspx').then(function (response) {
                if (response.code == 1) {
                    _this.tableData=response.data;
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
