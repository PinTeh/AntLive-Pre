<template>
  <div class="live-container">
    <div class="live-content-div">
      <el-card :body-style="{ padding: '0px' }" shadow="never">
        <div class="author-info-content">
          <div style="width:80px;float:left;">
            <el-image
              class="author-info-avatar"
              :src="info.userInfo.avatar"
              :fit="'fit'"
            ></el-image>
          </div>
          <div class="author-info">
            <p class="author-info-title">{{ info.title }}</p>
            <p class="author-info-name">
              {{ info.userInfo.name }}
              <i class="ant-live icon-huo"></i>
              {{ ' 在线人气: ' + roomUserSize }}
            </p>
          </div>
          <div class="author-follow">
            <el-button
              @click="handleBan"
              v-if="isLiveRole"
              round
              style="padding:8px 20px 8px 20px;font-size:13px;"
              type="danger"
              >封禁</el-button
            >
            <el-button
              @click="handleFollow(false)"
              v-if="isFollow"
              round
              disabled
              style="padding:8px 20px 8px 20px;font-size:13px;"
              >已关注</el-button
            >
            <el-button
              @click="handleFollow(true)"
              v-else
              round
              style="padding:8px 20px 8px 20px;font-size:13px;"
              >关注</el-button
            >
          </div>
        </div>
        <div class="live-content">
          <LivePlayer
            ref="livePlayer"
            v-if="info.status === 1"
            :url="spliceLiveUrl"
          />
          <div class="not-live" v-else-if="info.status === 0">
            主播正在赶来的路上...
          </div>
          <div
            class="not-live"
            style="color:#303133;"
            v-else-if="info.status === 2"
          >
            该直播间因违规已被封禁
          </div>
        </div>
        <div class="present-content">
          <el-popover
            v-for="item in presents"
            :key="item.id"
            placement="top"
            width="250"
            trigger="hover"
            :open-delay="200"
            @after-leave="handlePresentHide"
          >
            <div style="height:30px;">
              <el-image
                style="width:30px;height:30px;"
                :src="item.icon"
              ></el-image>
              {{ item.name }}
              <span>（{{ item.price }}开心果）</span>
            </div>
            <div style="text-align: left; margin: 20px 0 2px 0;background:666;">
              <div
                :class="
                  sendCount == 1 ? 'price-item price-item-active' : 'price-item'
                "
                @click="sendCount = 1"
              >
                1
              </div>
              <div
                :class="
                  sendCount == 10
                    ? 'price-item price-item-active'
                    : 'price-item'
                "
                @click="sendCount = 10"
              >
                10
              </div>
              <div
                :class="
                  sendCount == 100
                    ? 'price-item price-item-active'
                    : 'price-item'
                "
                @click="sendCount = 100"
              >
                100
              </div>
              <el-button
                style="float:right"
                type="primary"
                size="mini"
                @click="handlePresent(item)"
                >确定</el-button
              >
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
        <div class="rank">
          <div class="rank-item" v-for="item in rank" :key="item.userId">
            <img class="avatar" :src="item.avatar" />
            <span class="name">{{ item.nickName }}</span>
            <span class="charm">{{ item.charm }}</span>
          </div>
        </div>
        <div class="danmu">
          <ul id="danmu-list" class="infinite-list" style="overflow:auto">
            <!-- v-infinite-scroll="load" -->
            <li
              v-for="(i, index) in messageList"
              :key="index"
              class="infinite-list-item"
            >
              <span class="chat-name">{{ i.name }}</span
              >:
              <span class="chat-content">{{ i.content }}</span>
            </li>
          </ul>
        </div>
        <div class="send-message-content">
          <el-input v-model="input" :disabled="this.isLogin" placeholder>
            <el-button
              slot="append"
              :disabled="this.isLogin"
              @click="handleSendChatMsg"
              >发送</el-button
            >
          </el-input>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import RoomApi from '@/api/room'
import WatchApi from '@/api/watch'
import ChatApi from '@/api/chat'
import PresentApi from '@/api/present'
// import Header from '../components/Header'
import LivePlayer from '../components/FlvLivePlayer'
import { getToken } from '../utils/auth'
// import room from '../api/room'
export default {
  name: 'index',
  components: {
    // Header,
    LivePlayer,
  },
  data() {
    return {
      input: '',
      info: {
        id: '',
        title: '',
        userInfo: {
          nick: '',
          avatar: '',
        },
        liveUrl: '',
        status: '',
      },
      isFollow: false,
      presents: [],
      socket: {},
      messageList: [],
      sendCount: 1,
      realSendCount: 1,
      currentPresent: {},
      visible: false,
      rank: [
        {
          userId: 1,
          nickName: '小老虎',
          avatar: 'http://q1.qlogo.cn/g?b=qq&nk=363353005&s=100',
          charm: 826,
        },
        {
          userId: 2,
          nickName: '那个叫啥啥',
          avatar: 'http://q1.qlogo.cn/g?b=qq&nk=794409767&s=100',
          charm: 1396,
        },
        {
          userId: 3,
          nickName: '飞哥',
          avatar: 'http://q1.qlogo.cn/g?b=qq&nk=1109956029&s=100',
          charm: 126,
        },
      ],
      lockReconnect: false, // 是否真正建立连接
      heartTime: 5 * 1000, // 5秒一次心跳
      heartTimeout: null, // 心跳倒计时定时器
      reconnectTime: 5 * 1000, // 断线重连时间间隔
      reconnectTimeout: null, // 断开重连倒计时定时器
      roomUserSize: 0,
      roomUserSizeInterval: null,
    }
  },
  computed: {
    isLogin() {
      return this.$store.state.userInfo === null
    },
    spliceLiveUrl() {
      return this.info.liveUrl + this.info.id + '.flv'
    },
    isLiveRole() {
      const roleLiveId = 2
      return (
        this.$store.state.userInfo != null &&
        this.$store.state.userInfo.roleIds.indexOf(roleLiveId) > -1
      )
    },
  },
  mounted() {
    this.initData()
    this.initWebSocket()
    this.getPopularity()
    this.roomUserSizeInterval = setInterval(() => {
      this.getPopularity()
    }, 10000)
  },
  beforeDestroy() {
    this.closeWebSocket()
    clearInterval(this.roomUserSizeInterval)
  },
  methods: {
    getPopularity() {
      ChatApi.getPopularity({
        roomId: this.$route.params.id,
      }).then((res) => {
        this.roomUserSize = res.data.data
        console.log(this.roomUserSize)
      })
    },
    /**
     * 保存历史记录
     */
    addHistory() {
      WatchApi.saveRelation({
        rid: this.$route.params.id,
        act: 3,
      }).catch(() => {})
    },
    handleBan() {
      // eslint-disable-next-line no-unused-vars
      let rid = this.info.id
    },
    handlePresentClick(v) {
      this.currentPresent = v
    },
    handlePresent(item) {
      this.realSendCount = this.sendCount
      let data = {
        rid: this.info.id,
        number: this.realSendCount,
        pid: item.id,
      }
      PresentApi.liveReward(data)
        .then((ret) => {
          if (ret.data.code != 0) {
            this.$notify.error({
              title: '礼物赠送失败',
              message: ret.data.data,
              duration: 1200,
              showClose: false,
            })
          } else {
            // this.$notify.success({
            //   title: item.name + ' * ' + this.realSendCount,
            //   message: '赠送成功',
            //   duration: 1200,
            //   showClose: false,
            // })
          }
        })
        .catch(() => {
          this.$notify.error({
            title: '礼物赠送',
            message: '赠送失败',
            duration: 1200,
            showClose: false,
          })
        })
    },
    handleFollow(follow) {
      if (follow) {
        // 关注
        WatchApi.saveRelation({
          rid: this.info.id,
          act: 1,
        }).then((res) => {
          const { data } = res.data
          if (data) {
            this.isFollow = true
          }
        })
      } else {
        // 取消关注
        WatchApi.saveRelation({
          rid: this.info.id,
          act: 2,
        }).then((res) => {
          const { data } = res.data
          if (data) {
            this.isFollow = false
          }
        })
      }
    },
    /**
     * 初始化
     */
    initData() {
      // 添加历史记录
      this.addHistory()
      let rid = this.$route.params.id
      RoomApi.getRoomExtraInfo({ rid: rid }).then((res) => {
        let { data } = res.data
        this.isFollow = data.follow
      })
      RoomApi.getRoomInfo({ rid: rid }).then((res) => {
        this.info = res.data.data
        this.$nextTick(() => {
          let url = this.info.liveUrl + this.info.id + '.flv'
          this.$refs.livePlayer.initPlayer(url)
        })
      })
      PresentApi.listPresents().then((res) => {
        this.presents = res.data.data
      })
      if (this.$store.state.userInfo) {
        this.input = ''
      } else {
        this.input = '登录后才可以发送消息噢~'
      }
    },
    handlePresentHide() {
      this.sendCount = 1
    },
    handleSendChatMsg() {
      if (this.input === '') {
        return
      }
      ChatApi.sendChatMsg({
        roomId: this.$route.params.id,
        text: this.input,
      }).then(() => {})
      this.input = ''
    },
    initWebSocket() {
      console.log(getToken())
      // this.socket = new WebSocket('ws://' + location.hostname + ':10022')
      // this.socket = new WebSocket('ws://' + location.hostname + ':10022', [
      //   encodeURIComponent(getToken()),
      // ])
      this.socket = new WebSocket(
        'ws://' +
          location.hostname +
          ':10022?token=' +
          encodeURIComponent(getToken())
      )
      this.socket.onopen = this.open
      this.socket.onclose = this.onclose
      this.socket.onerror = this.error
      this.socket.onmessage = this.getMessage
    },
    closeWebSocket() {
      let req = {
        msgType: 1,
      }
      this.socket.send(JSON.stringify(req))
      this.heartTimeout && clearTimeout(this.heartTimeout)
      this.heartTimeout = null
      this.reconnectTimeout && clearTimeout(this.reconnectTimeout)
      this.reconnectTimeout = null
      this.socket.close()
      this.socket = null
    },
    open() {
      console.log('[WebSocket] 连接成功')
      let reqBody = {
        msgType: 0,
        data: {
          roomId: this.$route.params.id,
        },
      }
      this.socket.send(JSON.stringify(reqBody))
      this.heartBeat()
    },
    reconnect() {
      console.log('[WebSocket] 重新连接')
      // 重新连接
      if (this.lockReconnect) {
        return
      }
      this.lockReconnect = true
      this.heartTimeout && clearTimeout(this.heartTimeout)
      this.heartTimeout = null
      this.socket.close()
      this.socket = null
      // 没连接上会一直重连，设置延迟避免请求过多
      this.reconnectTimeout && clearTimeout(this.reconnectTimeout)
      this.reconnectTimeout = setTimeout(() => {
        // 新连接
        this.lockReconnect = false
        this.initWebSocket()
      }, this.reconnectTime)
    },
    reset() {
      // 清除时间
      this.heartTimeout && clearTimeout(this.heartTimeout)
      // 重启心跳
      this.heartBeat()
    },
    heartBeat() {
      // 开启心跳
      this.heartTimeout = setTimeout(() => {
        if (this.socket.readyState === 1) {
          // 如果连接正常
          let req = {
            msgType: 2,
          }
          this.socket.send(JSON.stringify(req))
          this.reset()
        } else {
          this.reconnect()
        }
      }, this.heartTime)
    },
    error() {
      console.log('[WebSocket] 连接错误')
      this.reconnect()
    },
    getMessage(msg) {
      console.log(msg, 'msg')
      let message = JSON.parse(msg.data)
      if (message.method === 'giftMessage') {
        // 礼物特效
        let { data } = message
        this.$notify({
          title: '礼物赠送',
          message: data,
          type: 'success',
          duration: 1200,
          showClose: false,
        })
        return
      }
      if (message.method === 'chatMessage') {
        let { data } = message
        this.fillMessage({
          name: data.nickname,
          content: data.text,
        })
      }
      if (message.method === 'welcomeMessage') {
        this.fillMessage({
          name: '系统消息',
          content: message.data,
        })
      }
    },
    /**
     * 填充消息
     * @param {*} data
     */
    fillMessage(data) {
      this.messageList.push(data)
      if (this.messageList.length > 20) {
        this.messageList.shift()
      }
      setTimeout(() => {
        var div = document.getElementById('danmu-list')
        div.scrollTop = div.scrollHeight
      }, 0)
    },
    onclose() {
      console.log('[WebSocket] 已经关闭')
    },
  },
}
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
.live-container {
  margin: 20px auto;
  width: 1300px;
  display: flex;
  justify-content: center;
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
  .rank {
    display: flex;
    .rank-item {
      flex: 1;
      height: 130px;
      text-align: center;
      .avatar {
        border: rgb(215, 215, 215) 2px solid;
        margin-top: 22px;
        border-radius: 50%;
        height: 45px;
      }
      .name {
        display: block;
        font-size: 12px;
        margin-top: 8px;
      }
      .charm {
        line-height: 25px;
        color: #ec8303;
        font-size: 8px;
      }
    }
    .rank-item:nth-child(2) {
      .avatar {
        border: gold 2px solid;
      }
    }
  }
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
  background: #333333;
}
.present-content {
  height: 60px;
  background: rgb(255, 255, 255);
}
.rank {
  height: 130px;
  background: #ffffff;
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

[v-cloak] {
  display: none;
}
</style>
