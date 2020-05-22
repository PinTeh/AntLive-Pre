<template>
  <div class="main-header">
    <div class="main-header-nav">
      <a class="nav-a" href="#" style="float:left;" @click="handleIndex">首页</a>
      <el-popover width="260" trigger="hover"  v-model="visible" v-if="!notIndexPage">
        <div class="popover-container">
          <el-button v-for="item in categorys" :key="item.id" style="margin:0px 6px 5px 0px" plain size="mini" @click="handleCategoryClick(item)">{{item.name}}</el-button>
        </div>
        <a class="nav-a" href="#" style="float:left;" slot="reference">分类</a>
      </el-popover>

      <a class="nav-a" v-if="this.isLogin" href="#" @click="handleLogin">登录</a>
      <a class="nav-a" v-else href="#" @click="handleClick">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            <el-avatar
              style="vertical-align:middle;margin:0 5px 0 10px;"
              size="small"
              :src="this.$store.state.userInfo.avatar"
            ></el-avatar>
            <span
              style="padding:5px;font-size:15px;"
            >{{this.$store.state.userInfo.nickName || 'AntLive'}}</span>
            <i style="padding:0 10px 0 0;" class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="/center">个人中心</el-dropdown-item>
            <el-dropdown-item v-if="hasAdminRole" command="/admin">管理后台</el-dropdown-item>
            <el-dropdown-item divided command="/logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </a>
    </div>
  </div>
</template>

<script>
import store from "../store";
export default {
  name: "main-header",
  props:['categorys','notIndexPage'],
  data() {
    return {
      activeIndex: "1",
      visible:false
    };
  },
  computed: {
    isLogin() {
      return (
        this.$store.state.userInfo === "" || this.$store.state.userInfo === null
      );
    },
    hasAdminRole(){
      return (
        this.$store.state.userInfo!==null &&
        this.$store.state.userInfo.roleIds.length > 0
      );
    }
  },
  mounted() {
    store.dispatch("init");
  },
  methods: {
    handleCategoryClick(v){
      this.visible = false;
      this.$emit("category-select",v)
    },
    handleClick() {
      this.$router.push({
        path: "/center"
      }).catch(()=>{});
    },
    handleLogin() {
      this.$router.push({
        path: "/login"
      }).catch(()=>{});
    },
    handleRegister() {
      this.$router.push({
        path: "/register"
      }).catch(()=>{});
    },
    handleCommand(command) {
      if (command == "/logout") {
        this.$store.dispatch("logout").then(() => {
          this.handleIndex();
        });
        return;
      }
      this.$router.push({
        path: command
      }).catch(()=>{});
    },
    handleIndex() {
      this.$router.push({
        path: "/"
      }).catch(()=>{});
    }
  }
};
</script>

<style lang="less">
.main-header {
  background: rgb(255, 255, 255);
  height: 50px;
  text-align: center;
  width: 100%;
  .category-btn{
    margin:0px 5px 5px 0px;
  }
}
.main-header-nav {
  width: 70%;
  background: rgb(144, 144, 233);
  margin: 0 auto;
}
.nav-a {
  line-height: 50px;
  float: right;
  margin: 0 5px 0 0;
  min-width: 60px;
  text-decoration: none;
  color: black;
}

.nav-a:hover {
  /* 主题颜色 */
  background: rgb(252, 70, 25);
  color: white;
  span {
    color: white;
  }
}
</style>