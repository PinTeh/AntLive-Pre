<template>
  <div style="height:500px;box-sizing: border-box;max-width:900px;padding:20px;position:relative;">
    <FollowItem
      v-for="item in watchList"
      :key="item.id"
      :item="item"
      @click.native="handleItemClick(item.id)"
    />
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
  name: "follow",
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
    handleItemClick(id) {
      this.$router.push("/vod/" + id).catch(() => {});
    },
    handleDateRangeChange() {
      this.page();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.page();
    },
    page() {
      let params = {
        page: this.currentPage,
        limit: this.limit
      };
      Api.getVodList(params).then(res => {
        let ret = res.data.data;
        let records = ret.records;
        records.map(item => {
          this.watchList.push({
              id:item.id,
            title: item.title,
            cover: item.coverUrl,
            name: null
          });
        });
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