<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-date"></i> banner列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box" style="height: 26px">
        <el-button style="float: right" type="primary" icon="delete" class="handle-del mr10" @click="handleEdit(-1,-1,'add')">新建</el-button>
      </div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="news_title" label="标题"></el-table-column>
        <el-table-column prop="creat_time" :formatter="formatDate" sortable label="创建日期"></el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button size="small" type="primary" @click="handleEdit(scope.$index, scope.row,'edit')" plain>编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
        <el-form-item label="链接" prop="link">
          <el-input v-model="form.link"></el-input>
        </el-form-item>
        <el-form-item label="图片" prop="url">
          <img class="up-img-banner" src="" alt="">
          <el-button type="primary" @click="uploadImg">选择图片</el-button>
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
        tableData: [],
        dialogName:'添加',
        form: {
          name: '',
          url: '',
          link:''
        },
        rules: {
          name: [
            {required: true, message: '请输入名称', trigger: 'blur'},
            {min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur'}
          ],
          url: [
            {required: true, message: '请上传图片', trigger: 'blur'}
          ]
        },
        delVisible: false,
        editVisible: false
      }
    },
    created() {
      this.getData();
    },
    computed: {},
    methods: {
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


          },
          fail: function (e, data) {
            console.log(e);
          }
        })


      },
      formatDate(row, column) {
        return moment(row.creat_time).format("YYYY-MM-DD");
      },
      getData(){
        let _this = this;
        $_get('/Views/admin/readNews.aspx?pageIndex=1&pageSize=10&type=0').then(function (response) {
          if (response.code == 1) {
            _this.tableData = response.data.list;
          } else {
            _this.$message.error(response.msg);
          }
        })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {

        })
      },
      handleEdit(index, row,type) {
          this.dialogName='添加';
          this.form = {
            name: '',
            url:''
          }
          if(type=='edit'){
            this.dialogName='修改';
            this.idx = index;
            const item = this.tableData[index];
            this.form = {
              name: item.news_title
            }
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
        $_get('/Views/admin/deleteNews.aspx?ID=' + _this.removeId).then(function (response) {
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
  .up-img-banner {
    width: 100px;
    height: 100px;
    background: #f8f8f8;
    border: 1px solid #eee;
    display: inline-block;
    vertical-align: bottom;
    margin-right: 10px
  }

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

