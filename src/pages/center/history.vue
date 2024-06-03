<template>
  <div class="follow-container">
    <el-button
      plain
      @click="handleClearClick"
      class="button"
      size="mini"
      icon="el-icon-toilet-paper"
      >清除记录</el-button
    >
    <div class="items">
      <el-empty
        class="empty"
        v-if="this.total === 0"
        description="暂无历史记录"
      ></el-empty>
      <FollowItem v-for="item in watchList" :key="item.id" :item="item" />
    </div>
  </div>
</template>

<script>
import WatchApi from '@/api/watch'
import FollowItem from '../../components/FollowItem'
export default {
  name: 'history',
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
    handleClearClick() {
      this.$message({ type: 'success', message: '清除完成' })
      WatchApi.clearHistory().then(() => {
        this.page()
      })
    },
    handleDateRangeChange() {
      this.page()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.page()
    },
    page() {
      WatchApi.listWatches({
        type: 0,
        page: 1,
        limit: 6,
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
  position: relative;
  .button {
    z-index: 1;
    position: absolute;
    right: 20px;
    top: 10px;
  }
  .items {
    height: 550px;
    .empty {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
    }
  }
  .page {
    text-align: center;
  }
}
</style>
