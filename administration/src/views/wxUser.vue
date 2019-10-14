<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i>微信用户</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">

            <div class="handle-box" style="overflow: hidden;padding-bottom: 20px">
                <el-input style="width: 180px" clearable v-model="select.name" placeholder="名字"
                          class="handle-input mr10"></el-input>&nbsp;&nbsp;
                <el-button type="primary" @click="searchData">查询</el-button>
                <el-link type="danger" style="font-weight: bold; margin-left: 20px;font-size: 16px">共：{{count}}</el-link>
            </div>

            <el-table :data="tableData" border style="width: 100%">
                <el-table-column  label="图像" width="100">
                    <template slot-scope="scope">
                        <img :src="scope.row.headimgurl" style="border-radius: 50%" width="50" height="50"/>
                    </template>
                </el-table-column>
                <el-table-column prop="nickname" label="名称" :formatter="formatNickname"></el-table-column>
                <el-table-column  label="性别">
                    <template slot-scope="scope">
                       {{scope.row.sex==1?'男':'女'}}
                    </template>
                </el-table-column>
                <el-table-column  label="关注来源">
                    <template slot-scope="scope">
                        {{subscribeSceneStr[scope.row.subscribe_scene]}}
                    </template>
                </el-table-column>
                <el-table-column prop="updtae_time" :formatter="formatDate" sortable label="更新日期"></el-table-column>
                <!--<el-table-column label="操作" width="150">-->
                    <!--<template slot-scope="scope">-->
                        <!--<el-button size="small" type="primary" @click="add(scope.$index, scope.row,'edit')" plain>编辑-->
                        <!--</el-button>-->
                        <!--<el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除-->
                        <!--</el-button>-->
                    <!--</template>-->
                <!--</el-table-column>-->
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" :page-size="pageSize"
                               layout="prev, pager, next" :total="count">
                </el-pagination>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                tableData: [],
                count:0,
                pageIndex:1,
                pageSize:10,
                select:{
                    name:'',
                    type:""
                },
                subscribeSceneStr:{
                    'ADD_SCENE_SEARCH':'公众号搜索',
                    'ADD_SCENE_ACCOUNT_MIGRATION':'公众号迁移',
                    'ADD_SCENE_PROFILE_CARD':'名片分享',
                    'ADD_SCENE_QR_CODE':'扫描二维码',
                    'ADD_SCENEPROFILE LINK':'图文页内名称点击',
                    'DD_SCENE_PROFILE_ITEM':'图文页右上角菜单',
                    'ADD_SCENE_PAID':'支付后关注',
                    'ADD_SCENE_OTHERS':'其他',
                }

            }
        },
        created() {
            this.getData();
        },
        filters: {

        },
        computed: {
            getRandom(){
                return (new Date()).getTime() + "-" + Math.floor(Math.random() * 10000);
            },

        },
        watch: {
            '$route' (to, from) {
                this.pageIndex=1;
                this.select.name="";
                this.getData();
            }
        },
        methods: {
            formatNickname: function (row, column) {
                return decodeURIComponent(row.nickname);
            },
            handleCurrentChange(val) {
                this.pageIndex = val;
                this.getData();
            },
            formatDate(row, column) {
                return moment(row.updtae_time).format("YYYY-MM-DD HH:mm:ss");;
            },
            searchData() {
                console.log(this.select)
                this.getData();
            },
            handleDelete(index, row) {
                let _this = this;
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    $_get('/Views/admin/deleteTable.aspx?id=' +row.id+"&T=questionnaire_list").then(function (response) {
                        if (response.code == 1) {
                            _this.tableData.splice(index, 1);
                            _this.$message.success('删除成功');
                            _this.delVisible = false;
                        } else {
                            _this.$message.error(response.msg);
                        }
                    })
                }).catch(() => {
                });
            },
            getData() {
                let _this = this;
                this.select.type=this.$route.meta.type;
                $_get('/Views/admin/weixin/getWxUser.aspx?pageIndex='+_this.pageIndex+'&pageSize='+_this.pageSize+'&name='+_this.select.name+'&type='+_this.select.type).then(function (response) {
                    if (response.code == 1) {
                        _this.tableData = response.data.list;
                        _this.count = response.data.count;
                    } else {
                        _this.$message.error(response.msg);
                    }
                })
            }
        }
    }

</script>

<style  lang="scss">
    .questionnaire .options{
        position: relative; padding:0 37px 10px 0px;
        .el-icon-error{
            position: absolute;; right: 10px; top: 10px; color: red;

        }
    }
</style>
