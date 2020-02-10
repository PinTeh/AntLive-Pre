<template>
  <div style="width:1200px;margin:0 auto;">
    <el-container>
      <el-header style="height:auto;">
          <UserInfo></UserInfo>
      </el-header>
      <el-container>
        <el-aside width="250px">
            <UserInfoNav />
        </el-aside>
        <el-main>Main</el-main>
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
  }
};
</script>

<style scoped>

.el-header{
  padding: 0px;
}

.el-container {
  margin:30px 0 30px 0;
}

/* .el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  padding: 5px;
} */

.el-main {
  background-color: #75b5f5;
  color: #333;
  text-align: center;
  margin-left: 20px;
}

</style>