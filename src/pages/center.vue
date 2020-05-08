<template>
  <div class="center-div">
    <Header :notIndexPage="true"></Header>
    <div style="width:1200px;margin:0 auto;">
      <el-container>
        <el-header style="height:auto;">
          <el-card @click.native="handleInfoClick" :body-style="{ padding: '0px' }" shadow="hover" style="cursor:pointer;">
            <UserInfo
              :nick="userInfo.nick||''"
              :portrait="userInfo.portrait || ''"
              :level="userInfo.ulevel || 0"
              :uid="userInfo.uid || ''"
              :starNumber="userInfo.point||0"
              :diamondNumber="userInfo.gold||0"
            ></UserInfo>
          </el-card>
        </el-header>
        <el-container>
          <el-card :body-style="{ padding: '0px' }" shadow="never">
            <el-aside width="250px;">
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
import Api from '../api'
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
      userInfo: {
        //保存用户信息
        nick: "",
        ulevel: 89,
        uid: '',
        gold: 68,
        point: 99,
        portrait: ''
      }
    };
  },
  mounted(){
    Api.getUserInfo().then(res => {
      let ret = res.data.data;
      this.userInfo.nick = ret.nickName;
      this.userInfo.uid = ret.id;
      this.userInfo.ulevel = ret.id;
      this.userInfo.portrait = ret.avatar;
    })
  },
  filters:{
    level_filter(v){
      return "uid:" + v;
    }
  },
  methods:{
    handleInfoClick(){
      this.$router.push({
        path:'/center/info'
      }).catch(()=>{

      })
    }
  }
};
</script>

<style scoped>
.center-div .el-header {
  padding: 0px;
}

.center-div .el-container {
  margin: 30px 0 30px 0;
}

.center-div .el-main {
  text-align: center;
  margin-left: 20px;
  padding: 0px;
}
.center-div .el-menu {
  border: none;
}
</style>