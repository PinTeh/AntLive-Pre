<template>
  <el-container style="height:100%;">
    <el-header style="padding:0px">
      <Header />
    </el-header>
    <el-main style="text-align:center;">
      <div class="live-root">
        <div class="live-content-div">
          <el-card :body-style="{ padding: '0px' }" shadow="never">
            <div class="author-info-content">
              <div style="width:80px;float:left;">
                <el-image class="author-info-avatar" :src="info.userInfo.avatar" :fit="'fit'"></el-image>
              </div>
              <div class="author-info">
                <p class="author-info-title">{{info.title}}</p>
                <p class="author-info-name">{{info.userInfo.name}}</p>
              </div>
              <div class="author-follow">
                  <el-button v-if="isFollow" round disabled style="padding:8px 20px 8px 20px;font-size:13px;" >已关注</el-button>
                  <el-button v-else round style="padding:8px 20px 8px 20px;font-size:13px;" >关注</el-button>
              </div>
            </div>
            <div class="live-content">
              <!-- <LivePlayer :liveUrl="info.rtmpUrl" /> -->
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
        </div>
        <div class="live-chat-div">
          <el-card :body-style="{ padding: '0px' }" shadow="never">
            <div class="rank"></div>
            <div class="danmu">
              <ul
                id="danmu-list"
                class="infinite-list"
                v-infinite-scroll="load"
                style="overflow:auto"
              >
                <li v-for="(i,index) in messageList" :key="index" class="infinite-list-item">
                  <span class="chat-name">{{i.name}}</span>:
                  <span class="chat-content">{{i.content}}</span>
                </li>
              </ul>
            </div>
            <div class="send-message-content">
                <el-input v-model="input" :disabled="this.isLogin" placeholder>
                  <el-button slot="append" :disabled="this.isLogin" @click="handleSend">发送</el-button>
                </el-input>
            </div>
          </el-card>
        </div>
      </div>
          <div style="height:100px;width:100%;"></div>
    </el-main>
  </el-container>
</template>

<script>
import Api from "../api";
import Header from "../components/Header";
// import LivePlayer from "../components/LivePlayer";
import { getToken } from "../utils/auth";
import store from "../store";
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
        },
      },
      isFollow:false,
      presents: [],
      socket: "",
      messageList: [
        {
          name: "系统消息",
          content: "这是一条测试消息~"
        }
      ]
    };
  },
  computed: {
    isLogin() {
      return this.$store.state.userInfo === "";
    }
  },
  components: {
    Header
    // LivePlayer
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
      this.initWebSocket(rid);
      if (this.$store.state.userInfo === "") {
        this.input = "登录后才可以发送消息噢~";
      }
    },
    handleSend() {
      let ws = store.state.webSocket.socket;
      ws.send(
        JSON.stringify({
          c: 0,
          d: this.input,
          op: "MESSAGE"
        })
      );
      this.messageList.push({
        name: "我",
        content: this.input
      });
      this.input = "";

      setTimeout(() => {
        var div = document.getElementById("danmu-list");
        div.scrollTop = div.scrollHeight
      }, 0);
    },
    initWebSocket(rid) {
      let socketObj = store.state.webSocket;
      console.log(socketObj, "obj");
      if (
        socketObj.rid === rid &&
        socketObj.socket != "" &&
        socketObj.socket.readyState === 1
      ) {
        console.log("ws连接已经创建");
      } else {
        if (socketObj.socket != "") {
          socketObj.socket.close();
          console.log("wst执行手动关闭");
        }
        console.log("初始化ws");
        this.socket = new WebSocket(
          "ws://localhost:9000/live/chat/" + rid + "/" + getToken()
        );
        this.socket.onopen = this.open;
        this.socket.onclose = this.onclose;
        this.socket.onerror = this.error;
        this.socket.onmessage = this.getMessage;
        store.commit("setWebSocket", {
          rid,
          socket: this.socket
        });
      }
    },
    open() {
      console.log("ws连接成功");
    },
    error() {
      console.log("ws连接错误");
    },
    getMessage(msg) {
      console.log(msg, "msg");
      let message = JSON.parse(msg.data);
      console.log(message, "message");
      this.messageList.push({
        name: message.u,
        content: message.d
      });
      if (this.messageList.length > 20) {
        this.messageList.shift();
      }
      setTimeout(() => {
        var div = document.getElementById("danmu-list");
        div.scrollTop = div.scrollHeight;
      }, 0);
    },
    send() {
      this.socket.send("tt");
    },
    onclose() {
      console.log("ws已经关闭");
    }
  }
};
</script>

<style scoped>
.infinite-list {
  height: 430px;
  padding: 0;
  margin: 0;
  list-style: none;
}
.infinite-list .infinite-list-item {
  display: flex;
  /* align-items: center; */
  /* justify-content: center; */
  min-height: 20px;
  background: #f5faff;
  margin: 0px 0px 0px 0px;
  font-size: 14px;
  padding: 8px 5px 5px 10px;
}
.infinite-list .infinite-list-item:hover {
  background: #fff;
}
.infinite-list-item .chat-name {
  color: #52ad7f;
  margin-right: 3px;
}
.infinite-list-item .chat-content {
  margin-left: 5px;
}
.live-root {
  margin: 0 auto;
}
.live-content-div {
  text-align: left;
  width: 890px;
  display: inline-block;
}
.live-chat-div {
  margin-left: 10px;
  text-align: left;
  width: 330px;
  display: inline-block;
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
  display: flex;
}
.author-info-avatar {
  width: 65px;
  height: 65px;
  border-radius: 70px;
  margin: 6px 10px 0px 10px;
}
.author-info {
  height: 80px;
  width: 700px;
  position: relative;
      display: inline-block;
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
.author-follow{
  height: 80px;
  width: 100px;
  line-height: 80px;
  vertical-align: middle;
  text-align: center;
}
.live-content {
  height: 500px;
  background: rgb(92, 92, 92);
}
.present-content {
  height: 60px;
  background: rgb(247, 247, 247);
}
.rank {
  height: 130px;
  background: #52ad7f;
}
.danmu {
  height: 450px;
  background: rgb(247, 247, 247);
}
.send-message-content {
  height: 60px;
  line-height: 60px;
  vertical-align: middle;
   padding: 0 10px 0 10px; 
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