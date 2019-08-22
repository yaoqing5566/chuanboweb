<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i>微信菜单</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">

            <div class="handle-box" style="overflow: hidden;padding-bottom: 20px">
                <el-button type="primary" style="float: right" icon="el-icon-edit" class="handle-del mr10" @click="add('',1)">
                    新建
                </el-button>
            </div>
            <el-table :data="tableData" border style="width: 100%"
                      row-key="id"
                      default-expand-all
                      :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
                <el-table-column prop="name" label="菜单名字"></el-table-column>
                <el-table-column prop="remarks" label="菜单类型"></el-table-column>
                <el-table-column prop="creat_time" :formatter="formatDate" sortable label="创建日期"></el-table-column>
                <el-table-column label="操作" width="280">
                    <template slot-scope="scope">
                        <el-button size="small" type="primary" @click="add(scope.row)" plain>编辑</el-button>
                        <el-button size="small" type="success" @click="add(scope.row,'2')" plain>添加二级菜单</el-button>
                        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>


        </div>

        <!-- 编辑弹出框 -->
        <el-dialog :title="dialogName" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="50px" :rules="rules">
                <el-form-item label="标题" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="类型" prop="type">
                    <el-select v-model="form.type" clearable placeholder="类型" style="width: 100%">
                        <el-option value="1" label="内容"></el-option>
                        <el-option value="2" label="链接"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="说明" v-if="form.type==1">
                    <el-input type="textarea"  placeholder="有链接请输入<a href='wwww.baidu.com'>百度</a>" v-model="form.remarks"></el-input>
                </el-form-item>
                <el-form-item label="链接" v-if="form.type==2">
                    <el-input v-model="form.url"></el-input>
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
                dialogName:'',
                tableData:  [{
                    id: 2,
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    id: 3,
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄',
                    children: [{
                        id: 31,
                        date: '2016-05-01',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1519 弄'
                    }, {
                        id: 22,
                        date: '2016-05-01',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1519 弄'
                    }]
                }, {
                    id: 4,
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }],
                select:{
                    name:''
                },
                form: {
                    name: '',
                    remarks: '',
                    type:'',
                    url:''
                },
                editVisible:false,
                rules: {
                    name: [
                        {required: true, message: '请输入名称', trigger: 'blur'},
                    ],
                    type: [
                        {required: true, message: '请选择类型', trigger: 'change'},
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


        },
        methods: {
            formatDate(row, column) {
                return moment(row.news_addtime).format("YYYY-MM-DD");;
            },
            add(row,menuLevel) {
                this.menuLevel=menuLevel;
                this.dialogName='添加';
                this.idx = '';
                this.form = {
                    name: '',
                    remarks: '',
                    type:'',
                    url:''
                }
                if(row&&menuLevel!=2){
                    this.dialogName='修改';
                    this.idx = row.id;
                }
                this.editVisible = true;
            },
            submitForm(formName) {
                let _this=this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let url='/Views/admin/addTable.aspx?T=cms_wx_menu';
                        let sa=JSON.parse(JSON.stringify(_this.form));
                        if(_this.menuLevel==1){
                            sa.pid=0;
                        }else {

                        }
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
            getData() {
                let _this = this;
                $_get('/Views/admin/weixin/getMenu.aspx').then(function (response) {
                    if (response.code == 1) {
                        _this.tableData = response.data.list;

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
