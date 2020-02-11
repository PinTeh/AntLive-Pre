<template>
  <div>
    <Header></Header>
    <div style="width:1200px;margin:0 auto;">
      <el-container>
        <el-header style="height:auto;">
          <el-card :body-style="{ padding: '0px' }">
            <UserInfo
              :nick="userInfo.nick||''"
              :portrait="userInfo.portrait || ''"
              :level="userInfo.ulevel || 1"
              :uid="userInfo.uid || ''"
              :starNumber="userInfo.point||0"
              :diamondNumber="userInfo.gold||0"
            ></UserInfo>
          </el-card>
        </el-header>
        <el-container>
          <el-card :body-style="{ padding: '0px' }">
            <el-aside width="250px">
              <UserInfoNav />
            </el-aside>
          </el-card>
          <el-main>
            <el-card :body-style="{ padding: '0px', margin:'0px' }">
              <router-view></router-view>
            </el-card>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script>
import UserInfo from "../components/UserInfo";
import UserInfoNav from "../components/UserInfoNav";
import Header from "../components/Header";

export default {
  name: "user-center",
  components: {
    UserInfo,
    UserInfoNav,
    Header
  },
  data() {
    return {
      isLogin: false,
      userInfo: {
        //保存用户信息
        nick: "PinTeh",
        ulevel: 89,
        uid: 123456,
        gold: 68,
        point: 99,
        portrait: "http://image.imhtb.cn/avatar.png"
      }
    };
  }
};
</script>

<style scoped>
.el-header {
  padding: 0px;
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
</style>