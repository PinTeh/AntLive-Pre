<template>
  <div class="bill-manage-container">
    <div class="header-operator">

    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      class="room-table"
    >
      <el-table-column label type="index" width="50" align="center"></el-table-column>
      <el-table-column prop="userId" label="用户id" width="130" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="roomId" label="房间号"  width="130" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="resumeTime" label="解封时间" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="createTime" label="封禁时间"  align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="reason" label="原因"  align="center" show-overflow-tooltip></el-table-column>
      <el-table-column label="当前状态" align="center" show-overflow-tooltip>
         <template> 
          <span style="color:#ff8686;">封禁中</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="limit"
      layout="prev, pager, next, jumper"
      :total="total"
      hide-on-single-page
      style="margin-top:10px;"
    ></el-pagination>
  </div>
</template>

<script>
import Api from "../../api";
export default {
  name: "live-ban-manage",
  data() {
    return {
      tableData: [],
      currentPage: 1,
      limit: 10,
      total: 0,
      roomId: null,
      dateRange: null
    };
  },
  mounted() {
    this.page();
  },
  methods: {
    handleDateRangeChange() {
      this.page()
    },
    handleSearchButtonClick() {
      this.page()
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.page();
    },
    page() {
      Api.adminLiveBanList(this.currentPage, this.limit).then(res => {
        let ret = res.data.data;
        this.tableData = ret.records;
        this.total = ret.total;
      });
    }
  }
};
</script>

<style lang="less">
.bill-manage-container {
  background: #fff;
  padding: 20px;
  .el-table .warning-row {
    background: rgba(32, 255, 125, 0.089);
  }

  .el-table .success-row {
    background: rgba(255, 193, 193, 0.137);
  }
  .header-operator {
    text-align: left;
    padding: 10px 0px 5px 0px;
    height: 40px;
    background: rgba(255, 255, 255, 0.315);
    span {
      font-size: 13px;
      color: rgb(100, 100, 100);
      margin: 0px 5px 0px 20px;
    }
  }
}
.room-table .cell {
  max-height: 24px !important;
}
</style>