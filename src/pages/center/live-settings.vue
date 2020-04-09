<template>
  <div class="live-settings" >
    <el-card class="live-settings-card" :body-style="{ padding: '0 0 10px 0'}" shadow="hover">
            <p>开播</p>
            <el-divider></el-divider>
            <span>推流地址：</span><span style="font-size:14px;color:#666;">{{pushUrl}}</span>
            <p></p>
            <span>密钥：</span><span style="font-size:14px;color:#666;">{{secret}}</span>
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
  height: 500px;
  padding:0 20px 0 20px;
  
}
.live-settings-card{
    /* margin: 20px; */
    height: 440px;
    position: relative;
    top:20px
}
</style>