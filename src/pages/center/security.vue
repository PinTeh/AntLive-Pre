<template>
  <div style="height:500px">
    <el-row>
      <el-col :span="12">
        <div style="height:200px;width:100%;text-align:left;">
          <div class="img-container">
            <el-image class="icon" :src="url"></el-image>
          </div>
          <div style="float:left;margin-top:30px;">
            <p style="font-size:18px;">我的邮箱</p>
            <p>绑定邮箱可以接收通知</p>
            <el-button size="mini">去完善</el-button>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div style="height:200px;width:100%;text-align:left;">
          <div class="img-container">
            <el-image class="icon" :src="url"></el-image>
          </div>
          <div style="float:left;margin-top:30px;">
            <p style="font-size:18px;">我的邮箱</p>
            <p>绑定邮箱可以接收通知</p>
            <el-button size="mini">去完善</el-button>
          </div>
        </div>
      </el-col>
    </el-row>

    
  </div>
</template>

<script>
export default {
  name: "security",
  data() {
    return {
      url: "http://image.imhtb.cn/avatar.png"
    };
  }
};
</script>

<style>
.icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-top: 50px;
}
.img-container {
  float: left;
  width: 150px;
  height: 100%;
  text-align: center;
  line-height: 200px;
  vertical-align: middle;
}
</style>