<template>
  <div class="live-settings">
    <el-card
      class="live-settings-card"
      :body-style="{ padding: '0 0 10px 0' }"
      shadow="hover"
    >
      <div v-if="this.liveStatusObj.liveStatus != 1">
        <p>开播</p>
        <el-divider></el-divider>
        <span>推流地址：</span
        ><span style="font-size: 14px; color: #666">{{
          liveStatusObj.livePushUrl
        }}</span>
        <p></p>
        <span>密钥：</span
        ><span style="font-size: 14px; color: #666">{{
          liveStatusObj.livePushSecret
        }}</span>
        <el-divider></el-divider>
        <el-button plain @click="handleLiveOpen">我要直播</el-button>
      </div>
      <div v-else>
        <p><i class="el-icon-loading"></i> 直播中</p>
        <el-divider></el-divider>
        <span>推流地址：</span
        ><span style="font-size: 14px; color: #666">{{
          liveStatusObj.livePushUrl
        }}</span>
        <p></p>
        <span>密钥：</span
        ><span style="font-size: 14px; color: #666">{{
          liveStatusObj.livePushSecret
        }}</span>
        <p></p>
        <span>直播开始时间：</span
        ><span style="font-size: 14px; color: #666">{{
          liveStatusObj.liveStartTime
        }}</span>
        <p></p>
        <el-popconfirm
          icon="el-icon-info"
          icon-color="red"
          title="直播流将会被中断噢～"
          @onConfirm="handleLiveStop"
        >
          <el-button slot="reference" type="danger" plain
            >停止直播</el-button
          >
        </el-popconfirm>
      </div>
    </el-card>
  </div>
</template>

<script>
import Api from "../../api";
export default {
  name: "live-settings",
  data() {
    return {
      liveStatusObj: {
        liveStatus: "",
        liveStartTime: "",
        livePushUrl: "--",
        livePushSecret: "点击下面我要直播申请密钥",
      },
    };
  },
  mounted() {
    this.initGetStatus();
  },
  methods: {
    initGetStatus() {
      Api.getLiveStatus().then((r) => {
        if (r.data.code == 0) {
          this.liveStatusObj = r.data.data;
        }
      });
    },
    handleLiveOpen() {
      this.openLive();
    },
    openLive() {
      Api.applySecret().then((r) => {
        if (r.data.code == 0) {
          this.initGetStatus();
        }
      });
    },
    handleLiveStop() {
      Api.stopLive().then((r) => {
        if (r.data.code == 0) {
          this.initGetStatus();
        }
      });
    },
  },
};
</script>

<style>
.live-settings {
  /* min-height: 500px; */
  height: 500px;
  padding: 0 20px 0 20px;
}
.live-settings-card {
  /* margin: 20px; */
  height: 440px;
  position: relative;
  top: 20px;
}
</style>