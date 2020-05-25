<template>
  <div class="vod-container">
    <div style="width:500px;margin:0 auto;">
      <form ref="vcExample">
        <input
          type="file"
          style="display:none;"
          ref="vcExampleVideo"
          @change="setVcExampleVideoName()"
        />
        <input
          type="file"
          style="display:none;"
          ref="vcExampleCover"
          @change="setVcExampleCoverName()"
        />
      </form>
      <div class="row" style="padding:10px;">
        <h4>上传视频和封面</h4>
        <a
          href="javascript:void(0);"
          class="btn btn-default"
          @click="vcExampleAddVideo"
        >{{vcExampleVideoName || '添加视频'}}</a>
        <br />
        <br />
        <a
          href="javascript:void(0);"
          class="btn btn-default"
          @click="vcExampleAddCover"
        >{{vcExampleCoverName || '添加封面'}}</a>
      </div>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="视频标题">
          <el-input v-model="form.title" placeholder="请输入视频标题"></el-input>
        </el-form-item>
        <el-form-item label="视频描述">
          <el-input type="textarea" v-model="form.desc" placeholder="请输入视频描述"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <el-progress :percentage="percentageValue" :color="customColors"></el-progress>
    <br />
    <el-button size="small" type="primary" @click="uploadReal" :disabled="uploading">上传视频和封面</el-button>
    <el-button size="small" type="danger" @click="cancel" :disabled="!uploading">取消</el-button>
  </div>
</template>

<script>
import Api from "../../api";
import TcVod from "vod-js-sdk-v6";
export default {
  name: "vod",
  data() {
    return {
      sign: null,
      tcVod: null,
      uploader: null,
      percentageValue: 0,
      mediaFile: null,
      attachVideo: {},
      vcExampleVideoName: null,
      vcExampleCoverName: null,
      uploading: false,
      form: {},
      customColors: [
        { color: "#f56c6c", percentage: 20 },
        { color: "#e6a23c", percentage: 40 },
        { color: "#5cb87a", percentage: 60 },
        { color: "#1989fa", percentage: 80 },
        { color: "#6f7ad3", percentage: 100 }
      ]
    };
  },
  mounted() {
    Api.getVodSignature().then(r => {
      let sign = r.data.data;
      console.log(sign);
      this.sign = sign;
    });
  },
  watch: {
    percentageValue(v1, v2) {
      console.log(v1, v2);
    }
  },
  methods: {
    uploadVideo(event) {
      this.mediaFile = event.file;
      this.attachVideo.size = event.file.size;
      console.log(event);
    },
    getVodSignature() {
      return new Promise((resolve, reject) => {
        Api.getVodSignature()
          .then(r => {
            let sign = r.data.data;
            console.log(sign);
            this.sign = sign;
            resolve(true);
          })
          .catch(() => {
            reject(false);
          });
      });
    },
    uploadReal() {
      this.uploading = true;
      var mediaFile = this.$refs.vcExampleVideo.files[0];
      var coverFile = this.$refs.vcExampleCover.files[0];
      //await this.getVodSignature();

      this.tcVod = new TcVod({
        getSignature: () => this.sign
      });

      console.log(this.mediaFile);
      this.uploader = this.tcVod.upload({
        mediaFile: mediaFile,
        coverFile: coverFile
      });
      let t = this;
      this.uploader.on("media_progress", function(info) {
        let p = info.percent;
        t.percentageValue = p * 100;
      });
      this.uploader
        .done()
        .then(function(doneResult) {
          this.uploading = false;
          console.log(doneResult, "上传成功");
          let data = {
            fileId: doneResult.fileId,
            videoUrl: doneResult.video.url,
            coverUrl: doneResult.cover.url,
            name: this.form.title
          };
          Api.saveUploadVodInfo(data).then(r => {
            console.log(r, "保存成功");
          });
        })
        .catch(function(err) {
          console.log(err);
          this.uploading = false;
        });
    },
    cancel() {
      if (this.uploader != null) {
        this.uploader.cancel();
        this.uploading = false;
      }
    },
    vcExampleAddVideo() {
      this.$refs.vcExampleVideo.click();
    },
    vcExampleAddCover() {
      this.$refs.vcExampleCover.click();
    },
    setVcExampleVideoName() {
      this.vcExampleVideoName = this.$refs.vcExampleVideo.files[0].name;
    },
    setVcExampleCoverName() {
      this.vcExampleCoverName = this.$refs.vcExampleCover.files[0].name;
    }
  }
};
</script>

<style lang="less">
.vod-container {
  height: 520px;
  box-sizing: border-box;
  padding: 10px;
}
</style>