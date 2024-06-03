<template>
  <div class="follow-container">
    <div class="items">
      <el-empty
        class="empty"
        v-if="this.total === 0"
        description="暂无历史记录"
      ></el-empty>
      <FollowItem v-for="item in watchList" :key="item.id" :item="item" />
    </div>
    <el-pagination
      class="page"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="limit"
      layout="prev, pager, next"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
import WatchApi from '@/api/watch'
import FollowItem from '../../components/FollowItem'
export default {
  name: 'follow',
  components: {
    FollowItem,
  },
  data() {
    return {
      watchList: [],
      total: 0,
      limit: 10,
      currentPage: 1,
    }
  },
  methods: {
    handleDateRangeChange() {
      this.page()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.page()
    },
    page() {
      WatchApi.listWatches({
        type: 1,
        page: this.currentPage,
        limit: this.limit,
      }).then((res) => {
        const { data } = res.data
        this.watchList = data.list
        this.total = data.total
      })
    },
  },
  mounted() {
    this.page()
  },
}
</script>

<style lang="less">
.follow-container {
  .items {
    height: 550px;
  }
  .page {
    text-align: center;
  }
}
</style>
