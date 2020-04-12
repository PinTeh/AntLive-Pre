<template>
  <div class="dan-mu-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="近7天总计" name="rencent7"></el-tab-pane>
      <el-tab-pane label="近30天总计" name="rencent30"></el-tab-pane>
    </el-tabs>
    <div class="dan-mu-sub-container">
      <el-tabs v-model="subActiveName" @tab-click="handleSubClick">
        <el-tab-pane label="人气统计" name="1"></el-tab-pane>
        <el-tab-pane label="弹幕统计" name="2"></el-tab-pane>
      </el-tabs>
    </div>
    <div id="c1"></div>
  </div>
</template>

<script>
import Api from "../../api";
import { Line } from "@antv/g2plot";
export default {
  name: "dan-mu",
  data() {
    return {
      activeName: "rencent7",
      plot: "",
      plotData: [],
      subActiveName: "1"
    };
  },
  mounted() {
    this.initData(7);
  },
  methods: {
    handleClick(tab) {
      switch (tab.name) {
        case "rencent7":
          this.initData(7);
          break;
        case "rencent30":
          this.initData(30);
          break;
        default:
          break;
      }
    },
    handleSubClick(tab){
        console.log(tab)
    },
    packageObject(v) {
      var member = new Object();
      var visitor = new Object();
      var total = new Object();
      member["value"] = v.memberNumber;
      visitor["value"] = v.visitorNumber;
      total["value"] = v.totalNumber;
      member["date"] = v.date;
      member["type"] = "会员人气";
      visitor["date"] = v.date;
      visitor["type"] = "游客人气";
      total["date"] = v.date;
      total["type"] = "总人气";
      this.plotData.push(member);
      this.plotData.push(visitor);
      this.plotData.push(total);
    },
    initData(days) {
      Api.getStatView(days).then(res => {
        let data = res.data.data;
        this.plotData = [];
        data.map(v => {
          this.packageObject(v);
        });
        if (this.plot == "") {
          this.initPlot(this.plotData);
        } else {
          this.plot.changeData(this.plotData);
        }
      });
    },
    initPlot(data) {
      this.plot = new Line("c1", {
        title: {
          visible: false,
          text: "带数据点的折线图"
        },
        description: {
          visible: true,
          text: "人气指数统计"
        },
        data,
        smooth: false,
        padding: "auto",
        xField: "date",
        yField: "value",
        point: {
          visible: true
        },
        label: {
          visible: false,
          type: "point"
        },
        seriesField: "type",
        meta: {
          value: {
            alias: "指数",
            formatter: v => {
              return `${v}p`;
            }
          }
        }
      });

      this.plot.render();
    }
  }
};
</script>

<style lang="less">
.dan-mu-container {
  height: 500px;
  box-sizing: border-box;
  padding: 0px 10px 0px 10px;
  .el-tabs__header {
    margin: 0px;
  }
  .dan-mu-sub-container {
    padding:10px;
    .el-tabs__item {
      font-size: 10px;
      line-height: 25px;
      height: 25px !important;
    }
    .el-tabs__nav-wrap::after {
      background-color: #fff !important;
    }
  }
}
</style>