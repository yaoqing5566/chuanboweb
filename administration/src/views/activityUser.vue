<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i>参加活动人员</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">

            <div class="handle-box" style="overflow: hidden;padding-bottom: 20px">
                <el-input style="width: 180px" clearable v-model="select.name" placeholder="名字"
                          class="handle-input mr10"></el-input>&nbsp;&nbsp;
                <el-button type="primary" @click="searchData">查询</el-button>
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
                <el-table-column  label="照片">
                    <template slot-scope="scope">
                        <img :src="img" width="50" style="margin: 0 3px" v-for="img in imgsArr(scope.row.imgs)"/>
                    </template>
                </el-table-column>
                <el-table-column prop="creat_time" :formatter="formatDate" sortable label="创建日期"></el-table-column>
                <el-table-column label="操作" width="150">
                    <template slot-scope="scope">
                        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
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
                    name:''
                },

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
        methods: {
            imgsArr(data){
                console.log(data)
                return data.split('-');
            },
            formatNickname: function (row, column) {
                return decodeURIComponent(row.nickname);
            },
            handleCurrentChange(val) {
                this.pageIndex = val;
                this.getData();
            },
            formatDate(row, column) {
                return moment(row.news_addtime).format("YYYY-MM-DD");;
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
                    $_get('/Views/admin/deleteTable.aspx?id=' +row.id+"&T=users_add_activity").then(function (response) {
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
                let id=this.$route.query.id;
                $_get('/Views/admin/activity/getAddUserList.aspx?pageIndex='+_this.pageIndex+'&pageSize='+_this.pageSize+'&name='+_this.select.name+'&activityId='+id).then(function (response) {
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
