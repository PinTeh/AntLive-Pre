<template>
  <div class="main-header">
    <div class="main-header-nav">
      <div class="left-nav-container">
        <div class="nav-span" @click="handleGoToIndex">
          首页
        </div>
        <div>
          <el-popover
            width="260"
            trigger="hover"
            v-if="!notIndexPage"
            v-model="visible"
          >
            <div class="popover-container">
              <el-button
                class="category-item"
                v-for="item in categorys"
                :key="item.id"
                plain
                size="mini"
                @click="handleCategoryClick(item)"
                >{{ item.name }}</el-button
              >
            </div>
            <div class="nav-span" slot="reference">分类</div>
          </el-popover>
        </div>
      </div>
      <div class="right-nav-container">
        <div class="nav-span" v-if="this.isLogin" href="#" @click="handleLogin">
          登录
        </div>
        <span class="nav-span" v-else href="#" @click="handleClick">
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              <img
                class="header-avatar"
                :src="this.$store.state.userInfo.avatar"
              />
              <span style="padding:5px;font-size:15px;">{{
                this.$store.state.userInfo.nickName || 'AntLive'
              }}</span>
              <i
                style="padding:0 10px 0 0;"
                class="el-icon-arrow-down el-icon--right"
              ></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="/center">个人中心</el-dropdown-item>
              <el-dropdown-item v-if="hasAdminRole" command="/admin"
                >管理后台</el-dropdown-item
              >
              <el-dropdown-item divided command="/logout"
                >退出</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import store from '../store'
import { getToken } from '@/utils/auth'
import UserApi from '@/api/user'
export default {
  name: 'main-header',
  props: ['categorys', 'notIndexPage'],
  data() {
    return {
      activeIndex: '1',
      visible: false,
    }
  },
  computed: {
    isLogin() {
      return (
        this.$store.state.userInfo === '' || this.$store.state.userInfo === null
      )
    },
    hasAdminRole() {
      return (
        this.$store.state.userInfo !== null &&
        this.$store.state.userInfo.roleIds.length > 0
      )
    },
  },
  mounted() {
    const token = getToken()
    if (token) {
      UserApi.verifyToken({ token: token }).then((r) => {
        let { data } = r.data
        if (data) {
          store.dispatch('init')
        } else {
          store.dispatch('logout')
        }
      })
    }
  },
  methods: {
    handleCategoryClick(v) {
      this.visible = false
      this.$emit('category-select', v)
    },
    handleClick() {
      this.$router
        .push({
          path: '/center',
        })
        .catch(() => {})
    },
    handleLogin() {
      this.$router
        .push({
          path: '/login',
        })
        .catch(() => {})
    },
    handleRegister() {
      this.$router
        .push({
          path: '/register',
        })
        .catch(() => {})
    },
    handleCommand(command) {
      if (command == '/logout') {
        this.$store.dispatch('logout').then(() => {
          this.handleGoToIndex()
          this.$message.success('退出成功')
        })
        return
      }
      this.$router
        .push({
          path: command,
        })
        .catch(() => {})
    },
    handleGoToIndex() {
      this.$router
        .push({
          path: '/',
        })
        .catch(() => {})
    },
  },
}
</script>

<style lang="less">
.main-header {
  background: rgb(255, 255, 255);
  border-bottom: 2px solid #f3f3f3;
  height: 48px;
  text-align: center;
  width: 100%;
  position: sticky;
  top: 0px;
  z-index: 998;
}
.main-header-nav {
  width: 1300px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: start;
  .left-nav-container {
    display: flex;
    flex-grow: 2;
  }
  .right-nav-container {
    flex-grow: 1;
    display: flex;
    justify-content: right;
  }
}
.nav-span {
  line-height: 50px;
  margin-left: 5px;
  min-width: 60px;
  color: black;
}
.nav-span:hover {
  /* 主题颜色 */
  background: rgb(252, 70, 25);
  color: white;
  cursor: pointer;
  span {
    color: white;
  }
}
.category-item {
  margin: 4px 0 2px 6px !important;
}
.popover-container {
  display: flex;
  justify-content: flex-start;
  width: 280px;
  flex-wrap: wrap;
  flex-flow: row wrap;
}
.header-avatar {
  margin-left: 10px;
  position: relative;
  top: 10px;
  width: 30px;
  height: 30px;
  border-radius: 30px;
  object-fit: cover;
}
</style>
