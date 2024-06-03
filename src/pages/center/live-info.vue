<template>
  <div class="live-info-container">
    <div v-if="this.status === -1" class="no-auth-container">
      您还没有进行身份认证，请认证后再尝试~
    </div>
    <div v-else class="auth-container">
      <div class="live-info">
        <el-form label-position="top" :model="formData" size="small">
          <el-form-item label="标题">
            <el-input v-model="formData.title"></el-input>
          </el-form-item>
          <el-form-item label="公告">
            <el-input v-model="formData.notice"></el-input>
          </el-form-item>
          <el-form-item label="分类">
            <el-select
              v-model="formData.cid"
              placeholder="请选择分类"
              style="display:inline;"
            >
              <el-option
                v-for="item in this.category_list"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <div class="save-botton">
              <el-button size="small" type="primary" @click="onSubmit"
                >保存</el-button
              >
            </div>
          </el-form-item>
        </el-form>
      </div>
      <div class="live-room-cover">
        <span>直播间封面</span>
        <el-upload
          class="cover-uploader"
          :headers="headers"
          action="/api/api/v1/upload/room/cover"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img :src="formData.cover" class="cover-preview" />
        </el-upload>
      </div>
    </div>
  </div>
</template>

<script>
import RoomApi from '@/api/room'
import CategoryApi from '../../api/category'
var token = localStorage.getItem('ANT-TOKEN')
export default {
  name: 'live-info',
  data() {
    return {
      formData: {
        title: '',
        notice: '',
        cover: '',
        cid: '',
      },
      status: -1,
      limit: 20,
      current_page: 1,
      category_list: [],
      headers: {
        Authorization: token,
      },
    }
  },
  mounted() {
    // 获取直播分类数据
    CategoryApi.queryCategory({
      page: this.current_page,
      limit: this.limit,
    }).then((r) => {
      this.category_list = r.data.data.list
    })
    // 获取直播间基本信息
    this.getRoomInfo()
  },
  methods: {
    getRoomInfo() {
      RoomApi.getRoomSettingInfo().then((res) => {
        let { data } = res.data
        this.formData.title = data.title
        this.formData.notice = data.notice
        this.formData.cover = data.cover
        this.formData.cover_preview = data.cover
        this.formData.cid = data.categoryId
        this.status = data.status
      })
    },
    handleAvatarSuccess(res, file) {
      const { code, data } = res
      if (code === 0) {
        this.formData.cover_preview = URL.createObjectURL(file.raw)
        this.formData.cover = data
      }
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
    onSubmit() {
      // 保存直播间信息
      RoomApi.saveRoomInfo(this.formData).then((r) => {
        if (r.data.code == 0) {
          this.$message({
            message: '保存成功',
            type: 'success',
          })
        }
      })
    },
  },
}
</script>

<style lang="less">
.live-info-container {
  padding-top: 30px;
  .no-auth-container {
    height: 500px;
    line-height: 500px;
    font-size: 13px;
    color: #666;
    text-align: center;
  }
  .auth-container {
    display: flex;
    flex-direction: row;
    .live-info {
      margin-left: 30px;
      width: 400px;
    }
    .live-room-cover {
      flex: 1;
      span {
        color: #666;
        font-size: 14px;
        position: relative;
        top: 12px;
        left: 100px;
      }
      .cover-uploader {
        // border: 1px solid red;
        margin: 30px 100px;
        height: 170px;
        width: 250px;
      }
      .cover-preview {
        height: 170px;
        width: 250px;
        object-fit: cover;
        border: 1px solid rgb(#d8d8d8);
        border-radius: 3px;
      }
      .cover-preview:hover {
        box-shadow: 0 0px 2px 2px #d1d1d1d1;
        transition: all 0.6s;
      }
    }
  }
}
</style>
