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
            </div>
            <div class="live-content">
              <div id="vedio-container" ref="vod" style="width:100%; height:auto;"></div>
            </div>
          </el-card>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import Api from "../api";
import Header from "../components/Header";
export default {
  name: "vod-player",
  data() {
    return {
      info: {
        title: "",
        userInfo: {
          nick: "",
          avatar: ""
        },
      },
      player: null
    };
  },
  computed: {},
  components: {
    Header
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let params = {
        vid: this.$route.params.id
      };
      Api.getVodVideoInfo(params).then(r => {
        let TcPlayer = window.TcPlayer;
        let ret = r.data.data;
        this.info.title = ret.title;
        this.info.userInfo = ret.userInfo;
        this.player = new TcPlayer("vedio-container", {
          mp4:ret.videoUrl,
          autoplay: false, //iOS 下 safari 浏览器，以及大部分移动端浏览器是不开放视频自动播放这个能力的
          poster: ret.coverUrl,
          width: "1000",
          height: "555"
        });
      });
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
  min-width: 1500px;
}
.live-content-div {
  text-align: left;
  width: 1000px;
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
.author-follow {
  height: 80px;
  width: 200px;
  line-height: 80px;
  vertical-align: middle;
  text-align: center;
}
.live-content {
  height: 555px;
  background: rgba(44, 44, 44, 0.685);
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