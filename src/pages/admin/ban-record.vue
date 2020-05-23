<template>
  <div class="ban-record-container">

    <el-table :data="tableData" style="width: 100%;">
      <el-table-column label type="index" show-overflow-tooltip width="50" align="center"></el-table-column>
      <!-- <el-table-column prop="id" label="标识" align="center"></el-table-column> -->
      <el-table-column prop="roomId" label="房间号" align="center"></el-table-column>
      <el-table-column prop="startTime" label="封禁开始时间" align="center"></el-table-column>
      <el-table-column prop="resumeTime" label="恢复时间" width="180" align="center"></el-table-column>
      <el-table-column prop="reason" label="原因" align="center"></el-table-column>
      <el-table-column prop="status" label="状态" align="center">
        <template slot-scope="scope">{{scope.row.status===0 ? '封禁中':'已过期'}}</template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="limit"
      layout="prev, pager, next, jumper"
      :total="total"
      style="margin-top:10px;"
    ></el-pagination>
  </div>
</template>

<script>
import Api from "../../api";
export default {
  name: "ban-record",
  data() {
    return {
      tableData: [],
      currentPage: 1,
      limit: 10,
      total: 0,
      uid: null,
      disabled: null
    };
  },
  mounted() {
    this.page();
  },
  methods: {
    handleBlock(v) {
      let id = (v.id + "").split(",");
      if (v.disabled == 0) {
        Api.userBlock(id, "block").then(() => {
          this.page();
        });
      } else if (v.disabled == 1) {
        Api.userBlock(id, "unblock").then(() => {
          this.page();
        });
      }
    },
    handleInputClear() {
      this.page();
    },
    handleSearchButton() {
      this.page();
    },
    handleSelectChange() {
      this.page();
    },
    handleSizeChange(val) {
      this.limit = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.page();
    },
    page() {
      let params = {
        page:this.currentPage,
        limit:this.limit
      }
      Api.getBanRecordList(params).then(res => {
        let ret = res.data.data;
        this.tableData = ret.records;
        this.total = ret.total;
      });
    }
  }
};
</script>

<style lang="less">
.ban-record-container {
  background: #fff;
  padding: 20px;
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
</style>