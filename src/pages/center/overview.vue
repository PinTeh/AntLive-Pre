<template>
  <div class="overview" style="height:auto;box-sizing: border-box;padding:10px">
    <div class="header-operator">
      <el-date-picker
        v-model="dateRange"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions"
        @change="handleDateRangeChange"
        size="small"
        value-format="yyyy-MM-dd"
      ></el-date-picker>
      <span>{{'总时长： ' + time + '分钟'}}</span>
      <el-tooltip effect="dark" content="图表显示" placement="bottom">
        <el-button icon="el-icon-s-data" size="mini" plain @click="chartShow = !chartShow"></el-button>
      </el-tooltip>
    </div>
    <el-table :data="tableData" border style="width: 100%;" size="small">
      <el-table-column label="序号" type="index" align="center" width="100"></el-table-column>
      <el-table-column prop="startTime" label="开始时间" align="center"></el-table-column>
      <el-table-column prop="endTime" label="结束时间" align="center"></el-table-column>
      <el-table-column prop="time" align="center" label="时长(分)"></el-table-column>
    </el-table>
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="limit"
      layout="prev, pager, next"
      :total="total"
      style="margin:10px 0px 10px 0px;text-align:center;"
    ></el-pagination>

    <div v-show="chartShow" id="c1"></div>
  </div>
</template>

<script>
import { Column } from "@antv/g2plot";
import Api from "../../api";
export default {
  name: "overview",
  data() {
    return {
      tableData: [],
      time: "",
      dateRange: null,
      total: 0,
      limit: 10,
      currentPage: 1,
      columnPlot: null,
      chartShow:false,
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
    page() {
      Api.getLiveStatInfo(
        this.currentPage,
        this.limit,
        this.dateRange + ""
      ).then(res => {
        let r = res.data.data;
        this.tableData = r.liveStats;
        this.total = r.total;
        this.time = r.totalTime;
        if (this.columnPlot == null) {
          this.initPlot(this.tableData);
        }else{
          this.columnPlot.changeData(this.tableData);
        }
      });
    },
    handleDateRangeChange() {
      this.page();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.page();
    },
    initPlot(data) {
      this.columnPlot = new Column("c1", {
        title: {
          visible: true,
          text: "开播图表"
        },
        forceFit: true,
        data,
        padding: "auto",
        xField: "startTime",
        yField: "time",
        renderer: "svg",
        pixelRatio: 2,
        meta: {
          startTime: {
            alias: "开始时间",
            formatter: v => {
              return `${v}`;
            }
          },
          time: {
            alias: "开播时长(分)"
          }
        }
      });
      this.columnPlot.render();
    }
  },
  mounted() {
    this.page();
  }
};
</script>

<style lang="less">
.overview {
  .header-operator {
    text-align: left;
    padding: 10px 0px 5px 0px;
    height: 40px;
    background: rgba(255, 255, 255, 0.315);
    span {
      font-size: 13px;
      color: rgb(100, 100, 100);
      margin: 0px 15px 0px 20px;
    }
  }
}
</style>