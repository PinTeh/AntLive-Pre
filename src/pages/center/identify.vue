<template>
  <div>
    <div style="padding:10px">
          <el-alert v-if="reject.tag" :title="'上次审核失败原因：' + reject.reason" type="error"></el-alert>
    </div>
    <el-steps :active="active + 1" finish-status="success" simple style="margin-top: 10px">
      <el-step title="填写认证信息" icon="el-icon-edit"></el-step>
      <el-step title="等待官方认证" icon="el-icon-upload"></el-step>
      <el-step title="认证成功" icon="el-icon-success"></el-step>
    </el-steps>
    <div class="identify" style="height:445px;text-align:center;" v-loading="loading">
      <div v-if="active==-1">
        <el-row style="margin-top:0px;">
          <el-col :span="8">
            <el-upload
              class="upload-demo"
              drag
              :action="uploadAction + '?tag=foo'"
              :on-success="onSuccess"
              :on-error="onError"
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
              :action="uploadAction + '?tag=pos'"
              :on-success="onSuccess"
              :on-error="onError"
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
            <el-upload
              class="upload-demo"
              drag
              :action="uploadAction + '?tag=rev'"
              :on-success="onSuccess"
              :on-error="onError"
            >
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
            <el-input v-model="form.realName"></el-input>
          </el-form-item>
          <el-form-item label="证件号码">
            <el-input v-model="form.cardNo"></el-input>
          </el-form-item>
          <el-form-item></el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm">立马认证</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div
        v-else-if="active==0"
        class="identify"
        style="height:445px;text-align:center;font-size:17px;color:#3f74a8"
      >
        <span style="line-height:400px">
          <i class="el-icon-help" style="margin-right:10px"></i>正在认证中
        </span>
      </div>
      <div
        v-else-if="active==1"
        class="identify"
        style="height:445px;text-align:center;font-size:17px;color:#139715"
      >
        <span style="line-height:400px">
          <i class="el-icon-help" style="margin-right:10px"></i>您已成功认证
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import Api from "../../api";
export default {
  name: "identify",
  data() {
    return {
      unAuth: true,
      loading: false,
      form: {
        realName: "",
        cardNo: "",
        handUrl: "",
        positiveUrl: "",
        reverseUrl: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入真实名字", trigger: "blur" },
          { min: 1, max: 5, message: "长度在 1 到 5 个字符", trigger: "change" }
        ],
        no: [
          { required: true, message: "请输入身份证号", trigger: "blur" },
          { len: 18, message: "请输入合法的身份证号", trigger: "change" }
        ]
      },
      uploadAction: "http://119.23.255.187:9000/upload",
      active: 1,
      reject: {
        tag: false,
        reason: ""
      }
    };
  },
  mounted() {
    Api.getAuthInfo().then(res => {
      let ret = res.data.data;
      if (ret == null) {
        this.active = -1;
      } else {
        if (ret.status == 3) {
          this.active = -1;
          this.reject = {
            tag: true,
            reason: ret.rejectReason
          };
        } else {
          this.active = ret.status;
        }
      }
    });
  },
  methods: {
    onSuccess(response, file, fileList) {
      if (response.code == 0) {
        switch (response.msg) {
          case "foo":
            this.form.handUrl = response.data;
            break;
          case "pos":
            this.form.positiveUrl = response.data;
            break;
          case "rev":
            this.form.reverseUrl = response.data;
            break;
          default:
            break;
        }
      }
      console.log(response, file, fileList);
    },
    onError(err) {
      console.log(err);
    },
    onSubmit() {
      this.unAuth = false;
    },
    submitForm() {
      this.loading = true;
      Api.auth(this.form).then(res => {
        this.loading = false;
        this.$message({
          message: res.data.msg,
          type: "success"
        });
        this.active = 0;
      });
    }
  }
};
</script>

<style >
.identify .el-upload-dragger {
  width: 260px;
  height: 150px;
}
.upload-demo {
  margin-top: 30px;
}
</style>