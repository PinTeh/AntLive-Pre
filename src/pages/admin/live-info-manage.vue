<template>
  <div class="bill-manage-container">
    <div class="header-operator">
      <span>房间号</span>
    <el-input placeholder="请输入房间号" v-model="roomId" style="width:200px" size="small">
        <el-button slot="append" @click="handleSearchButtonClick" icon="el-icon-search"></el-button>
      </el-input>
      <span>范围</span>
      <el-date-picker
        v-model="dateRange"
        type="datetimerange"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions"
        @change="handleDateRangeChange"
        size="small"
        value-format="yyyy-MM-dd HH:mm"
      ></el-date-picker>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      class="room-table"
    >
      <el-table-column label type="index" width="50" align="center"></el-table-column>
      <!-- <el-table-column prop="id" label="标识" align="center" width="80"></el-table-column> -->
      <el-table-column prop="userId" label="用户id" width="130" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="roomId" label="房间号"  width="130" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="startTime" label="开始时间" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="endTime" label="结束时间" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="status" label="当前状态" align="center" show-overflow-tooltip></el-table-column>
    </el-table>
    <el-pagination
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
  name: "live-info-manage",
  data() {
    return {
      tableData: [],
      currentPage: 1,
      limit: 10,
      total: 0,
      roomId: null,
      dateRange: null,
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      }
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
      Api.adminLiveInfoList(this.currentPage, this.limit,this.roomId,this.dateRange + '').then(res => {
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
  padding:20px;
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