<template>
  <video controls autoplay muted width="100%" height="100%" id="videoElement"></video>
</template>

<script>
import flvjs from "flv.js";
export default {
  name: "flv-live-player",
  props: ["url"],
  data() {
    return {};
  },
  watch: {
    url(v1, v2) {
      console.log(v1, "v1");
      console.log(v2, "v2");
    }
  },
  mounted() {
    if(this.url){
      this.init(this.url)
    }else{
      console.log("推流参数为空")
    }
  },
  methods:{
    init(v){
      if (flvjs.isSupported()) {
        var videoElement = document.getElementById("videoElement");
        var flvPlayer = flvjs.createPlayer({
          type: "flv",
          url: v
        });
        flvPlayer.attachMediaElement(videoElement);
        flvPlayer.load();
        flvPlayer.play();
      }
    }
  }
};
</script>

<style>
</style>