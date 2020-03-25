<template>
  <div class="main-header">
    <div class="main-header-nav">
      <a class="nav-a" href="#" style="float:left;" @click="handleIndex">首页</a>
      <a class="nav-a" v-if="this.isLogin" href="#" @click="handleLogin">登录</a>
      <a class="nav-a" v-else href="#" @click="handleClick">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            <el-avatar
              style="vertical-align:middle;margin:0 5px 0 10px;"
              size="small"
              :src="this.$store.state.userInfo.avatar"
            ></el-avatar>
            <span style="padding:5px;font-size:15px;">{{this.$store.state.userInfo.nickName || 'AntLive'}}</span>
            <i style="padding:0 10px 0 0;" class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="/center">个人中心</el-dropdown-item>
            <el-dropdown-item divided command="/logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </a>
      <a class="nav-a" href="#" @click="handleClick">测试</a>
      <a class="nav-a" href="#" @click="handleClickAdmin">管理</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "main-header",
  data() {
    return {
      activeIndex: "1"
    };
  },
  computed: {
    isLogin() {
      return this.$store.state.userInfo == ''
    }
  },
  methods: {
    handleClick() {
      this.$router.push({
        path: "/center"
      });
    },
    handleClickAdmin(){
      this.$router.push({
        path: "/admin"
      });
    },
    handleLogin() {
      this.$router.push({
        path: "/login"
      });
    },
    handleRegister() {
      this.$router.push({
        path: "/register"
      });
    },
    handleCommand(command) {
      if (command == "/logout") {
        this.$store.dispatch("logout").then(() => {
          this.handleIndex()
        });
        return;
      }
      this.$router.push({
        path: command
      });
    },
    handleIndex(){
       this.$router.push({
            path: "/"
          });
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