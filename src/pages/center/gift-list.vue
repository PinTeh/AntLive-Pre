<template>
  <div class="gift-list" style="height:auto;box-sizing: border-box;padding:10px">
    <div class="header-operator">
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
    <el-table :data="tableData" border style="width: 100%;" size="small">
      <el-table-column label="序号" type="index" align="center" width="100"></el-table-column>
      <el-table-column prop="fromId" align="center" label="赠送者"></el-table-column>
      <el-table-column prop="presentId" align="center" label="礼物"></el-table-column>
      <el-table-column prop="unitPrice" align="center" label="礼物单价"></el-table-column>
      <el-table-column prop="number" align="center" label="礼物数量"></el-table-column>
      <el-table-column prop="totalPrice" align="center" label="总价值(开心果)"></el-table-column>
      <el-table-column prop="createTime" align="center" label="获得时间" width="180"></el-table-column>
    </el-table>
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="limit"
      layout="prev, pager, next"
      :total="total"
      style="margin:10px 0px 10px 0px;text-align:center;"
    ></el-pagination>
  </div>
</template>

<script>
import Api from "../../api";
export default {
  name: "gift-list",
  data() {
    return {
      tableData: [],
      time: "",
      total: 0,
      limit: 10,
      currentPage: 1,
      dateRange:null,
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
  methods: {
   handleDateRangeChange() {
      this.page()
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.page();
    },
    page() {
      Api.getRoomPresentList(this.currentPage, this.limit, this.dateRange + '').then(r => {
        let ret = r.data.data;
        this.tableData = ret.records;
        this.total = ret.total;
      });
    }
  },
  mounted() {
    this.page();
  }
};
</script>

<style lang="less">
.gift-list {
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