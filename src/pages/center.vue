<template>
  <div style="width:1200px;margin:0 auto;">
    <el-container>
      <el-header style="height:auto;">
          <UserInfo :nick="userInfo.nick||''" :portrait="userInfo.portrait || ''" :level="userInfo.ulevel || 1" :uid="userInfo.uid || ''" :starNumber="userInfo.point||0" :diamondNumber="userInfo.gold||0"></UserInfo>
      </el-header>
      <el-container>
        <el-aside width="250px">
            <UserInfoNav />
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import UserInfo from "../components/UserInfo";
import UserInfoNav from "../components/UserInfoNav";

export default {
  name: "user-center",
  components: {
    UserInfo,
    UserInfoNav
  },
   data(){
    return {
      isLogin: false,
      userInfo: { //保存用户信息
        nick: "PinTeh",
        ulevel: 89,
        uid: 123456,
        gold: 68,
        point: 99,
        portrait: 'http://image.imhtb.cn/avatar.png'
      }
    }
  },
};
</script>

<style scoped>

.el-header{
  padding: 0px;
}

.el-container {
  margin:30px 0 30px 0;
}

.el-main {
  background-color: #75b5f5;
  color: #333;
  text-align: center;
  margin-left: 20px;
}

</style>