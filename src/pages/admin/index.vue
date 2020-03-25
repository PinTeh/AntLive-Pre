<template>
  <div class="admin-container">
    <el-container style="height:100%;">
      <el-header>
        <div class="header-div">
          Ant
          <i>Live</i>
          <el-dropdown @command="handleCommand" class="header-dropdown">
            <span class="el-dropdown-link">
              <el-avatar size="small" style="vertical-align:middle;margin-top:-8px;" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
              您好，管理员
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="a">个人信息</el-dropdown-item>
              <el-dropdown-item command="c" divided>退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-container>
        <el-aside>
          <el-menu
            :default-active="activeIndex"
            class="el-menu-vertical-demo"
            @select="handleSelect"
            text-color="#666"
            active-text-color="rgb(255, 95, 86)"
            :collapse="isCollapse"
          >
            <el-menu-item
              v-for="item in menu"
              :key="item.index"
              :title="item.title"
              :index="item.path"
            >
              <i :class="item.icon"></i>
              <span slot="title">{{item.title}}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-container>
          <el-main>
            <el-breadcrumb class="el-breadcrumb-nav" separator-class="el-icon-arrow-right">
              <el-breadcrumb-item>
                <i @click="handleFold" :class="isCollapse?'el-icon-s-unfold':'el-icon-s-fold'"></i>
              </el-breadcrumb-item>
              <el-breadcrumb-item :to="{ path: '/' }">{{this.select_title}}</el-breadcrumb-item>
            </el-breadcrumb>
            <router-view></router-view>
          </el-main>
          <el-footer>@CopyRight PinTeh</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "admin-index",
  data() {
    return {
      isCollapse: false,
      activeIndex: "dashboard",
      select_title: "仪表盘",
      menu: [
        {
          index: 1,
          icon: "el-icon-data-board",
          path: "dashboard",
          title: "仪表盘"
        },
        {
          index: 2,
          icon: "el-icon-user",
          path: "user-manage",
          title: "会员中心"
        },
        {
          index: 3,
          icon: "el-icon-data-analysis",
          path: "data-analysis",
          title: "数据统计"
        },
        {
          index: 4,
          icon: "el-icon-menu",
          path: "system-settings",
          title: "系统设置"
        }
      ]
    };
  },
  methods: {
    handleSelect(key) {
      this.activeIndex = key;
      this.menu.map(v => {
        if (v.path == key) {
          this.select_title = v.title;
          return;
        }
      });
      this.$router.push({
        path: "/admin/" + key
      });
    },
    handleFold() {
      this.isCollapse = !this.isCollapse;
      console.log("click");
    },
    handleCommand(command) {
        this.$message('click on item ' + command);
      }
  }
};
</script>

<style lang="less">
.admin-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  .el-breadcrumb-nav{
    margin: 0px 0px 10px 5px;
  }
  .header-dropdown{
      float: right;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .header-div {
    i {
      color: lightcoral;
      font-style: normal;
    }
  }
  .el-header {
    background-color: #fff;
    line-height: 60px;
    border-bottom: 2px solid rgb(235, 235, 235);
  }
  .el-footer {
    background: #fff;
    color: #333;
    text-align: center;
    line-height: 40px;
    height: 40px !important;
    font-size: 13px;
  }
  .el-aside {
    background-color: #fff;
    color: #333;
    line-height: 200px;
    width: auto !important;
  }
  .el-main {
    background-color: #e9eef3;
    color: #333;
    text-align: center;
    padding: 10px;
  }
}
</style>