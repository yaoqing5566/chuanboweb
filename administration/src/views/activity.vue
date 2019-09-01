<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i>活动列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">

            <div class="handle-box" style="overflow: hidden;padding-bottom: 20px">
                <el-input style="width: 180px" clearable v-model="select.name" placeholder="名字"
                          class="handle-input mr10"></el-input>&nbsp;&nbsp;
                <el-button type="primary" @click="searchData">查询</el-button>
                <el-button type="primary" style="float: right" icon="el-icon-edit" class="handle-del mr10" @click="add(-1,-1,'add')">
                    新建
                </el-button>
            </div>

            <el-table :data="tableData" border style="width: 100%">
                <el-table-column prop="title" label="标题"></el-table-column>
                <el-table-column prop="sub_titile" label="说明"></el-table-column>
                <el-table-column prop="creat_time" :formatter="formatDate" sortable label="创建日期"></el-table-column>
                <el-table-column label="操作" width="150">
                    <template slot-scope="scope">
                        <el-button size="small" type="primary" @click="add(scope.$index, scope.row,'edit')" plain>编辑
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

        <!-- 编辑弹出框 -->
        <el-dialog :title="dialogName" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="78px" :rules="rules">
                <el-form-item label="标题" prop="title">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item label="说明"  prop="sub_titile">
                    <el-input type="textarea" v-model="form.sub_titile"></el-input>
                </el-form-item>
                <el-form-item label="分享图片" prop="img_url">
                    <img style="vertical-align: bottom;margin-right: 10px" width="90" class="up-img-banner" :src="form.img_url" alt="">
                    <el-button type="primary" @click="uploadImg">选择图片</el-button>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitForm('form')">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                dialogQues:false,
                dialogName:'',
                tableData: [],
                count:0,
                pageIndex:1,
                pageSize:10,
                form: {
                    title: '',
                    sub_titile: '',
                    img_url:''
                },
                select:{
                    name:''
                },
                editVisible:false,
                rules: {
                    title: [
                        {required: true, message: '请输入名称', trigger: 'blur'},
                    ],
                    img_url: [
                        {required: true, message: '请上传图片', trigger: 'blur'}
                    ],
                    sub_titile: [
                        {required: true, message: '请输入介绍', trigger: 'blur'},
                    ],
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
            handleCurrentChange(val) {
                this.pageIndex = val;
                this.getData();
            },
            formatDate(row, column) {
                return moment(row.news_addtime).format("YYYY-MM-DD");;
            },
            uploadImg(event){
                let that=this;
                console.log(event.currentTarget)
                let input = $("<input type='file' name='file' />");
                input.click();
                input.fileupload({
                    dataType: "json",
                    url: "/Views/fileUpload.aspx",
                    async: true,
                    change: function (e, data) {
                        //console.log("data", data);
                        var files = data.files;
                        for (var i = 0; i < files.length; i++) {
                            var file = files[i];
                            console.log(file.size)
                            if (!/\.(jpg|png|jpeg|gif)$/i.test(file.name)) {
                                that.$message.error('文件格式错误');
                                return false;
                            }
                        }
                        return true;
                    },
                    start: function () {
                    },
                    done: function (e, data) {
                        that.form.img_url=data.result.data.url;
                        console.log(data.result.data.url);
                    },
                    fail: function (e, data) {
                        console.log(e);
                    }
                })
            },
            add(index, row,type) {
                this.dialogName='添加';
                this.form = {
                    title: '',
                    sub_titile: '',
                    img_url:''
                }
                if(type=='edit'){
                    this.dialogName='修改';
                    this.idx = index;
                    const item = this.tableData[index];
                    this.form ={
                        title: item.title,
                        sub_titile: item.sub_titile,
                        img_url:item.img_url
                    }
                }
                this.editVisible = true;
            },
            submitForm(formName) {
                let _this=this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let url='/Views/admin/addTable.aspx?T=activity_lists';
                        let sa=JSON.parse(JSON.stringify(_this.form));

                        let saveData={
                            data:JSON.stringify(sa)
                        }

                        $_post(url,saveData).then(function (response) {
                            if(response.code==1){
                                _this.$message.success('操作成功');
                                _this.editVisible = false;
                                _this.getData();
                            }else {
                                _this.$message.error(response.msg);
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                    console.log()
                })
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
                $_get('/Views/admin/activity/getList.aspx?pageIndex='+_this.pageIndex+'&pageSize='+_this.pageSize+'&name='+_this.select.name).then(function (response) {
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
