<template>
  <div style="height:500px;">
    <p style="">{{'总时长： ' + time + '分钟'}}</p>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column label="序号" type="index" align="center" width="100"></el-table-column>
      <el-table-column prop="startTime" label="开始时间" align="center" ></el-table-column>
      <el-table-column prop="endTime" label="结束时间" align="center" ></el-table-column>
      <el-table-column prop="time" align="center" label="时长(分)"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import Api from "../../api";
export default {
  name: "overview",
  data() {
    return {
      tableData: [],
      time:''
    };
  },
  methods: {},
  mounted() {
    Api.getLiveStatInfo().then(res => {
      this.tableData = res.data.data.liveStats;
      this.time = res.data.data.totalTime;
    });
  }
};
</script>

<style>
</style>