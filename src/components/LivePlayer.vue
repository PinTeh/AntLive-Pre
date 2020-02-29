<template>
  <video controls autoplay muted width="100%" height="100%" id="videoElement"></video>
</template>

<script>
import flvjs from "flv.js";
export default {
  name: "live",
  props:['liveUrl'],
  data(){
    return{
      url:'http://play.imhtb.cn/live/333.flv'
    }
  },
  mounted() {
    if (flvjs.isSupported()) {
      var videoElement = document.getElementById("videoElement");
      var flvPlayer = flvjs.createPlayer({
        type: "flv",
        url: this.url
      });
      flvPlayer.attachMediaElement(videoElement);
      flvPlayer.load();
      flvPlayer.play();
    }
  }
};
</script>

<style>
</style>