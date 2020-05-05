<template>
  <div style="height:500px;box-sizing: border-box;padding:15px">
    <el-row>
      <el-col :span="12">
        <SecurityItem :item="items[0]" :checked="checked[0]" @handleClick="handleEmailItemClick" />
      </el-col>
      <el-col :span="12">
        <SecurityItem :item="items[1]" :checked="checked[1]" @handleClick="handlePhoneItemClick" />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <SecurityItem :item="items[2]" :checked="checked[2]" @handleClick="handle2Click" />
      </el-col>
      <el-col :span="12"></el-col>
    </el-row>
    <el-dialog :title="'绑定' + this.editProp.desc" :visible.sync="dialogFormVisible" width="450px">
      <el-form :model="form" size="small" label-width="70px" :rules="rules" ref="ruleForm">
        <el-form-item :label="this.editProp.desc" prop="account">
          <el-input v-model="form.account" autocomplete="off">
            <el-button slot="append" @click="handleSendCode">{{this.buttonDesc}}</el-button>
          </el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input v-model="form.code" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogFormVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="handleEditConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Api from "../../api";
import SecurityItem from "../../components/SecurityItem";
export default {
  name: "security",
  components: {
    SecurityItem
  },
  data() {
    return {
      items: [
        {
          id: 1,
          icon: "el-icon-message",
          title: "我的邮箱",
          desc: "绑定邮箱可以接收通知"
        },
        {
          id: 2,
          icon: "el-icon-mobile-phone",
          title: "我的手机",
          desc: "绑定手机可以接收通知"
        },
        {
          id: 3,
          icon: "el-icon-postcard",
          title: "我的认证",
          desc: "认证后可以接收通知"
        }
      ],
      checked: [false, false, false],
      dialogFormVisible: false,
      form: {
        account: "",
        code: ""
      },
      buttonDesc: "发送验证码",
      rules: {
        account: [],
        code: [{ required: true, message: "请输入验证码", trigger: "change" }]
      },
      editProp: {
        name: "email",
        desc: "邮箱"
      }
    };
  },
  mounted() {
    Api.getSecurityInfo().then(res => {
      this.checked = res.data.data;
    });
  },
  methods: {
    handle2Click() {
      this.$router.push("/center/identify").catch(() => {});
    },
    handleEmailItemClick() {
      this.dialogFormVisible = true;
      (this.editProp = {
        name: "email",
        desc: "邮箱"
      }),
        (this.rules.account = [
          {
            type: "email",
            required: true,
            message: "请输入正确的邮箱",
            trigger: "change"
          }
        ]);
    },
    handlePhoneItemClick() {
      this.dialogFormVisible = true;
      (this.editProp = {
        name: "mobile",
        desc: "手机"
      }),
        (this.rules.account = [
          {
            type: "string",
            required: true,
            message: "请输入手机号",
            trigger: "change"
          },
          { len: 11, message: "请输入正确的手机号", trigger: "change" }
        ]);
    },
    handleEditConfirm() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          Api.bind(this.form).then(res => {
            this.$message({
              message: res.data.msg,
              type: "success"
            });
          });
          this.dialogFormVisible = false;
          this.form = {
            account: "",
            code: ""
          };
        } else {
          return false;
        }
      });
    },
    handleSendCode() {
      if (this.form.account == "") {
        return;
      }
      Api.sendCode(this.form.account).then(() => {});
      let time = 60;
      setInterval(() => {
        time = time - 1;
        this.buttonDesc = time + "s";
      }, 1000);
    }
  }
};
</script>

<style>
.icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-top: 50px;
}
.img-container {
  float: left;
  width: 150px;
  height: 100%;
  text-align: center;
  line-height: 200px;
  vertical-align: middle;
}
</style>