<template>
    <el-menu :default-active="activeIndex" class="el-menu-demo" @select="handleSelect">
      <el-menu-item index="1">直播中心</el-menu-item>
      <el-menu-item index="1">我的收益</el-menu-item>
      <el-menu-item index="3" disabled>消息中心</el-menu-item>
    </el-menu>
</template>

<script>
export default {
  name: "user-info-nav",
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style scoped>
.el-menu {
  height: 500px;
}
</style>