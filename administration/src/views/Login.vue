<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="dialog-login">
                <h1>后台管理系统</h1>
                <el-form class="form" ref="form" label-width="80px" size="mini">
                    <div class="dd name">
                        <i class="el-icon-user"></i>
                        <el-input @keyup.enter.native="submitForm()" placeholder="请输入您的账号"
                                  v-model="ruleForm.username"></el-input>
                    </div>
                    <div class="dd pwd">
                        <i class="el-icon-unlock"></i>
                        <el-input @keyup.enter.native="submitForm()" placeholder="请输入您的密码" type="password"
                                  v-model="ruleForm.password"></el-input>
                        <!--                       <a class="forget-pwd">忘记密码</a>-->
                    </div>
                    <div class="but">
                        <a @click="submitForm()">登录</a>
                    </div>
                    <div><a href="javascript:;;" @click="goWxlogin()">微信登陆</a></div>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data: function(){
            return {
                ruleForm: {
                    username: '787333868@qq.com',
                    password: ''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            goWxlogin(){
                this.$router.push({path:'/web/wxLogin'})
            },
            submitForm(formName) {
                let loginData={name:this.ruleForm.username,pwd:this.ruleForm.password};
                let _this=this;
                if (!_this.ruleForm.username) {
                    _this.$message.error('登陆账号不能为空！');
                    return
                }
                if (!_this.ruleForm.password) {
                    _this.$message.error('登陆密码不能为空！');
                    return
                }
                $_post('/Views/login.aspx',{
                    data:JSON.stringify(loginData)
                }).then(function (response) {
                    if(response.code==1){
                        localStorage.setItem('ms_user',JSON.stringify(response.data));
                        _this.$store.state.userDetail=response.data;
                        _this.$router.push('/news');
                    }else {
                        _this.$message.error(response.msg);
                    }
                })
            }
        },
        created() {

                console.log(1111)

        }
    }
</script>

<style lang="scss">
    /*去掉记住密码样式*/
    input:-webkit-autofill , textarea:-webkit-autofill, select:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px white inset;
        border: 1px solid #CCC!important;
    }


    .login-wrap {
        position: relative;
        width: 100%;
        height: 100%; display: flex; justify-content: center; align-items: center;
    }

    .ms-title {
        position: absolute;
        top: 50%;
        width: 100%;
        margin-top: -230px;
        text-align: center;
        font-size: 30px;
        color: #fff;

    }

    .ms-login {
        width: 364px;
        height: 300px;
        padding: 40px 50px 10px 50px;
        border-radius: 5px;
        background: #fff;
    }

    .login-btn {
        text-align: center;
    }

    .login-btn button {
        width: 100%;
        height: 36px;
    }

    .dialog-login {
        padding: 0 0px;

        h1 {
            text-align: center;
            font-size: 28px;
            color: #0C725E;
            font-weight: normal;
        }

        .form {
            padding: 30px 0 0 0;

            .dd {
                padding-bottom: 20px;
                position: relative;

                i {
                    position: absolute;
                    top: 9px;
                    left: 25px;
                    z-index: 2;
                    width: 25px; font-size: 32px; color:#7aa59c ;
                }
                .forget-pwd {
                    font-size: 21px;
                    color: #0C725E;
                    position: absolute;
                    right: 26px;
                    z-index: 9;
                    top: 16px;
                    cursor: pointer;
                }
            }

            .el-input__inner {
                line-height: 50px;
                height: 50px;
                border: 1px solid #979797;
                border-radius: 34px;
                font-size: 18px;
                padding-left: 66px;
            }

            .but {
                text-align: center;
                padding: 10px 0 0px 0;

                a {
                    border-radius: 40px;
                    width: 187px;
                    line-height: 49px;
                    background-color: #0C725E;
                    font-size: 18px;
                    color: #FFFFFF;
                    display: inline-block;
                    cursor: pointer;
                }
            }
        }
    }
</style>
