<template>
  <div class="login_page">
    <transition name="form-fade" mode="in-out">
      <section class="form_contianer">
        <div class="titleArea rflex">
          <span class="title">
            Live
            <i>Register</i>
          </span>
        </div>
        <el-form :model="loginForm" :rules="rules" ref="loginForm" class="loginForm">
          <el-form-item prop="username" class="login-item">
            <el-input
              @keyup.enter.native="submitForm('loginForm')"
              class="area"
              type="text"
              placeholder="登录用户名"
              v-model="loginForm.username"
            ></el-input>
          </el-form-item>
          <el-form-item prop="nickName" class="login-item">
            <el-input
              @keyup.enter.native="submitForm('loginForm')"
              class="area"
              placeholder="别名"
              v-model="loginForm.nickName"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password" class="login-item">
            <span class="loginTips">
              <icon-svg icon-class="iconLock" />
            </span>
            <el-input
              @keyup.enter.native="submitForm('loginForm')"
              class="area"
              type="password"
              placeholder="密码"
              v-model="loginForm.password"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password" class="login-item">
            <el-input
              @keyup.enter.native="submitForm('loginForm')"
              class="area"
              type="password"
              placeholder="确认密码"
              v-model="loginForm.password_confirm"
            ></el-input>
          </el-form-item>
          <el-form-item id="code_item" prop="code" class="login-item">
            <el-row :gutter="10">
              <el-col :span="16">
                <el-input
                  @keyup.enter.native="submitForm('loginForm')"
                  class="area"
                  type="text"
                  placeholder="验证码"
                  v-model="loginForm.code"
                ></el-input>
              </el-col>
              <el-col :span="8">
                <el-button @click="handleGetCode">{{buttonDesc}}</el-button>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')" class="submit_btn">注册</el-button>
          </el-form-item>
          <div class="register">
            <router-link :to="{ path: '/login'}">登录已有账号</router-link>
          </div>
        </el-form>
      </section>
    </transition>
  </div>
</template>

<script>
import logoImg from "@/assets/logo.png";
import store from "../store";
export default {
  data() {
    return {
      logo: logoImg,
      loginForm: {
        username: "admin",
        password: "123123",
        password_confirm: "123123",
        code: "",
        nickName: "admin"
      },
      buttonDesc: "获取验证码",
      rules: {
        username: [{ required: true, message: "请输入登录用户名", trigger: "blur" },
                  { min: 5, max: 16, message: "长度在 5 到 16 个字符", trigger: "blur" }],
        nickName: [
          { required: true, message: "请输入别名", trigger: "blur" },
          { min: 5, max: 16, message: "长度在 5 到 16 个字符", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        password_confirm: [
          { required: true, message: "请输入确认密码", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {},
  methods: {
    loginByWechat() {},
    showMessage(type, message) {
      this.$message({
        type: type,
        message: message
      });
    },
    submitForm(loginForm) {
      this.$refs[loginForm].validate(valid => {
        if (valid) {
          let userinfo = this.loginForm;
          store.dispatch("register", userinfo)
          .then(res => {
            if (res.data.code == 0) {
              this.showMessage("success","注册成功")
              this.$router.push("/login")
            }
          });
        }
      });
    },
    handleRegister() {
      this.$router.push({
        path: "/register"
      });
    },
    handleGetCode() {
      let time = 60;
      setInterval(() => {
        time = time - 1;
        if(time == 0){
          return
        }
        this.buttonDesc = time + "s";
      }, 1000);
      store.dispatch("sendCode", this.loginForm.account);
    }
  }
};
</script>

<style lang="less" scoped>
#code_item{
  display: none;
}
.register {
  text-decoration: none;
  text-align: right;
  a {
    text-decoration: none;
    padding: 5px;
    color: #666666;
  }
  a:visited {
    color: #666666;
  }
}
.login_page {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url(../assets/img/login.svg) no-repeat center center;
  background-size: 100% 100%;
}
.form_contianer {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  //   background: #fff;
  width: 370px;
  border-radius: 5px;
  padding: 25px;
  text-align: center;
  .titleArea {
    justify-content: center;
    align-items: center;
    // text-transform: uppercase;
    font-size: 22px;
    width: 100%;
    padding-bottom: 20px;
    .logo {
      width: 40px;
      margin-right: 10px;
    }
    .title {
      i {
        color: #ff6c60;
        font-style: normal;
      }
    }
  }

  .loginForm {
    .submit_btn {
      width: 100%;
      padding: 13px 0;
      font-size: 16px;
    }
    .loginTips {
      position: absolute;
      left: 10px;
      z-index: 20;
      // color: #FF7C1A;
      font-size: 18px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
.manage_tip {
  margin-bottom: 20px;
  .title {
    font-family: cursive;
    font-weight: bold;
    font-size: 26px;
    color: #fff;
  }
  .logo {
    width: 60px;
    height: 60px;
  }
}

.tiparea {
  display: none;
  text-align: left;
  font-size: 12px;
  color: #0a0a0a;
  padding: 10px 0;
  .tip {
    margin-left: 54px;
  }
}

.form-fade-enter-active,
.form-fade-leave-active {
  transition: all 1s;
}
.form-fade-enter,
.form-fade-leave-active {
  transform: translate3d(0, -50px, 0);
  opacity: 0;
}
.loginForm {
  .el-button--primary {
    background-color: #ff7c1a;
    border: 1px solid #ff7c1a;
  }
}
.sanFangArea {
  border-top: 1px solid #dcdfe6;
  padding: 10px 0;
  display: none;
  .title {
    font-size: 14px;
    color: #8b9196;
    margin-bottom: 10px;
  }
  ul {
    li {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      .svg-icon {
        font-size: 24px;
      }
    }
  }
}
</style>