<template>
  <div style="height:500px;box-sizing: border-box;max-width:900px;padding:20px;position:relative;">
    <FollowItem v-for="item in watchList" :key="item.id" :item="item" />
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="limit"
      layout="prev, pager, next"
      :total="total"
      style="float:left;width:850px;"
      hide-on-single-page
    ></el-pagination>
  </div>
</template>

<script>
import Api from "../../api";
import FollowItem from "../../components/FollowItem";
export default {
  name: "history",
  components: {
    FollowItem
  },
  data() {
    return {
      watchList: [],
      total: 0,
      limit: 10,
      currentPage: 1
    };
  },
  methods: {
    handleDateRangeChange() {
      this.page();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.page();
    },
    page() {
      Api.getWatctList(0, this.currentPage, this.limit).then(res => {
        let ret = res.data.data;
        this.watchList = ret.records;
        this.total = ret.total;
      });
    }
  },
  mounted() {
    this.page();
  }
};
</script>

<style>
</style>