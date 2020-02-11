<template>
  <el-menu :default-active="activeIndex" class="el-menu-demo" @select="handleSelect">
    <el-menu-item index="live-center">直播中心</el-menu-item>
    <el-menu-item index="live-setting">直播设置</el-menu-item>
    <el-menu-item index="auth-center">认证中心</el-menu-item>
    <el-menu-item index="live-present">我的收益</el-menu-item>
    <el-menu-item index="live-total">直播统计</el-menu-item>
    <el-menu-item index="3" disabled>消息中心</el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: "user-info-nav",
  data() {
    return {
      activeIndex: "live-center"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      this.$router.push({
        path: "/center/" + keyPath
      });
    }
  }
};
</script>

<style scoped>
.el-menu {
  height: 500px;
}
</style>