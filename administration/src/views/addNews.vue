<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 情报站</el-breadcrumb-item>
                <el-breadcrumb-item>创建</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box" style="width: 100%;">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="width: 100%">
                    <el-form-item label="名称" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="类型" prop="type" >
                        <el-select v-model="ruleForm.type" placeholder="请选择" style="width: 100%">
                            <el-option label="新闻" value="1"></el-option>
                            <el-option label="公告" value="2"></el-option>
                            <el-option label="活动" value="3"></el-option>
                            <el-option label="攻略" value="4"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="摘要">
                        <el-input type="textarea" v-model="ruleForm.abstract"></el-input>
                    </el-form-item>
                    <el-form-item label="内容" prop="desc">
                        <ck-editor :p_desc="ruleForm.desc" ref="ckEditor"></ck-editor>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
                        <el-button @click="resetForm('ruleForm')">取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>

    </div>
</template>
<script>


    import ckEditor from '../components/Ckeditor.vue';
    export default {
        components:{
          ckEditor
         },
        data() {
            return {
                newsId:'',
                ruleForm: {
                    name: '',
                    type: '',
                    abstract:'',
                    desc: ''
                },
                rules: {
                    name: [
                      { required: true, message: '请输入活动名称', trigger: 'blur' },
                      { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' }
                    ],
                    abstract: [
                        { required: true, message: '请输入活动名称', trigger: 'blur' },
                        { min: 2, max:60, message: '长度在 2 到 60 个字符', trigger: 'blur' }
                    ],
                    type: [
                        { required: true, message: '请选择类型', trigger: 'change' }
                    ],
                    desc: [
                        { required: true, message: '请填写内容', trigger: 'blur' }
                    ]
                }
            };
        },
      mounted(){

      },
        created(){

          this.newsId=this.$route.query.id;
          if(this.newsId){
            this.getData();
          }

        },
        methods: {
           getData(){
             let _this=this;
             $_get('/Views/admin/getNewsID.aspx?id='+_this.newsId).then(function (response) {
               if(response.code==1){
                 var da=response.data[0];
                  _this.ruleForm.name=da.news_title;
                 _this.ruleForm.type=da.new_type+'';
                 _this.ruleForm.desc=da.new_content;
                 _this.ruleForm.abstract=da.abstract;
                 _this.ruleForm.id=da.id;
               }else {
                 _this.$message.error(response.msg);
               }
             })
           },
            submitForm(formName) {
               let _this=this;
               this.ruleForm.desc=_this.$refs.ckEditor.getContentHtml();
               this.$refs[formName].validate((valid) => {
                    if (valid) {
                      let url='/Views/admin/addNews.aspx';
                      let saveData={
                        data:JSON.stringify({news_title:this.ruleForm.name,new_type:this.ruleForm.type,new_content:this.ruleForm.desc,abstract:this.ruleForm.abstract})
                      }
                      if(this.newsId){//更新
                        url='/Views/admin/updateNews.aspx';
                        saveData.id=_this.ruleForm.id;
                      }
                      console.log(this.ruleForm)
                      $_post(url,saveData).then(function (response) {
                            if(response.code==1){
                              _this.$message.success('操作成功');
                              _this.$router.push('/news');
                            }else {
                              _this.$message.error(response.msg);
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>
