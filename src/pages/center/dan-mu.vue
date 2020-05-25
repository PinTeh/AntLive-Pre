<template>
  <div class="dan-mu-container">
    <el-tabs v-model="days" @tab-click="handleClick">
      <el-tab-pane label="近7天总计" name="7"></el-tab-pane>
      <el-tab-pane label="近30天总计" name="30"></el-tab-pane>
    </el-tabs>
    <div class="dan-mu-sub-container">
      <el-tabs v-model="subActiveName" @tab-click="handleSubClick">
        <el-tab-pane label="人气统计" name="view"></el-tab-pane>
        <el-tab-pane label="弹幕统计" name="speak"></el-tab-pane>
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
      days: "7",
      plot: "",
      speakPlot: "",
      plotData: [],
      speakPlotData: [],
      subActiveName: "view"
    };
  },
  mounted() {
    this.init(this.days);
  },
  methods: {
    handleClick(tab) {
      this.days = tab.name;
      this.initData(true);
    },
    handleSubClick(tab) {
      this.subActiveName = tab.name;
      this.initData(false);
    },
    init(days) {
      Api.getStatView({
        days
      }).then(res => {
        let data = res.data.data;
        this.plotData = [];
        data.map(v => {
          this.packageViewObject(v);
        });

        this.plot = new Line("c1", {
          title: {
            visible: false,
            text: "带数据点的折线图"
          },
          description: {
            visible: true,
            text: "人气指数统计"
          },
          data: this.plotData,
          smooth: true,
          padding: "auto",
          xField: "date",
          yField: "value",
          seriesField: "type",
          // forceFit:true,
          renderer: "svg",
          pixelRatio: 2,
          point: {
            visible: true
          },
          label: {
            visible: false,
            type: "point"
          },

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
      });
    },
    initData(isOnlyChnageDays) {
      switch (this.subActiveName) {
        case "view":
          Api.getStatView({
            days: this.days
          }).then(res => {
            let data = res.data.data;
            this.plotData = [];
            data.map(v => {
              this.packageViewObject(v);
            });
            if (!isOnlyChnageDays) {
              this.plot.updateConfig({
                description: {
                  visible: true,
                  text: "人气指数统计"
                },
                yField: "value",
                seriesField: "type",
                data: this.plotData
              });
              this.plot.render();
            } else {
              this.plot.changeData(this.plotData);
            }
          });

          break;
        case "speak":
          Api.getStatSpeak({
            days: this.days
          }).then(res => {
            let data = res.data.data;
            if (!isOnlyChnageDays) {
              this.plot.updateConfig({
                description: {
                  visible: true,
                  text: "弹幕指数统计"
                },
                yField: "number",
                seriesField: "",
                data
              });
              this.plot.render();
            } else {
              this.plot.changeData(data);
            }
          });
          break;
        default:
          break;
      }
    },
    packageViewObject(v) {
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
      //this.plotData.push(total);
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
    padding: 10px;
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