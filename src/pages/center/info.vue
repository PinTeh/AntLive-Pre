<template>
  <div class="personal-info-container">
    <div class="person-info">
      <el-form ref="form" :model="form" label-position="top" size="small">
        <el-form-item label="昵称 ">
          <el-input v-model="form.nickName"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.email" disabled></el-input>
        </el-form-item>
        <el-form-item label="手机">
          <el-input v-model="form.mobile" disabled></el-input>
        </el-form-item>
        <el-form-item label="个性签名">
          <el-input type="textarea" v-model="form.signature"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSave" size="small"
            >保存</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div class="person-avatar">
      <el-upload
        class="avatar-uploader"
        :headers="headers"
        action="/api/api/v1/upload/avatar"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img
          v-if="form.avatar_preview"
          :src="form.avatar_preview"
          class="avatar-preview"
        />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </div>
  </div>
</template>

<script>
import Api from '../../api/user'
var token = localStorage.getItem('ANT-TOKEN')
export default {
  name: 'info',
  data() {
    return {
      form: {
        avatar_preview: '',
        avatar: '',
        nickName: '',
        email: '',
        mobile: '',
        signature: '',
      },
      headers: {
        Authorization: token,
      },
    }
  },
  methods: {
    onSave() {
      Api.updateUserInfo(this.form).then((res) => {
        if (res.data.code == 0) {
          this.$store.commit('setUserInfoUpdate', {
            nickName: this.form.nickName,
          })
          this.$message({
            message: '更新成功',
            type: 'success',
          })
        }
      })
    },
    handleAvatarSuccess(res, file) {
      this.form.avatar_preview = URL.createObjectURL(file.raw)
      this.form.avatar = res.data
      this.$store.commit('setUserInfoUpdate', {
        avatar: res.data,
      })
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
  },
  mounted() {
    let userInfo = this.$store.state.userInfo
    this.form.avatar_preview = userInfo.avatar
    this.form.avatar = userInfo.avatar
    this.form.nickName = userInfo.nickName
    this.form.email = userInfo.email
    this.form.moible = userInfo.moible
    this.form.signature = userInfo.signature
  },
}
</script>

<style lang="less">
.personal-info-container {
  display: flex;
  padding: 30px;
  .person-info {
    width: 400px;
    // border: 1px solid red;
  }
  .person-avatar {
    flex: 1;
    // border: 1px solid darkcyan;
  }
  .avatar-preview {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    display: block;
    object-fit: cover;
    border: 1px solid rgba(148, 148, 148, 0.5);
  }
  .avatar-uploader .el-upload {
    margin-left: 100px;
    margin-top: 30px;
    border: none;
  }
}
</style>
