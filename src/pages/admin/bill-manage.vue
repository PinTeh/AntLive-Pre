<template>
  <div class="bill-manage-container">
    <div class="header-operator">
      <span>类型</span>
      <el-select v-model="showType" placeholder="收支类型" size="small" @change="handleSelectChange" :clearable="true">
        <el-option key="0" label="收入" value="0"></el-option>
        <el-option key="1" label="支出" value="1"></el-option>
      </el-select>
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
      :row-class-name="tableRowClassName"
    >
      <!-- <el-table-column label type="index" show-overflow-tooltip width="50" align="center"></el-table-column> -->
      <el-table-column prop="id" label="标识" align="center" width="80"></el-table-column>
      <el-table-column prop="userId" label="用户id" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="billChange" label="金额" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="balance" label="余额" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="mark" label="备注" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="createTime" label="创建时间" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="type" label="收支" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.type===0" type="success" size="mini">收入</el-tag>
          <el-tag v-else type="danger" size="mini">支出</el-tag>
        </template>
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
  name: "bill-manage",
  data() {
    return {
      tableData: [],
      currentPage: 1,
      limit: 10,
      total: 0,
      showType: null,
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
    handleSelectChange() {
      this.page()
    },
    tableRowClassName({ row }) {
      if (row.type !== 0) {
        return "success-row";
      } else {
        return "warning-row";
      }
    },
    handleSizeChange(val) {
      this.limit = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.page();
    },
    page() {
      Api.adminBillList(this.currentPage, this.limit,this.showType,this.dateRange + '').then(res => {
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