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
      if (flvjs.isSupported()) {
        var videoElement = document.getElementById("videoElement");
        var flvPlayer = flvjs.createPlayer({
          type: "flv",
          url: v2
        });
        flvPlayer.attachMediaElement(videoElement);
        flvPlayer.load();
        flvPlayer.play();
      }
    }
  },
  mounted() {}
};
</script>

<style>
</style>