<template>
  <div class="login_page">
    <transition name="form-fade" mode="in-out">
      <section class="form_contianer">
        <div class="titleArea rflex" @click="handleToHome">
          <!-- <img class="logo" :src="logo" alt="AntLive" /> -->
          <div id="login_title">
            <span class="title">
            Ant<i>Live</i>
          </span>
          </div>
         
        </div>
        <el-form :model="loginForm" :rules="rules" ref="loginForm" class="loginForm">
          <el-form-item prop="username" class="login-item">
            <!-- <span class="loginTips">
              <icon-svg icon-class="iconuser" />
            </span> -->
            <el-input
              @keyup.enter.native="submitForm('loginForm')"
              class="area"
              type="text"
              placeholder="用户名"
              v-model="loginForm.username"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password" class="login-item">
            <!-- <span class="loginTips">
              <icon-svg icon-class="iconLock" />
            </span> -->
            <el-input
              @keyup.enter.native="submitForm('loginForm')"
              class="area"
              type="password"
              placeholder="密码"
              v-model="loginForm.password"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')" class="submit_btn">登录</el-button>
          </el-form-item>
          <div class="register">
            <router-link :to="{ path: '/register'}">注册用户</router-link>
          </div>
          <div class="tiparea">
            <p class="wxtip">温馨提示：</p>
            <p class="tip">
              用户名为：admin/editor
              <span>(可用于切换权限)</span>
            </p>
            <p class="tip">密码为：123456</p>
          </div>
          <div class="sanFangArea">
            <p class="title">第三方账号登录</p>
            <ul class="rflex">
              <!-- <li @click="loginByWechat">
                <icon-svg icon-class="iconwechat" />
              </li>
              <li>
                <icon-svg icon-class="iconweibo" />
              </li>
              <li>
                <icon-svg icon-class="iconGithub" />
              </li> -->
            </ul>
          </div>
        </el-form>
      </section>
    </transition>
    <div class="bottom-div">
      <p>Copyright 2020 PinTeh</p>
    </div>
  </div>
</template>

<script>
import store from "../store";
import logoImg from "@/assets/logo.png";
export default {
  name:'login',
  data() {
    return {
      logo: logoImg,
      loginForm: {
        username: "admin",
        password: "123123"
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
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
          store
            .dispatch("login", userinfo)
            .then((res) => {
              if(res.data.code == 0){
                this.$router.push("/")
                this.showMessage("success", "欢迎回来，" + this.$store.state.userInfo.nickName+ " ～")
              }
            });
        } else {
          return false;
        }
      });
    },
    handleRegister() {
      this.$router.push({
        path: "/register"
      });
    },
    handleToHome() {
      this.$router.push({
        path: "/"
      });
    }
  }
};
</script>

<style lang="less" scoped>
.bottom-div {
  text-align: center;
  height: 20px;
  width: 100%;
  bottom: 30px;
  position: absolute;
  p {
    font-size: 14px;
    color: #7e7e7e;
  }
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
  // background: url(../assets/img/login.svg) no-repeat center center;
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
#login_title{
  cursor: pointer;
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