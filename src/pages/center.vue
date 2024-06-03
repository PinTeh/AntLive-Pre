<template>
  <div class="center-container-main">
    <div class="center-user-info" @click="handleInfoClick">
      <UserInfo :user="this.$store.state.userInfo"></UserInfo>
    </div>
    <div class="center-sub-container">
      <div class="center-sub-nav">
        <UserInfoNav />
      </div>
      <div class="center-sub-detail">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import UserInfo from '../components/UserInfo'
import UserInfoNav from '../components/UserInfoNav'

export default {
  name: 'user-center',
  components: {
    UserInfo,
    UserInfoNav,
  },
  data() {
    return {
      userInfo: {
        //保存用户信息
        nick: '',
        ulevel: 89,
        uid: '',
        gold: 68,
        point: 99,
        portrait: '',
      },
    }
  },
  mounted() {},
  filters: {
    level_filter(v) {
      return 'uid:' + v
    },
  },
  methods: {
    handleInfoClick() {
      this.$router
        .push({
          path: '/center/info',
        })
        .catch(() => {})
    },
  },
}
</script>

<style lang="less" scoped>
.center-container-main {
  width: 1300px;
  margin: 0 auto;
  overflow: auto;
  .center-user-info {
    width: 1200px;
    margin: 0 auto;
    margin-top: 30px;
  }
  .center-user-info:hover {
    box-shadow: 5px 5px 20px #d1d1d1d1;
    transition: all 0.6s;
    cursor: pointer;
  }
  .center-sub-container {
    width: 1200px;
    margin: 20px auto;
    display: flex;
    .center-sub-nav {
      background: #fff;
    }
    .center-sub-detail {
      width: 100%;
      margin-left: 20px;
      height: 600px;
      background: #fff;
      overflow: auto;
    }
  }
  .el-container {
    margin: 30px 0 30px 0;
  }
  .el-main {
    text-align: center;
    margin-left: 20px;
    padding: 0px;
  }
  .el-menu {
    border: none;
  }
}
</style>
