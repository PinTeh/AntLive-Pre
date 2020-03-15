<template>
  <div>
    <div v-if="unAuth" class="identify" style="height:500px;text-align:center;">
      <el-row style="margin-top:0px;">
        <el-col :span="8">
          <el-upload
            class="upload-demo"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或
              <em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">上传手持证件照</div>
          </el-upload>
        </el-col>
        <el-col :span="8">
          <el-upload
            class="upload-demo"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或
              <em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">上传证件正面照</div>
          </el-upload>
        </el-col>
        <el-col :span="8">
          <el-upload class="upload-demo" drag action="/posts/" multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或
              <em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">上传证件背面照</div>
          </el-upload>
        </el-col>
      </el-row>

      <el-form
        ref="form"
        :model="form"
        label-width="80px"
        style="width:400px;display:inline-block;margin-top:20px;"
      >
        <el-form-item label="姓名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="证件号码">
          <el-input v-model="form.no"></el-input>
        </el-form-item>
        <el-form-item></el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立马认证</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div v-else class="identify" style="height:500px;text-align:center;">
      您已认证成功
    </div>
  </div>
</template>

<script>
export default {
  name: "identify",
  data() {
    return {
      unAuth: true,
      form: {
        name: "",
        no: ""
      },
      rules: {
        name: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
        no: [{ required: true, message: "请输入活动名称", trigger: "blur" }]
      }
    };
  },
  methods: {
    onSubmit() {
        this.unAuth = false;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.unAuth = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style >
.identify .el-upload-dragger {
  width: 270px;
  height: 170px;
}
.upload-demo {
  margin-top: 30px;
}
</style>