<template>
  <div class="live-settings" >
    <el-card class="live-settings-card" :body-style="{ padding: '0 0 10px 0'}">
        <p>直播</p>
            <el-divider></el-divider>
            <p>推流地址：{{formData.rtmpUrl}}</p>
            <p>密钥:{{formData.secret}}</p>
            <el-divider></el-divider>
            <el-button :type="formData.status==0?'':'warning'" plain @click="handleLiveOpen">{{formData.status ===0 ? "开始直播":"停止直播"}}</el-button>
    </el-card>
  </div>
</template>

<script>
import Api from '../../api'
export default {
  name: "live-settings",
    data() {
    return {
      formData: {
        id:"",
        title: "",
        notice: "",
        type: "",
        cid: "",
        cover:"",
        rtmpUrl:"",
        secret:"",
        status:''
      }
    };
  },
  mounted(){
     this.getLiveSettingsInfo();
  },
  methods:{
      handleLiveOpen(){
          if(this.formData.status === 0){
            Api.liveOpen().then(()=>{
                console.log("open finished")
                this.getLiveSettingsInfo()
            })
          }else{
            Api.liveClose(this.formData.id).then(()=>{
                console.log("close finished")
                this.getLiveSettingsInfo()
            })
          }
      },
      getLiveSettingsInfo(){
        Api.getRoomSettingInfo().then(res=>{
          let ret = res.data.data;
          this.formData.id = ret.id;
          this.formData.title = ret.title;
          this.formData.notice = ret.notice;
          this.formData.cover = ret.cover;
          this.formData.cid = ret.categoryId;
          this.formData.rtmpUrl = ret.rtmpUrl;
          this.formData.secret = ret.id + "?key=" + ret.secret;
          this.formData.status = ret.status;
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