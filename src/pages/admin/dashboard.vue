<template>
  <div class="dashboar-container">
    <el-card shadow="never">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-card shadow="hover">
            <p>
              <i class="el-icon-s-custom">会员数</i>
            </p>
            <p>857</p>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover">
            <p>
              <i class="el-icon-s-data">正在直播</i>
            </p>
            <p>123</p>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card shadow="hover">
            <p><i class="el-icon-money">今日收益</i></p>
            <p>￥415738.98</p>
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-top:20px;">
        <el-col :span="12">
          <el-card shadow="hover" :body-style="{ padding: '0px' }">
            <!-- <el-image style="width: 100%;height:90%;" src="http://image.imhtb.cn/bg.jpg" fit="fit"></el-image> -->
            <p>Ant Live</p>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card shadow="hover">今日收益</el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "dashboard"
};
</script>

<style>
.-top {
  overflow: inherit;
  z-index: 100;
  float: left;
  position: absolute;
  margin: -15px 0px 0px 20px;
}
/* .dashboar-container img{
  height: 60px;
  width: 60px;
  border-radius: 5%;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.349);
  -moz-box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.349);
  -webkit-box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.349);
} */
.image {
  width: 100%;
  display: block;
}
</style>