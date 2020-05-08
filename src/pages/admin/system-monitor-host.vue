<template>
  <div class="system-monitor-container">
    <el-table :data="tableData" style="width: 100%" v-loading="loading">
      <el-table-column label="序号" type="index" width="50" align="center"></el-table-column>
      <el-table-column
        prop="describeInstancesResponse.instances[0].hostName"
        label="名称"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="describeInstancesResponse.instances[0].cpu"
        label="CPU数"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="describeInstancesResponse.instances[0].ostype"
        label="系统类型"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="describeInstancesResponse.instances[0].osname"
        label="系统名称"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="describeInstancesResponse.instances[0].publicIpAddress[0]"
        label="地址"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="describeInstancesResponse.instances[0].memory"
        label="内存大小"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="describeInstancesResponse.instances[0].status"
        label="状态"
        align="center"
      >
        <template slot-scope="scope">
          <span style="color:#00ca00">{{scope.row.describeInstancesResponse.instances[0].status}}</span>
        </template>
      </el-table-column>
    </el-table>

    <div id="container"></div>
    <div id="internet"></div>
    <div id="intranet"></div>
  </div>
</template>

<script>
import Api from "../../api";
import { Line } from "@antv/g2plot";
export default {
  name: "system-monitor-host",
  data() {
    return {
      total: 0,
      limit: 10,
      tableData: [],
      currentPage: 1,
      monitorData: [],
      monitorDataInternet: [],
      monitorDataIntranet: [],
      loading: true
    };
  },
  mounted() {
    this.page();
  },
  methods: {
    page() {
      Api.getSystemMonitor().then(res => {
        this.tableData = res.data.data;
        this.monitorData =
          res.data.data[0].describeInstanceMonitorDataResponse.monitorData;
        this.initLine(this.monitorData);
        this.monitorData.map(v => {
          this.monitorDataInternet.push({
            timeStamp: v.timeStamp,
            value: v.internetRX,
            type: "internetRX"
          });
          this.monitorDataInternet.push({
            timeStamp: v.timeStamp,
            value: v.internetTX,
            type: "internetTX"
          });
          this.monitorDataIntranet.push({
            timeStamp: v.timeStamp,
            value: v.intranetRX,
            type: "intranetRX"
          });
          this.monitorDataIntranet.push({
            timeStamp: v.timeStamp,
            value: v.intranetTX,
            type: "intranetTX"
          });
        });
        this.initInternetLine(this.monitorDataInternet);
        this.initIntranetLine(this.monitorDataIntranet);
        this.loading = false;
      });
    },
    initLine(data) {
      const linePlot = new Line(document.getElementById("container"), {
        title: {
          visible: true,
          text: "CPU"
        },
        description: {
          visible: true,
          text: "CPU核心数使用率(%)"
        },
        padding: "auto",
        forceFit: true,
        data,
        renderer: "svg",
        xField: "timeStamp",
        yField: "cpu",
        smooth: true,
        xAxis: {
          label: {
            formatter: v => {
              return this.dateFormat("HH:MM", new Date(v));
            }
          },
          tickInterval: 3
        }
      });

      linePlot.render();
    },
    initInternetLine(data) {
      const linePlot = new Line(document.getElementById("internet"), {
        title: {
          visible: true,
          text: "网络(外网kbits)"
        },
        description: {
          visible: true,
          text: "网络(外网kbits)"
        },
        padding: "auto",
        forceFit: true,
        data,
        renderer: "svg",
        xField: "timeStamp",
        yField: "value",
        seriesField: "type",
        smooth: true,
        xAxis: {
          label: {
            formatter: v => {
              return this.dateFormat("HH:MM", new Date(v));
            }
          },
          tickInterval: 3
        }
      });

      linePlot.render();
    },
    initIntranetLine(data) {
      const linePlot = new Line(document.getElementById("intranet"), {
        title: {
          visible: true,
          text: "网络(内网kbits)"
        },
        description: {
          visible: true,
          text: "网络(内网kbits)"
        },
        padding: "auto",
        forceFit: true,
        data,
        renderer: "svg",
        xField: "timeStamp",
        yField: "value",
        seriesField: "type",
        smooth: true,
        xAxis: {
          label: {
            formatter: v => {
              return this.dateFormat("HH:MM", new Date(v));
            }
          },
          tickInterval: 3
        }
      });

      linePlot.render();
    },
    dateFormat(fmt, date) {
      let ret;
      const opt = {
        "Y+": date.getFullYear().toString(),
        "m+": (date.getMonth() + 1).toString(),
        "d+": date.getDate().toString(),
        "H+": date.getHours().toString(),
        "M+": date.getMinutes().toString(),
        "S+": date.getSeconds().toString()
      };
      for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
          fmt = fmt.replace(
            ret[1],
            ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0")
          );
        }
      }
      return fmt;
    }
  }
};
</script>

<style lang="less">
.system-monitor-container {
  background: #fff;
  padding: 20px;
}
</style>