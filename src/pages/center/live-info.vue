<template>
  <div class="live-info-div">

    <div v-if="this.status == -1" class="no-auth-container">
        您还没有进行身份认证，请认证后再尝试~
    </div>
    <el-form
      v-else
      label-position="right"
      label-width="80px"
      :model="formData"
      style="width:400px;margin-top:20px;margin-left:50px;"
    >
      <el-form-item label="标题">
        <el-input v-model="formData.title"></el-input>
      </el-form-item>
      <el-form-item label="公告">
        <el-input v-model="formData.notice"></el-input>
      </el-form-item>
      <el-form-item label="分类">
        <el-select v-model="formData.cid" placeholder="请选择分类" style="display:inline;">
          <!-- <el-option label="游戏" value="1"></el-option> -->
          <el-option
            v-for="item in this.category_list"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <div class="save_botton">
            <el-button size="small" type="primary" @click="onSubmit">保存</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Api from "../../api";
export default {
  name: "live-info",
  data() {
    return {
      formData: {
        title: "",
        notice: "",
        cid: "",
        cover: "",
        cover_preview: ""
      },
      status: -1,
      limit: 20,
      current_page: 1,
      category_list: []
    };
  },
  mounted() {
    Api.getCategory(this.current_page, this.limit).then(r => {
      this.category_list = r.data.data.list;
    });
    Api.getRoomSettingInfo().then(res => {
      let ret = res.data.data;
      this.formData.title = ret.title;
      this.formData.notice = ret.notice;
      this.formData.cover = ret.cover;
      this.formData.cover_preview = ret.cover;
      this.formData.cid = ret.categoryId;
      this.status = ret.status;
    });
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.formData.cover_preview = URL.createObjectURL(file.raw);
      this.formData.cover = res.data;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    onSubmit() {
      Api.saveRoomInfo(this.formData).then(r => {
        if (r.data.code == 0) {
          this.$message({
            message: "保存完成",
            type: "success"
          });
        }
      });
    }
  }
};
</script>

<style lang="less">
.save_botton{
  text-align: left;
}
.live-info-div {
  padding-top: 30px;
  height: 500px;
  .no-auth-container{
    height:500px;
    line-height: 500px;
    font-size: 13px;
    color:#666;
  }
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  float: left;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 258px;
  height: 158px;
  line-height: 158px;
  text-align: center;
}
.live-info-div .cover {
  width: 258px;
  height: 158px;
  display: block;
}

</style>