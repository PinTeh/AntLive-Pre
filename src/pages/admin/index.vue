<template>
  <div
    class="admin-container"
    v-loading="loading"
    element-loading-background="transparent"
  >
    <div class="admin-header-container">
      <span class="logo"> Ant <i @click="handleCommand('index')">Live</i></span>
      <div>
        <el-dropdown @command="handleCommand" class="header-dropdown">
          <span class="el-dropdown-link">
            <el-avatar
              size="small"
              style="vertical-align:middle;margin-right: 10px;"
              :src="require('@/assets/img/avatar.jpg')"
            ></el-avatar
            >您好，管理员
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="index">返回首页</el-dropdown-item>
            <el-dropdown-item command="exit" divided>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-tooltip effect="dark" content="全屏" placement="bottom">
          <i
            @click="handleScreenfull"
            style="font-size:23px;float:right;line-height:45px;margin-right:20px;cursor: pointer;"
            class="el-icon-full-screen"
          ></i>
        </el-tooltip>
      </div>
    </div>
    <div class="admin-main-container">
      <div class="admin-asider-container">
        <el-menu
          unique-opened
          :default-active="activeIndex"
          class="el-menu-vertical"
          @select="handleSelect"
          active-text-color="rgb(64, 158, 255)"
          :collapse="isCollapse"
        >
          <div v-for="item in menus" :key="item.path">
            <el-submenu
              :index="item.path"
              v-if="item.children && item.children.length > 0"
            >
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{ item.label }}</span>
              </template>
              <div class="el-group-self">
                <el-menu-item
                  v-for="sub in item.children"
                  :key="sub.path"
                  :index="sub.path"
                >
                  <i :class="sub.icon"></i>
                  <span slot="title">{{ sub.label }}</span>
                </el-menu-item>
              </div>
            </el-submenu>
            <el-menu-item
              v-else
              :key="item.path"
              :title="item.label"
              :index="item.path"
            >
              <i :class="item.icon"></i>
              <span slot="title">{{ item.label }}</span>
            </el-menu-item>
          </div>
        </el-menu>
        <div class="collapse" @click="handleFold">
          <i
            v-if="!isCollapse"
            style="font-size:23px;"
            class="el-icon-s-fold"
          ></i>
          <i v-else style="font-size:23px;" class="el-icon-s-unfold"></i>
        </div>
      </div>
      <div class="admin-content-container">
        <div class="breadcrumb">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>
              <!-- <i @click="handleFold" :class="isCollapse?'el-icon-s-unfold':'el-icon-s-fold'"></i> -->
            </el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/' }">{{
              this.select_title
            }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="content">
          <router-view></router-view>
          <div class="content-footer">
            <span>@CopyRight PinTeh</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import screenfull from 'screenfull'
import Api from '@/api'
export default {
  name: 'admin-index',
  data() {
    return {
      isCollapse: false,
      activeIndex: 'dashboard',
      select_title: '仪表盘',
      menu: [
        {
          index: 1,
          icon: 'el-icon-data-board',
          path: 'dashboard',
          title: '首页',
        },
        {
          index: 2,
          icon: 'el-icon-user',
          path: 'user-manage',
          title: '会员中心',
        },

        {
          index: 3,
          icon: 'el-icon-coordinate',
          path: 'user-auth',
          title: '身份验证',
        },
        {
          index: 4,
          icon: 'el-icon-bangzhu',
          path: 'live-room-manage',
          title: '直播管理',
        },
        {
          index: 5,
          icon: 'el-icon-data-analysis',
          path: 'live-info-manage',
          title: '直播数据',
        },
        {
          index: 6,
          icon: 'el-icon-partly-cloudy',
          path: 'bill',
          title: '流水账单',
        },
        {
          index: 9,
          icon: 'el-icon-menu',
          path: 'system-settings',
          title: '系统设置',
        },
        {
          index: 10,
          icon: 'el-icon-data-analysis',
          path: 'data-analysis',
          title: '数据统计',
        },
        {
          index: 11,
          icon: 'el-icon-data-analysis',
          path: 'present-manage',
          title: '礼物配置',
        },
        {
          index: 12,
          icon: 'el-icon-data-analysis',
          path: 'live-ban-manage',
          title: '小黑屋',
        },
        {
          index: 13,
          icon: 'el-icon-data-analysis',
          path: 'message-push',
          title: '消息推送',
        },
        {
          index: 14,
          icon: 'el-icon-data-analysis',
          path: 'system-monitor',
          title: '系统监控',
        },
      ],
      menus: [],
      loading: true,
    }
  },
  mounted() {
    this.initMenus()
    setTimeout(() => {
      this.loading = false
    }, 3000)
  },
  methods: {
    initMenus() {
      this.$store.dispatch('init')
      let userInfo = this.$store.state.userInfo
      console.log(userInfo)
      if (userInfo == null) {
        this.$router.push('/login').catch(() => {})
        return
      }
      let roleIds = userInfo.roleIds
      Api.getMenuListByRoleIds(roleIds).then((res) => {
        this.menus = res.data.data
        this.loading = false
      })
    },
    handleScreenfull() {
      screenfull.toggle()
    },
    handleSelect(key) {
      this.activeIndex = key
      this.menu.map((v) => {
        if (v.path == key) {
          this.select_title = v.title
          return
        }
      })
      this.$router
        .push({
          path: '/admin/' + key,
        })
        .catch(() => {})
    },
    handleFold() {
      this.isCollapse = !this.isCollapse
    },
    handleCommand(command) {
      // this.$message('click on item ' + command)
      if (command === 'index') {
        this.$router.push({
          path: '/#/',
        })
      }
    },
    handleClickLogoTitle() {
      this.$router.push({
        path: '/',
      })
    },
  },
}
</script>

<style lang="less">
.admin-container {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  .admin-main-container {
    // padding: 10px;
    display: flex;
    height: calc(100vh - 47px);
  }
  .admin-header-container {
    position: sticky;
    background: #fff;
    height: 45px;
    border-bottom: 1px solid #e0e0e0;
    padding: 0px 30px;
    display: flex;
    justify-content: space-between;
    .logo {
      color: #d36f05;
    }
    span {
      line-height: 45px;
      :hover {
        cursor: pointer;
      }
    }
    i {
      color: rgb(54, 54, 53);
      font-style: normal;
    }
    .header-dropdown {
      float: right;
    }
  }
  .admin-asider-container {
    width: 230px;
    display: flex;
    flex-direction: column;
    .el-menu-vertical {
      overflow: auto;
      flex: 1;
    }
    .collapse {
      color: #6bb0e8;
      border-top: 1px #ececec solid;
      border-right: 1px #ececec solid;
      background: #fff;
      padding-left: 20px;
      height: 40px;
      line-height: 40px;
    }
    .collapse:hover {
      cursor: pointer;
    }
  }
  .admin-content-container {
    flex: 1;
    overflow: auto;
    .breadcrumb {
      position: sticky;
      display: flex;
      align-items: center;
      height: 40px;
      width: 100%;
      background: #fff;
    }
    .content {
      padding: 10px;
      .content-footer {
        height: 30px;
        padding: 20px;
        line-height: 30px;
        text-align: center;
        span {
          color: #919191;
          font-size: 15px;
        }
      }
    }
  }
}
</style>
