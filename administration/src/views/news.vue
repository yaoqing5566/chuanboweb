<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i>新闻列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">

            <div class="handle-box">
                <el-input style="width: 180px" clearable v-model="select.name" placeholder="名字"
                          class="handle-input mr10"></el-input>&nbsp;&nbsp;
                <el-button type="primary" @click="searchData">查询</el-button>
                <el-button type="primary" style="float: right" icon="el-icon-edit" class="handle-del mr10" @click="addNews()">
                    新建
                </el-button>
            </div>


            <el-table :data="tableData" border style="width: 100%">
                <el-table-column prop="news_title" label="标题"></el-table-column>
                <el-table-column prop="news_type" :formatter="formatType" label="类型"></el-table-column>
                <el-table-column prop="news_author" label="作者"></el-table-column>
                <el-table-column prop="news_addtime" :formatter="formatDate" sortable label="创建日期"></el-table-column>
                <el-table-column label="操作" width="250">
                    <template slot-scope="scope">
                        <el-button size="small" type="primary" @click="handleEdit(scope.$index, scope.row)" plain>编辑
                        </el-button>
                        <el-button style="width: 80px" size="small" type="success"
                                   @click="handleTop(scope.$index, scope.row)" plain>
                            {{scope.row.news_istop==0?'置顶':'取消置顶'}}
                        </el-button>
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


        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                tableData: [],
                select: {
                    name: '',
                },
                delVisible: false,
                pageIndex: 1,
                pageSize: 10,
                count: 0
            }
        },
        created() {
            this.getData();
        },
        filters: {
            formatStata(type) {
                var str = {1: '新闻', 2: '公告', 3: '活动', 4: '攻略'};
                return str[type];
            }
        },
        computed: {},
        methods: {
            searchData() {
                console.log(this.select)
                this.getData();
            },
            handleCurrentChange(val) {
                this.pageIndex = val;
                this.getData();
            },
            addNews() {
                this.$router.push('/addNews');
            },
            formatType(row, column) {
                var str = {1: '新闻形式', 2: '外链形式'};
                return str[row.news_type];
            },
            formatDate(row, column) {
                return moment(row.news_addtime).format("YYYY-MM-DD");
                ;
            },
            getData() {
                let _this = this;
                $_get('/Views/admin/news/getNews.aspx?pageIndex='+_this.pageIndex+'&pageSize='+_this.pageSize+'&type='+_this.$store.state.userDetail.id+'&name='+_this.select.name).then(function (response) {
                    if (response.code == 1) {
                        _this.tableData = response.data.list;
                        _this.count = response.data.count;
                    } else {
                        _this.$message.error(response.msg);
                    }
                })
            },
            handleEdit(index, row) {
                this.$router.push({path: '/addNews', query: {id: row.news_id}});
                console.log(index, row)
            },
            handleTop(index, row) {
                let news_istop = row.news_istop==0?1:0;
                let that = this;
                $_post('/Views/admin/news/updateNews.aspx', {
                    id: row.news_id,
                    data: JSON.stringify({news_istop:news_istop})
                }).then(function (response) {
                    if (response.code == 1) {
                        that.$message.success("操作成功！");
                        row.news_istop=news_istop;
                    } else {
                        that.$message.error(response.msg);
                    }
                })


            },
            handleDelete(index, row) {
                this.idx = index;
                this.removeId = row.news_id;
                this.delVisible = true;
            },
            // 确定删除
            deleteRow() {
                let _this = this;
                $_get('/Views/admin/news/deleteNews.aspx?ID=' + _this.removeId).then(function (response) {
                    if (response.code == 1) {
                        _this.tableData.splice(_this.idx, 1);
                        _this.$message.success('删除成功');
                        _this.delVisible = false;
                    } else {
                        _this.$message.error(response.msg);
                    }
                })


            }
        }
    }

</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }

    .del-dialog-cnt {
        font-size: 16px;
        text-align: center
    }
</style>
