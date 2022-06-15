<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    @select="handleSelect"
    :unique-opened="true"
    
  >
    <el-submenu index="1" >
      <template slot="title">
        <!-- <i class="el-icon-location"></i> -->
        <span>个人中心</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="security">账号安全</el-menu-item>
        <el-menu-item index="info">个人信息</el-menu-item>
        <el-menu-item index="identify">实名认证</el-menu-item>
        <el-menu-item index="wallet">我的钱包</el-menu-item>
        <el-menu-item index="follow">我的关注</el-menu-item>
        <el-menu-item index="history">观看历史</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title">
        <span>我的直播间</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="live-info">直播信息</el-menu-item>
        <el-menu-item index="live-settings">开播设置</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="4">
      <template slot="title">
        <span>直播数据</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="overview">数据总览</el-menu-item>
        <el-menu-item index="gift-list">礼物流水</el-menu-item>
        <el-menu-item index="dan-mu">弹幕统计</el-menu-item>
        <el-menu-item index="punishment">运营奖惩</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: "user-info-nav",
  data() {
    return {
      activeIndex: "security"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      this.$router.push({
        path: "/center/" + keyPath[1]
      }).catch(()=>{});
    }
  }
};
</script>

<style scoped>
.el-menu {
  height: 550px;
  min-width: 200px;
}
</style>