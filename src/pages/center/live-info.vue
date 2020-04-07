<template>
  <div class="live-info-div">
    <el-form
      label-position="right"
      label-width="80px"
      :model="formLabelAlign"
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
          <el-option label="游戏" value="1"></el-option>
          <el-option label="颜值" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="直播封面">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="formData.cover" :src="formData.cover" class="cover" />
          <i v-else class="el-icon-plus avatar-uploader-icon" ></i>
        </el-upload>
      </el-form-item>
        <el-form-item>
    <el-button @click="onSubmit">保存</el-button>
  </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Api from '../../api'
export default {
  name: "live-info",
  data() {
    return {
      formData: {
        title: "",
        notice: "",
        type: "",
        cid: "",
        cover:""
      }
    };
  },
  mounted(){
      Api.getRoomSettingInfo().then(res=>{
          let ret = res.data.data;
          this.formData.title = ret.title;
          this.formData.notice = ret.notice;
          this.formData.cover = ret.cover;
          this.formData.cid = ret.categoryId;
      })
  },
  methods:{
      handleAvatarSuccess(res, file) {
        this.formData.cover = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      onSubmit() {
        
      }
  }
};
</script>

<style>
.live-info-div{
    height:480px;
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