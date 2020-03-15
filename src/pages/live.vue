<template>
  <el-container>
    <el-header style="padding:0px">
      <Header />
    </el-header>
    <el-main>
      <div class="root">
        <el-row :gutter="20" type="flex" class="row-bg" justify="center" style="margin-top:0px;">
          <el-col :span="14">
            <el-card :body-style="{ padding: '0px' }" shadow="always">
              <div class="author-info-content">
                <div style="width:70px;float:left;">
                  <el-image class="author-info-avatar" :src="info.userInfo.avatar" :fit="'fit'"></el-image>
                </div>
                <div class="author-info">
                  <p class="author-info-title">{{info.title}}</p>
                  <p class="author-info-name">{{info.userInfo.name}}</p>
                </div>
              </div>
              <div class="live-content">
                <LivePlayer :liveUrl="info.rtmpUrl" />
              </div>
              <div class="present-content">
                <el-image
                  v-for="item in presents"
                  :key="item.id"
                  class="present-item"
                  :src="item.icon"
                ></el-image>
              </div>
            </el-card>
          </el-col>
          <el-col :span="4">
            <el-card :body-style="{ padding: '0px' }" shadow="always">
              <div class="rank"></div>
              <div class="danmu"></div>
              <div class="send-message-content">
                <div class="send-message-box">
                  <el-input v-model="input" placeholder="请输入内容"></el-input>
                </div>
                <!-- <input class="send-message-box" v-model="input" placeholder="请输入内容"  /> -->
                <!-- <button class="send-message-btn">发送</button> -->
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import Api from "../api";
import Header from "../components/Header";
import LivePlayer from "../components/LivePlayer";
import { getToken } from '../utils/auth'
export default {
  name: "index",
  data() {
    return {
      input: "",
      info: {
        title: "",
        userInfo: {
          nick: "",
          avatar: ""
        }
      },
      presents: [],
      socket: ""
    };
  },
  components: {
    Header,
    LivePlayer
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let rid = this.$route.params.id;
      Api.getRoomInfo(rid).then(res => {
        this.info = res.data.data;
      });
      Api.getPresentInfo().then(res => {
        this.presents = res.data.data;
      });
      // 实例化socket
      this.socket = new WebSocket("ws://localhost:9000/live/chat/"+rid+"/" + getToken());
      // 监听socket连接
      this.socket.onopen = this.open;
      // 监听socket错误信息
      this.socket.onerror = this.error;
      // 监听socket消息
      this.socket.onmessage = this.getMessage;
    },
    open() {
      console.log("socket连接成功");
    },
    error() {
      console.log("连接错误");
    },
    getMessage(msg) {
      console.log(msg,"msg")
      console.log(msg.data,"msg.data");
    },
    send() {
      this.socket.send("tt");
    },
    close() {
      console.log("socket已经关闭");
    }
  }
};
</script>

<style scoped>
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
.present-item:hover {
  border: 1px solid rgb(243, 130, 0);
  cursor: pointer;
}
</style>