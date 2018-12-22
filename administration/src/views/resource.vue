<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-date"></i> 资源站管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box" style="height: 56px">
        <el-menu  :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1" v-show="pageType==1">图片</el-menu-item>
            <el-menu-item index="2" v-show="pageType==1">视频</el-menu-item>
            <el-menu-item index="3" v-show="pageType==1">同人</el-menu-item>

            <el-menu-item index="4" v-show="pageType==4">情报站</el-menu-item>
            <el-menu-item index="5" v-show="pageType==4">游戏特色</el-menu-item>
          <el-button style="float: right;margin-top: 16px" type="primary" icon="delete" class="handle-del mr10" @click="handleEdit(-1,-1,'add')">添加</el-button>
        </el-menu>

      </div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="title" :formatter="formatTitle" label="标题"></el-table-column>
        <el-table-column prop="creat_time" :formatter="formatDate" sortable label="创建日期"></el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button size="small" type="primary" @click="handleEdit(scope.$index, scope.row,'edit')" plain>编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination background @current-change="handleCurrentChange" :page-size="pageSize" layout="prev, pager, next" :total="count">
        </el-pagination>
      </div>
    </div>

    <!-- 编辑弹出框 -->
    <el-dialog :title="dialogName" :visible.sync="editVisible" width="30%">
      <el-form ref="form" :model="form" label-width="55px" :rules="rules">
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="副标题" prop="subTitle" v-if="activeIndex==5">
          <el-input v-model="subTitle"></el-input>
        </el-form-item>
        <el-form-item label="链接" prop="link">
          <el-input v-model="form.link"></el-input>
        </el-form-item>
        <el-form-item label="图片" prop="cover">
          <img class="up-img-banner" :src="form.cover" alt="">
          <el-button type="primary" @click="uploadImg">选择图片</el-button>
        </el-form-item>

        <el-form-item label="视频" v-if="activeIndex==2&&editVisible">
           <div class="video-file"></div>
          <el-button type="primary" @click="uploadVideo">选择视频</el-button>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitForm('form')">确 定</el-button>
            </span>
    </el-dialog>

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
        pageType:"1",
        activeIndex: "1",
        tableData: [],
        dialogName:'添加',
        pageIndex:1,
        pageSize:10,
        count:0,
        subTitle:'',
        form: {
          title: '',
          cover:'',
          link:'',
          video:''
        },
        rules: {
          name1: [
            {required: true, message: '请输入名称', trigger: 'blur'},
            {min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur'}
          ],
          cover: [
            {required: true, message: '请上传图片', trigger: 'blur'}
          ]
        },
        delVisible: false,
        editVisible: false
      }
    },
    created() {
      this.init();
      this.getData();
    },
    watch: {
      '$route' (to, from) {
        this.init();
        this.getData();
      }
    },
    computed: {},
    methods: {
        init(){
          if(this.$route.meta.type==1){
            this.pageType="1";
          }
          if(this.$route.meta.type==4){
            this.pageType="4";
          }
          this.activeIndex=this.pageType;
        },
      handleCurrentChange(val) {
        this.pageIndex = val;
        this.getData();
      },
      handleSelect(key, keyPath) {
        this.pageIndex=1;
        this.activeIndex=key;
        this.getData();
        console.log(key, keyPath);
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
      uploadVideo(event){
        let that=this;
        console.log(event.currentTarget)
        let input = $("<input type='file' name='file' />");
        input.click();
        input.fileupload({
          dataType: "json",
          url: "/Views/fileUpload.aspx?type=video",
          async: true,
          change: function (e, data) {
            //console.log("data", data);
            var files = data.files;
            for (var i = 0; i < files.length; i++) {
              var file = files[i];
              console.log(file.size)
              if (!/\.(mp4)$/i.test(file.name)) {
                that.$message.error('文件格式错误');
                return false;
              }
            }
            $(".video-file").html("上传当中。。。");
            return true;
          },
          start: function () {
          },
          done: function (e, data) {
            that.form.video=data.result.data.url;

            that.$nextTick( () => {
              var videoHTML='<video width="100%" height="120" src="'+data.result.data.url+'" controls="controls">your browser does not support the video tag</video>'
              $(".video-file").html(videoHTML);
            })

            console.log(data.result.data.url);
          },
          fail: function (e, data) {
            console.log(e);
          }
        })
      },
      formatDate(row, column) {
        console.log(row)
        return moment(row.creat_time).format("YYYY-MM-DD");
      },
      formatTitle(row, column) {
        return row.type==5?(JSON.parse(row.title)[0]+' '+JSON.parse(row.title)[1]):row.title;
      },
      getData(){
        let _this=this;
        $_get('/Views/admin/readBanner.aspx?pageIndex='+_this.pageIndex+'&pageSize='+_this.pageSize+'&type='+_this.activeIndex).then(function (response) {
          if(response.code==1){
            _this.tableData=response.data.list;
            _this.count=response.data.count;
          }else {
            _this.$message.error(response.msg);
          }
        })
      },
      submitForm(formName) {
         let _this=this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let url='/Views/admin/addBanner.aspx';
            let sa={
              title:this.form.title,
              cover:this.form.cover,
              link:this.form.link,
              type:this.activeIndex
            };
            if(_this.activeIndex==2){
              sa.video=this.form.video;
            }
            if(_this.activeIndex==5){
              sa.title=[this.form.title,this.subTitle];
              if(_this.tableData.length>=3&&_this.dialogName!='修改'){
                _this.$message.error('最多只能添加三条数据！');
                return;
              }

            }

            let saveData={
              data:JSON.stringify(sa)
            }
            if(this.dialogName=='修改'){//修改
              url='/Views/admin/updateBanner.aspx';
              saveData.id=_this.form.id;
            }
            console.log(this.form)
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
      handleEdit(index, row,type) {
          this.dialogName='添加';
          this.subTitle='';
          this.form = {
            title: '',
            cover:'',
            link:'',
            video:''
          }
          if(type=='edit'){
            this.dialogName='修改';
            this.idx = index;
            const item = this.tableData[index];
            this.form = {
              title: item.title,
              cover:item.cover,
              link:item.link,
              id:item.id,
              video:item.video
            }
            if(this.activeIndex==5){
              this.form.title=JSON.parse(item.title)[0];
              this.subTitle=JSON.parse(item.title)[1];
            }

            this.$nextTick( () => {
              var videoHTML='<video width="100%" height="120" src="'+item.video+'" controls="controls">your browser does not support the video tag</video>'
              $(".video-file").html(videoHTML);
            })

          }
        this.editVisible = true;
      },
      handleDelete(index, row) {
        this.idx = index;
        this.removeId = row.id;
        this.delVisible = true;
      },
      // 确定删除
      deleteRow(){
        let _this = this;
        $_get('/Views/admin/deleteBanner.aspx?ID=' + _this.removeId).then(function (response) {
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
  .up-img-banner {
    width: 100px;
    height: 100px;
    background: #f8f8f8;
    border: 1px solid #eee;
    display: inline-block;
    vertical-align: bottom;
    margin-right: 10px
  }

  .handle-select {
    width: 120px;
  }

  .handle-input {
    width: 300px;
    display: inline-block;
  }
  .del-dialog-cnt{
    font-size: 16px;
    text-align: center
  }
</style>

