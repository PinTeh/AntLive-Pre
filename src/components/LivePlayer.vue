<template>
  <video style="width:100%;height:100%;" ref="videoPlayer" class="video-js"></video>
</template>

<script>
import videojs from "video.js";
export default {
  name: "live",
  props: ["liveUrl"],
  data() {
    return {
      player: null
    };
  },
  watch: {
    liveUrl(newValue) {
      this.player = videojs(
        this.$refs.videoPlayer,
        {
          autoplay: true,
          controls: true,
          sources: [
            {
              src: newValue,
              type: "rtmp/flv"
            }
          ],
          controlBar: {
            timeDivider: true, // 时间分割线
            durationDisplay: true, // 总时间
            progressControl: true, // 进度条
            remainingTimeDisplay: false, // 剩余时间
            fullscreenToggle: true // 全屏按钮
          }
        },
        function onPlayerReady() {
          
        }
      );
    }
  },
  methods: {},
  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  }
};
</script>

<style>
</style>