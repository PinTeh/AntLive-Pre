<template>
  <div class="admin-container" v-loading="loading" element-loading-background="transparent">
    <el-container style="height:100%;">
      <el-aside>
        <div class="el-aside-logo">
          <div v-if="!isCollapse">
            Ant
            <i>Live</i>
          </div>
          <div style="margin-left:-15px;" v-else>
            <i>A</i>
          </div>
        </div>
        <el-menu
          unique-opened	
          :default-active="activeIndex"
          class="el-menu-vertical"
          @select="handleSelect"
          text-color="rgb(191, 203, 217)"
          active-text-color="rgb(64, 158, 255)"
          :collapse="isCollapse"
        >
          <div v-for="item in menus" :key="item.path">
            <el-submenu :index="item.path" v-if="item.children && item.children.length > 0">
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{item.label}}</span>
              </template>
              <div class="el-group-self">
                <el-menu-item v-for="sub in item.children" :key="sub.path" :index="sub.path">
                  <i :class="sub.icon"></i>
                  <span slot="title">{{sub.label}}</span>
                </el-menu-item>
              </div>
                
            </el-submenu>
            <el-menu-item v-else :key="item.path" :title="item.label" :index="item.path">
              <i :class="item.icon"></i>
              <span slot="title">{{item.label}}</span>
            </el-menu-item>
          </div>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header>
          <div class="header-div">
            <!-- Ant
            <i>Live</i>-->
            <el-tooltip effect="dark" content="收缩" placement="bottom">
              <i
                @click="handleFold"
                v-if="!isCollapse"
                style="font-size:23px"
                class="el-icon-s-fold"
              ></i>
              <i @click="handleFold" v-else style="font-size:23px" class="el-icon-s-unfold"></i>
            </el-tooltip>
            <el-dropdown @command="handleCommand" class="header-dropdown">
              <span class="el-dropdown-link">
                <el-avatar
                  size="small"
                  style="vertical-align:middle;margin-top:-8px;"
                  src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                ></el-avatar>您好，管理员
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="a">个人信息</el-dropdown-item>
                <el-dropdown-item command="c" divided>退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-tooltip effect="dark" content="全屏" placement="bottom">
              <i
                @click="handleScreenfull"
                style="font-size:23px;float:right;line-height:45px;margin-right:20px;"
                class="el-icon-full-screen"
              ></i>
            </el-tooltip>
          </div>
          <el-breadcrumb class="el-breadcrumb-nav" separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>
              <!-- <i @click="handleFold" :class="isCollapse?'el-icon-s-unfold':'el-icon-s-fold'"></i> -->
            </el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/' }">{{this.select_title}}</el-breadcrumb-item>
          </el-breadcrumb>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
        <el-footer>@CopyRight PinTeh</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import screenfull from "screenfull";
import Api from "../../api";
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
          title: "首页"
        },
        {
          index: 2,
          icon: "el-icon-user",
          path: "user-manage",
          title: "会员中心"
        },

        {
          index: 3,
          icon: "el-icon-coordinate",
          path: "user-auth",
          title: "身份验证"
        },
        {
          index: 4,
          icon: "el-icon-bangzhu",
          path: "live-room-manage",
          title: "直播管理"
        },
        {
          index: 5,
          icon: "el-icon-data-analysis",
          path: "live-info-manage",
          title: "直播数据"
        },
        {
          index: 6,
          icon: "el-icon-partly-cloudy",
          path: "bill",
          title: "流水账单"
        },
        {
          index: 9,
          icon: "el-icon-menu",
          path: "system-settings",
          title: "系统设置"
        },
        {
          index: 10,
          icon: "el-icon-data-analysis",
          path: "data-analysis",
          title: "数据统计"
        },
        {
          index: 11,
          icon: "el-icon-data-analysis",
          path: "present-manage",
          title: "礼物配置"
        },
        {
          index: 12,
          icon: "el-icon-data-analysis",
          path: "live-ban-manage",
          title: "小黑屋"
        },
        {
          index: 13,
          icon: "el-icon-data-analysis",
          path: "message-push",
          title: "消息推送"
        },
        {
          index: 14,
          icon: "el-icon-data-analysis",
          path: "system-monitor",
          title: "系统监控"
        }
      ],
      menus: [],
      loading:true
    };
  },
  mounted() {
    this.initMenus();
    setTimeout(() => {
      this.loading = false;
    }, 3000);
  },
  methods: {
    initMenus() {
      this.$store.dispatch("init");
      let userInfo = this.$store.state.userInfo;
      console.log(userInfo);
      if (userInfo == null) {
        this.$router.push("/login").catch(()=>{})
        return;
      }
      let roleIds = userInfo.roleIds;
      Api.getMenuListByRoleIds(roleIds).then(res => {
        this.menus = res.data.data;
        this.loading = false;
      });
    },
    handleScreenfull() {
      screenfull.toggle();
    },
    handleSelect(key) {
      this.activeIndex = key;
      this.menu.map(v => {
        if (v.path == key) {
          this.select_title = v.title;
          return;
        }
      });
      this.$router
        .push({
          path: "/admin/" + key
        })
        .catch(() => {});
    },
    handleFold() {
      this.isCollapse = !this.isCollapse;
      console.log("click");
    },
    handleCommand(command) {
      this.$message("click on item " + command);
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
  .el-breadcrumb-nav {
    margin: 10px 0px 10px 5px;
  }
  .header-dropdown {
    float: right;
  }
  .el-submenu__title:hover {
    background-color: #263445 !important;
  }
  .el-menu-vertical:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
    background: rgb(48, 65, 86);
    border: none;
  }
  .header-div {
    border-bottom: 1px solid #e0e0e0;
    padding: 0px 20px 0px 20px;
    i {
      color: rgb(102, 102, 102);
      font-style: normal;
    }
  }
  .el-header {
    background-color: #fff;
    line-height: 45px;
    height: auto !important;
    padding: 0px;
    border-bottom: 1px solid #d8dce5;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  }
  .el-footer {
    background: #fff;
    color: #333;
    text-align: center;
    line-height: 35px;
    height: 35px !important;
    font-size: 12px;
    border-top: solid 2px rgb(245, 245, 245);
  }
  .el-aside {
    color: #333;
    // line-height: 200px;
    width: auto !important;
    background: rgb(48, 65, 86);
  }
  .el-main {
    background-color: #e9eef3;
    color: #333;
    text-align: center;
    padding: 10px 5px 0px 5px;
  }
  .el-menu {
    border: none;
    background-color: rgb(48, 65, 86) !important;
  }
  .el-group-self .el-menu-item {
    background-color: #202b3a !important;
  }
  .el-menu-item:focus,
  .el-menu-item:hover {
    background-color: #263445 !important;
  }
  .el-aside-logo {
    line-height: 60px;
    height: 60px;
    padding-left: 40px;
    color: rgb(221, 221, 221);
    background-color: rgb(38, 52, 70);
    i {
      color: lightcoral;
      font-style: normal;
    }
  }
}
</style>