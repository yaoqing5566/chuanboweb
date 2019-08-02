<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i>问卷列表</el-breadcrumb-item>
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
                <el-table-column prop="name" label="标题"></el-table-column>
                <el-table-column prop="remarks" label="说明"></el-table-column>
                <el-table-column prop="creat_time" :formatter="formatDate" sortable label="创建日期"></el-table-column>
                <el-table-column label="操作" width="250">
                    <template slot-scope="scope">
                        <el-button size="small" type="primary" @click="add(scope.$index, scope.row,'edit')" plain>编辑
                        </el-button>
                        <el-button style="width: 80px" size="small" @click="editQues(scope.$index, scope.row)" type="success">编辑问卷</el-button>
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
            <el-form ref="form" :model="form" label-width="50px" :rules="rules">
                <el-form-item label="标题" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="说明" prop="explain">
                    <el-input v-model="form.remarks"></el-input>
                </el-form-item>
                <el-form-item label="图片" prop="cover">
                    <img style="vertical-align: bottom;margin-right: 10px" width="90" class="up-img-banner" :src="form.cover" alt="">
                    <el-button type="primary" @click="uploadImg">选择图片</el-button>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitForm('form')">确 定</el-button>
            </span>
        </el-dialog>


        <!-- 编辑问答 -->
        <el-dialog title="编辑问答" :visible.sync="dialogQues" width="500">
            <el-form ref="form2" :model="form" label-width="50px" :rules="rules">
                <el-collapse v-model="activeName" accordion>
                    <el-collapse-item title="一致性 Consistency" name="1">
                        <el-form-item label="题目">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                        <el-form-item label="备注">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                        <el-form-item label="类型">
                            <el-select placeholder="请选择" style="width: 100%">
                                <el-option  label="单选" value="1"></el-option>
                                <el-option label="多选" value="2"></el-option>
                                <el-option label="填空" value="3"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-collapse-item>
                </el-collapse>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogQues = false">取 消</el-button>
                <el-button type="primary" @click="submitForm('form2')">保存</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                activeName: '1',
                dialogQues:true,
                dialogName:'',
                tableData: [],
                count:0,
                pageIndex:1,
                pageSize:10,
                select:{
                    name:''
                },
                form: {
                    name: '',
                    remarks: '',
                    cover:''
                },
                editVisible:false,
                rules: {
                    name: [
                        {required: true, message: '请输入名称', trigger: 'blur'},
                    ],
                    cover: [
                        {required: true, message: '请上传图片', trigger: 'blur'}
                    ]
                },
            }
        },
        created() {
            this.getData();
        },
        filters: {

        },
        computed: {},
        methods: {
            editQues(index,row) {

            },
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
                        that.form.cover=data.result.data.url;
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
                    name: '',
                    remarks: '',
                    cover:''
                }
                if(type=='edit'){
                    this.dialogName='修改';
                    this.idx = index;
                    const item = this.tableData[index];
                    this.form ={
                        name: item.name,
                        remarks: item.remarks,
                        cover:item.cover
                    }
                }

                this.editVisible = true;
            },
            submitForm(formName) {
                let _this=this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let url='/Views/admin/addTable.aspx?T=questionnaire_list';
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
                this.idx = index;
                this.removeId = row.id;
                this.$store.commit('setDialog',{
                    title:'提示',
                    visible:true,
                    msg:'删除不可恢复，是否确定删除？',
                    confirm:function () {
                        $_get('/Views/admin/deleteTable.aspx?id=' + _this.removeId+"&T=questionnaire_list").then(function (response) {
                            if (response.code == 1) {
                                _this.tableData.splice(_this.idx, 1);
                                _this.$message.success('删除成功');
                                _this.delVisible = false;
                            } else {
                                _this.$message.error(response.msg);
                            }
                        })
                    }
                })
            },
            getData() {
                let _this = this;
                $_get('/Views/tools/questionnaire/getList.aspx?pageIndex='+_this.pageIndex+'&pageSize='+_this.pageSize+'&name='+_this.select.name).then(function (response) {
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

<style scoped>

</style>
