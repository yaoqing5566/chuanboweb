<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-date"></i>情报站</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-menu  :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="1">新闻</el-menu-item>
          <el-menu-item index="2">公告</el-menu-item>
          <el-menu-item index="3">活动</el-menu-item>
          <el-menu-item index="4">攻略</el-menu-item>
          <el-button style="float: right;margin-top: 16px"  @click="addNews" type="primary" icon="delete" class="handle-del mr10">添加</el-button>
        </el-menu>


      </div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column  prop="news_title" label="标题" ></el-table-column>
        <el-table-column prop="new_type"  :formatter="formatType" label="类型" ></el-table-column>
        <el-table-column prop="new_type"  label="方式2" >
          <template slot-scope="scope">
            {{scope.row.new_type | formatStata}}
          </template>
        </el-table-column>
        <el-table-column prop="creat_time" :formatter="formatDate" sortable label="创建日期" ></el-table-column>
        <el-table-column label="操作" width="250">
          <template slot-scope="scope">
            <el-button size="small" type="primary" @click="handleEdit(scope.$index, scope.row)" plain>编辑</el-button>
            <el-button style="width: 80px" size="small" type="success"  @click="handleTop(scope.$index, scope.row)" plain>
              {{scope.row.is_top<=0?'置顶':'取消置顶'}}
            </el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination background @current-change="handleCurrentChange" :page-size="pageSize" layout="prev, pager, next" :total="count">
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
        activeIndex: '1',
        tableData: [],
        delVisible: false,
        pageIndex:1,
        pageSize:10,
        count:0
      }
    },
    created() {
      this.getData();
    },
    filters:{
      formatStata(type){
        var str={1:'新闻',2:'公告',3:'活动',4:'攻略'};
        return str[type];
      }
    },
    computed: {

    },
    methods: {
      handleSelect(key, keyPath) {
        this.pageIndex=1;
        this.activeIndex=key;
        this.getData();
        console.log(key, keyPath);
      },
      handleCurrentChange(val) {
        this.pageIndex = val;
        this.getData();
      },
      addNews(){
        this.$router.push('/addNews');
      },
      formatType(row, column) {
        var str={1:'新闻',2:'公告',3:'活动',4:'攻略'};
        return str[row.new_type];
      },
      formatDate(row, column) {
        return moment(row.creat_time).format("YYYY-MM-DD");;
      },
      getData(){
        let _this=this;
        $_get('/Views/admin/readNews.aspx?pageIndex='+_this.pageIndex+'&pageSize='+_this.pageSize+'&type='+_this.activeIndex).then(function (response) {
          if(response.code==1){
            _this.tableData=response.data.list;
            _this.count=response.data.count;
          }else {
            _this.$message.error(response.msg);
          }
        })
      },
      handleEdit(index, row) {
        this.$router.push({path:'/addNews',query:{id:row.id}});
        console.log(index, row)
      },
      handleTop(index, row){
        let isTop=row.is_top;
        var time=0;
        if(isTop<=0){
          time=new Date().getTime();
        }
       let that=this;
        $_post('/Views/admin/addTopNews.aspx',{
          id:row.id,
          is_top:time
        }).then(function (response) {
          if(response.code==1){
            that.getData();
          }else {
            that.$message.error(response.msg);
          }
        })


      },
      handleDelete(index, row) {
        this.idx = index;
        this.removeId = row.id;
        this.delVisible = true;
      },
      // 确定删除
      deleteRow(){
        let _this=this;
        $_get('/Views/admin/deleteNews.aspx?ID='+_this.removeId).then(function (response) {
          if(response.code==1){
            _this.tableData.splice(_this.idx, 1);
            _this.$message.success('删除成功');
            _this.delVisible = false;
          }else {
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
  .del-dialog-cnt{
    font-size: 16px;
    text-align: center
  }
</style>
