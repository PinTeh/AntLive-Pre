<template>
  <div class="personal-info-container" style="height:500px;box-sizing: border-box;padding:25px;text-align:left;">
    <div style="width:500px;">
      <el-form ref="form" :model="form" label-width="80px">
           <el-form-item label="头像">
               <el-upload
                class="avatar-uploader"
                action="http://119.23.255.187:9000/upload"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="form.avatar_preview" :src="form.avatar_preview" class="avatar-preview">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
        </el-form-item>
        <el-form-item label="别称">
          <el-input v-model="form.nickName"></el-input>
        </el-form-item>
          <el-form-item label="邮箱">
            <el-input  v-model="form.email" disabled></el-input>
        </el-form-item>
        <el-form-item label="手机">
            <el-input v-model="form.mobile" disabled></el-input>
        </el-form-item>
        <el-form-item label="个性签名">
            <el-input type="textarea" v-model="form.signature"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSave" size="small">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Api from '../../api'
export default {
  name: "info",
  data() {
    return {
      form: {
          avatar_preview:'',
          avatar:'',
          nickName:'',
          email:'',
          mobile:'',
          signature:''
      }
    };
  },
  methods: {
    onSave() {
      Api.updateUserInfo(this.form).then(res=>{
          if (res.data.code == 0) {
          this.$message({
            message: res.data.msg,
            type: "success"
          });
        }
      })
    },
    handleAvatarSuccess(res, file) {
      this.form.avatar_preview = URL.createObjectURL(file.raw);
      this.form.avatar = res.data;
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
  },
  mounted(){
      let userInfo = this.$store.state.userInfo;
      this.form.avatar_preview = userInfo.avatar;
      this.form.avatar = userInfo.avatar;
      this.form.nickName = userInfo.nickName;
      this.form.email = userInfo.email;
      this.form.moible = userInfo.moible;
      this.form.signature = userInfo.signature;
  }
};
</script>

<style lang="less">
.personal-info-container{
    .avatar-preview{
        width: 100px;
        height: 100px;
        border-radius: 50%;
        display: block;
    }
    .avatar-uploader .el-upload{
        border: none;
    }
}
</style>