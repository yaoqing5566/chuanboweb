<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 新闻</el-breadcrumb-item>
                <el-breadcrumb-item>创建</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box" style="width: 100%;">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="width: 100%">
                    <el-form-item label="名称" prop="news_title">
                        <el-input v-model="ruleForm.news_title"></el-input>
                    </el-form-item>
                    <el-form-item label="类型" prop="news_type" >
                        <el-select v-model="ruleForm.news_type" placeholder="请选择" style="width: 100%">
                            <el-option label="新闻形式" value="1"></el-option>
                            <el-option label="外链形式" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="作者">
                        <el-input v-model="ruleForm.news_author"></el-input>
                    </el-form-item>
                    <el-form-item label="封面图" prop="url">
                        <a target="_blank" :href="ruleForm.news_image">
                            <img style="width: 100px; height: 100px; vertical-align:bottom; margin-right: 10px" class="up-img-banner" :src="ruleForm.news_image" alt="">
                        </a>
                        <el-button type="primary" @click="uploadImg">选择图片</el-button>
                    </el-form-item>
                    <el-form-item label="摘要">
                        <el-input :autosize="{ minRows: 3, maxRows: 4}" type="textarea" v-model="ruleForm.news_subtitle"></el-input>
                    </el-form-item>

                    <el-form-item label="链接" v-show="ruleForm.news_type==2">
                        <el-input v-model="ruleForm.news_ztlink" placeholder="http://"></el-input>
                    </el-form-item>

                    <el-form-item label="内容" v-show="ruleForm.news_type==1">
                        <ck-editor :p_desc="ruleForm.new_content" ref="ckEditor"></ck-editor>
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
                    news_type: '',
                    news_title: '',
                    news_status:1,
                    news_image: '',
                    new_content: '',
                    news_author: '',
                    webtype:this.$store.state.userDetail.id,
                    user_id:this.$store.state.userDetail.id,
                    news_subtitle: '',
                    news_ztlink: ''
                },
                rules: {
                    news_title: [
                      { required: true, message: '请输入名称', trigger: 'blur' },
                      { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' }
                    ],
                    news_subtitle: [
                        { required: true, message: '请输入简介', trigger: 'blur' },
                        { min: 2, max:60, message: '长度在 2 到 60 个字符', trigger: 'blur' }
                    ],
                    news_type: [
                        { required: true, message: '请选择类型', trigger: 'blur' }
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
             $_get('/Views/web/getNewsDetail.aspx?id='+_this.newsId).then(function (response) {
               if(response.code==1){

                   var da=response.data[0];
                   _this.ruleForm.news_type=da.news_type+'';
                   _this.ruleForm.news_title=da.news_title;
                   _this.ruleForm.news_status=da.news_status;
                   _this.ruleForm.news_image=da.news_image.lastIndexOf('http')>=0?da.news_image:('/image/upload_news/'+da.news_image);
                   _this.ruleForm.new_content=da.new_content;
                   _this.ruleForm.news_author=da.news_author;
                   _this.ruleForm.webtype=da.webtype;
                   _this.ruleForm.news_subtitle=da.news_subtitle;
                   _this.ruleForm.news_ztlink=da.news_ztlink;
               }else {
                 _this.$message.error(response.msg);
               }
             })
           },
           submitForm(formName) {
               let _this=this;
               this.ruleForm.new_content=_this.$refs.ckEditor.getContentHtml();
               this.$refs[formName].validate((valid) => {
                    if (valid) {
                      let url='/Views/admin/news/addNews.aspx';
                      let saveData={
                        data:JSON.stringify(this.ruleForm)
                      }
                      if(this.newsId){//更新
                        url='/Views/admin/news/updateNews.aspx';
                        saveData.id=_this.newsId;
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
                        console.log(data.result.data.url);
                        that.ruleForm.news_image=data.result.data.url;

                    },
                    fail: function (e, data) {
                        console.log(e);
                    }
                })
            },
        }
    }
</script>
