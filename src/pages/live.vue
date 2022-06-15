<template>
  <el-container style="height:100%;">
    <el-header style="padding:0px">
      <Header :notIndexPage="true" />
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
                <el-button
                  @click="handleBan"
                  v-if="isLiveRole"
                  round
                  style="padding:8px 20px 8px 20px;font-size:13px;"
                  type="danger"
                >封禁</el-button>

                <el-button
                  @click="handleFollow(false)"
                  v-if="isFollow"
                  round
                  disabled
                  style="padding:8px 20px 8px 20px;font-size:13px;"
                >已关注</el-button>
                <el-button
                  @click="handleFollow(true)"
                  v-else
                  round
                  style="padding:8px 20px 8px 20px;font-size:13px;"
                >关注</el-button>
              </div>
            </div>
            <div class="live-content">
              <LivePlayer v-if="info.status===1" :url="spliceLiveUrl" />
              <div class="not-live" v-else-if="info.status===0">主播正在赶来的路上...</div>
              <div class="not-live" style="color:#ff8e8e;" v-else>该直播间因违规已被封禁</div>
            </div>
            <div class="present-content">
              <!-- <el-popconfirm
                v-for="item in presents"
                :key="item.id"
                confirmButtonText="是的"
                cancelButtonText="不了"
                icon="el-icon-info"
                iconColor="green"
                title="确定要赠送礼物吗？"
                @onConfirm="handlePresent(item.id)"
              >
                <el-image
                  class="present-item"
                  :src="item.icon"
                  slot="reference"
                ></el-image>
              </el-popconfirm>-->

              <el-popover
                v-for="item in presents"
                :key="item.id"
                placement="top"
                width="250"
                v-model="visible"
              >
                <div style="height:30px;">
                  <el-image style="width:30px;height:30px;" :src="item.icon"></el-image>
                  {{item.name}}
                  <span>（{{item.price}}开心果）</span>
                </div>
                <div style="text-align: left; margin: 20px 0 2px 0;background:666;">
                  <div
                    :class="sendCount==1?'price-item price-item-active':'price-item'"
                    @click="sendCount = 1"
                  >1</div>
                  <div
                    :class="sendCount==10?'price-item price-item-active':'price-item'"
                    @click="sendCount = 10"
                  >10</div>
                  <div
                    :class="sendCount==100?'price-item price-item-active':'price-item'"
                    @click="sendCount = 100"
                  >100</div>
                  <el-button
                    style="float:right"
                    type="primary"
                    size="mini"
                    @click="handlePresent"
                  >确定</el-button>
                </div>
                <el-image
                  class="present-item"
                  :src="item.icon"
                  slot="reference"
                  @click="handlePresentClick(item)"
                ></el-image>
              </el-popover>
            </div>
          </el-card>
        </div>
        <div class="live-chat-div">
          <el-card :body-style="{ padding: '0px' }" shadow="never">
            <div class="rank"></div>
            <div class="danmu">
              <ul id="danmu-list" class="infinite-list" style="overflow:auto">
                <!-- v-infinite-scroll="load" -->
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
import LivePlayer from "../components/FlvLivePlayer";
import { getToken } from "../utils/auth";
import store from "../store";
export default {
  name: "index",
  data() {
    return {
      input: "",
      info: {
        id: "",
        title: "",
        userInfo: {
          nick: "",
          avatar: ""
        },
        liveUrl: "",
        status: ""
      },
      isFollow: false,
      presents: [],
      socket: "",
      messageList: [],
      sendCount: 1,
      currentPresent: {}
    };
  },
  computed: {
    isLogin() {
      return this.$store.state.userInfo == null;
    },
    spliceLiveUrl() {
      return this.info.liveUrl + this.info.id + ".flv";
    },
    isLiveRole() {
      const roleLiveId = 2;
      return (
        this.$store.state.userInfo != null &&
        this.$store.state.userInfo.roleIds.indexOf(roleLiveId) > -1
      );
    }
  },
  components: {
    Header,
    LivePlayer
  },
  mounted() {
    this.init();
  },
  methods: {
    handleBan() {
      // eslint-disable-next-line no-unused-vars
      let rid = this.info.id;
    },
    handlePresentClick(v) {
      this.currentPresent = v;
    },
    handlePresent() {
      this.$confirm("是否赠送"+this.sendCount+"个"+this.currentPresent.name+"?", "赠送确认", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "success ",
        lockScroll:false
      }).then(() => {
        let data = {
          rid: this.info.id,
          number: this.sendCount,
          pid: this.currentPresent.id
        };
        Api.sendPresent(data)
          .then(ret => {
            if (ret.data.code != 0) {
              this.$notify.error({
                title: "错误1",
                message: "赠送失败"
              });
            }
          })
          .catch(() => {
            this.$notify.error({
              title: "错误2",
              message: "赠送失败"
            });
          });
      });
    },
    handleFollow(flag) {
      if (flag) {
        Api.saveWatch({
          rid: this.info.id,
          type: 1
        }).then(() => {
          this.isFollow = true;
        });
      } else {
        Api.delWatch(this.info.id).then(() => {
          this.isFollow = false;
        });
      }
    },
    init() {
      let rid = this.$route.params.id;
      Api.getRoomInfo(rid).then(res => {
        this.info = res.data.data;
      });
      Api.getPresentInfo().then(res => {
        this.presents = res.data.data;
      });
      this.initWebSocket(rid);
      if (this.$store.state.userInfo == null) {
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
        div.scrollTop = div.scrollHeight;
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
          "ws://127.0.0.1:9000/live/chat/" + rid + "/" + getToken()
        );
        // this.socket = new WebSocket(
        //   "ws://119.23.255.187:9000/live/chat/" + rid + "/" + getToken()
        // );
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
      if (message.op === "PRESENT") {
        // 礼物特效
        let p = message.p;
        this.$notify({
          title: message.u.name,
          message: "收到" + p.name + " * " + p.number,
          type: "success"
        });
      }
      this.messageList.push({
        name: message.u.name,
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

<style scoped lang="less">
.price-item {
  width: 45px;
  height: 25px;
  line-height: 25px;
  border: 1px solid rgb(179, 179, 179);
  border-radius: 10%;
  display: inline-block;
  text-align: center;
  margin-right: 5px;
}
.price-item-active {
  color: #fff;
  background: rgb(250, 125, 23);
  border: 1px solid rgb(255, 160, 72);
  cursor: pointer;
}
.price-item:hover {
  color: #fff;
  background: rgb(250, 125, 23);
  border: 1px solid rgb(255, 160, 72);
  cursor: pointer;
}
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
  min-width: 1500px;
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
  background: rgb(255, 255, 255);
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
.author-follow {
  height: 80px;
  width: 200px;
  line-height: 80px;
  vertical-align: middle;
  text-align: center;
}
.live-content {
  height: 500px;
  background: rgba(44, 44, 44, 0.685);
}
.present-content {
  height: 60px;
  background: rgb(255, 255, 255);
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
  vertical-align: middle;
  padding: 10px 10px 10px 10px;
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
.not-live {
  width: 100%;
  height: 100%;
  text-align: center;
  color: rgb(218, 218, 218);
  line-height: 500px;
}
</style>