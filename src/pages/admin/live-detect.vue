<template>
  <div class="live-detect-container">
    <el-table :data="tableData" style="width: 100%" class="room-table">
      <el-table-column label type="index" width="50" align="center"></el-table-column>
      <el-table-column prop="roomId" label="房间号" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="type" label="类型" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="confidence" label="置信度" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="img" label="截屏" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="normalScore" label="正常评分" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="hotScore" label="性感评分" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="pornScore" label="色情评分" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="level" label="图片级别" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="polityScore" label="涉政评分" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="illegalScore" label="违法评分" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="terrorScore" label="涉恐评分" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="handleStatus" label="处理状态" align="center" show-overflow-tooltip></el-table-column>
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
import Api from '../../api'
export default {
  name: "live-detect",
  data() {
    return {
      tableData: [],
      currentPage: 1,
      limit: 10,
      total: 0
    };
  },
    mounted() {
    this.page();
  },
  methods: {
    handleCurrentChange(val) {
      this.currentPage = val;
      this.page();
    },
    page() {
      Api.liveDetectList(this.currentPage, this.limit).then(res => {
        let ret = res.data.data;
        this.tableData = ret.records;
        this.total = ret.total;
      });
    }
  }
};
</script>

<style>
</style>