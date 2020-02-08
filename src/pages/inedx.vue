<template>
  <div class="root">
    <el-row :gutter="20" type="flex" class="row-bg" justify="center">
      <el-col :span="14">
        <el-card :body-style="{ padding: '0px' }" shadow="always">
          <div class="author-info-content">
            <div style="width:70px;float:left;">
              <el-image class="author-info-avatar" :src="url2" :fit="fit"></el-image>
            </div>
            <div class="author-info">
              <p class="author-info-title">Porsche的直播间</p>
              <p class="author-info-name">Panamara Turbos</p>
            </div>
          </div>
          <div class="live-content"></div>
          <div class="present-content">
            <el-image class="present-item" :src="url" :fit="fit"></el-image>
            <el-image class="present-item" :src="url3" :fit="fit"></el-image>
            <el-image class="present-item" :src="url" :fit="fit"></el-image>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card :body-style="{ padding: '0px' }" shadow="always">
          <div class="rank"></div>
          <div class="danmu"></div>
          <div class="send-message-content">
            <div class="send-message-box">
              <el-input  v-model="input" placeholder="请输入内容"></el-input>
            </div>
            <!-- <input class="send-message-box" v-model="input" placeholder="请输入内容"  /> -->
            <!-- <button class="send-message-btn">发送</button> -->
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      url: "http://image.imhtb.cn/飞机.png",
      url2: "http://image.imhtb.cn/avatar.png",
      url3: "http://image.imhtb.cn/飞机1.png",
      input: ""
    };
  }
};
</script>

<style>
.row-bg {
  padding: 10px 0;
  background-color: #d1d1d1;
  margin-top: 50px;
}
.bg-purple {
  background: #d3dce6;
  height: 550px;
}
.bg-purple-light {
  background: #e5e9f2;
  height: 550px;
}
.author-info-content {
  height: 80px;
  background: rgb(247, 247, 247);
}
.author-info-avatar {
  width: 65px;
  height: 65px;
  border-radius: 70px;
  margin: 6px 10px 0px 10px;
}
.author-info {
  height: 80px;
  position: relative;
  margin-left: 80px;
}
.author-info-title {
  padding: 7px;
  margin: 0px 0 0 10px;
  color: #3a3a3a;
  font-size: 20px;
  line-height: 30px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.author-info-name {
  padding: 7px;
  margin: 0px 0 0 10px;
  color: #636363;
  font-size: 14px;
  line-height: 14px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.live-content {
  height: 460px;
  background: rgb(92, 92, 92);
}
.present-content {
  height: 60px;
  background: rgb(247, 247, 247);
}
.rank {
  height: 150px;
  background: #52ad7f;
}
.danmu {
  height: 390px;
  background: rgb(247, 247, 247);
}
.send-message-content {
  height: 60px;
  line-height: 60px;
  vertical-align: middle;
}

.send-message-box {
  height: 45px;
  margin: 0 10px 0 10px;
}

.send-message-btn {
  float: left;
  margin-left: 5px;
  width: 20%;
  height: 45px;
  border: 1px solid rgb(90, 90, 90);
  background: none;
}

.present-item {
  width: 30px;
  height: 30px;
  margin: 7px;
  padding: 7px;
  border-radius: 4px;
  border: 1px solid rgb(221, 221, 221);
}
.present-item :hover {
  border: 1px solid rgb(243, 130, 0);
}
</style>