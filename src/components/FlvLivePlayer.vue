<template>
  <video
    controls
    autoplay
    muted
    width="100%"
    height="100%"
    id="videoElement"
  ></video>
</template>

<script>
import flvjs from 'flv.js'
export default {
  name: 'flv-live-player',
  props: ['url'],
  data() {
    return {
      player: {},
    }
  },
  mounted() {},
  methods: {
    initPlayer(v) {
      console.log(v)
      if (flvjs.isSupported()) {
        var videoElement = document.getElementById('videoElement')
        var flvPlayer = flvjs.createPlayer({
          type: 'flv',
          isLive: true, // 是否是直播流
          url: v,
        })
        flvPlayer.attachMediaElement(videoElement)
        flvPlayer.load()
        flvPlayer.play()
        this.player = flvPlayer
        flvPlayer.on(flvjs.Events.METADATA_ARRIVED, () => {
          console.log('视频加载完成')
        })
        flvPlayer.on(flvjs.Events.ERROR, (err, errdet) => {
          // 参数 err 是一级异常，errdet 是二级异常
          if (err == flvjs.ErrorTypes.MEDIA_ERROR) {
            console.log('媒体错误')
            if (errdet == flvjs.ErrorDetails.MEDIA_FORMAT_UNSUPPORTED) {
              console.log('媒体格式不支持')
            }
          }
          if (err == flvjs.ErrorTypes.NETWORK_ERROR) {
            console.log('网络错误')
            if (errdet == flvjs.ErrorDetails.NETWORK_STATUS_CODE_INVALID) {
              console.log('http状态码异常')
            }
          }
          if (err == flvjs.ErrorTypes.OTHER_ERROR) {
            console.log('其他异常：', errdet)
          }
          if (this.player) {
            // this.destroyVideos()
            // this.createdPlay()
          }
        })

        // 下面是自动追帧操作
        let accThreshould = 0.6
        let normalThreshould = 0.4
        let accPlaybackRate = 1.1

        this.liveBroadcastTimer = setInterval(() => {
          if (!videoElement.buffered.length) {
            return
          }
          // 获取视频最新时间
          let end = videoElement.buffered.end(0)
          // 计算时间差值
          let diff = end - videoElement.currentTime
          if (diff >= 3) {
            videoElement.paused &&
              videoElement.play().catch((err) => console.error('播放失败', err))
            videoElement.currentTime = end
          } else if (
            diff >= accThreshould &&
            videoElement.playbackRate < accPlaybackRate
          ) {
            videoElement.paused &&
              videoElement.play().catch((err) => console.error('播放失败', err))
            videoElement.playbackRate = accPlaybackRate
          } else if (diff < normalThreshould && videoElement.playbackRate > 1) {
            videoElement.paused &&
              videoElement.play().catch((err) => console.error('播放失败', err))
            videoElement.playbackRate = 1
          }
        }, 3000)
      }
    },
    destroyVideos() {
      if (!this.player) return
      this.player.pause()
      this.player.unload()
      this.player.detachMediaElement()
      this.player.destroy()
      this.player = null
    },
  },
}
</script>

<style>
/* 所有控件 */
/* video::-webkit-media-controls-enclosure {
  display: none;
} */
/* 进度条 */
video::-webkit-media-controls-timeline {
  display: none;
}
video::-webkit-media-controls-current-time-display {
  display: none;
}
/* 音量按钮 */
/* video::-webkit-media-controls-mute-button {
  display: none;
}
video::-webkit-media-controls-toggle-closed-captions-button {
  display: none;
} */
/* 音量的控制条 */
video::-webkit-media-controls-volume-slider {
  display: none;
}
/*  播放按钮 */
video::-webkit-media-controls-play-button {
  display: none;
}
</style>
