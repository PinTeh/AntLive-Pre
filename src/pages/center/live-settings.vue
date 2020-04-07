<template>
  <div class="live-settings" >
    <el-card class="live-settings-card" :body-style="{ padding: '0 0 10px 0'}">
        <p>直播</p>
            <el-divider></el-divider>
            <p>推流地址：{{pushUrl}}</p>
            <p>密钥:{{secret}}</p>
            <el-divider></el-divider>
            <el-button plain @click="handleLiveOpen">我要直播</el-button>
    </el-card>
  </div>
</template>

<script>
import Api from '../../api'
export default {
  name: "live-settings",
    data() {
    return {
      pushUrl:'rtmp://live.imhtb.cn/live/',
      secret:'点击下面我要直播申请密钥'
    };
  },
  mounted(){
     
  },
  methods:{
      handleLiveOpen(){
        this.openLive();
      },
      openLive(){
        Api.openLive().then(res=>{
          let ret = res.data.data;
          this.pushUrl = ret.pushUrl;
          this.secret = ret.secret;
        })
      }
  }
};
</script>

<style>
.live-settings {
  /* min-height: 500px; */
  padding: 20px;
}
.live-settings-card{
    /* margin: 20px; */
}
</style>