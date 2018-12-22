<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-date"></i> 预约活动</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="mobile" label="手机号"></el-table-column>
        <el-table-column prop="type" label="类型"></el-table-column>
        <el-table-column prop="creat_time" :formatter="formatDate" sortable label="预约日期"></el-table-column>
        <!--<el-table-column label="操作" width="180">-->
          <!--<template slot-scope="scope">-->
            <!--<el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>-->
          <!--</template>-->
        <!--</el-table-column>-->
      </el-table>
      <div class="pagination">
        <el-pagination background @current-change="handleCurrentChange" :page-size="pageSize" layout="prev, pager, next" :total="count">
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
        delVisible: false,
        pageIndex:1,
        pageSize:10,
        count:0
      }
    },
    created() {
      this.getData();
    },
    computed: {},
    methods: {
      handleCurrentChange(val) {
        this.pageIndex = val;
        this.getData();
      },
      formatDate(row, column) {
        return moment(row.creat_time).format("YYYY-MM-DD");
      },
      getData(){
        let _this = this;
        $_get('/Views/admin/readActivity.aspx?pageIndex='+_this.pageIndex+'&pageSize='+_this.pageSize).then(function (response) {
          if (response.code == 1) {
            _this.tableData = response.data.list;
            _this.count=response.data.count;
          } else {
            _this.$message.error(response.msg);
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

