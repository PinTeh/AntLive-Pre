<template>
  <div class="main-header">
    <div class="main-header-nav">
      <a class="nav-a" href="/" style="float:left;">首页</a>
      <a class="nav-a" href="#">登录</a>
      <a class="nav-a" href="#">注册</a>
      <a class="nav-a" href="#" @click="handleClick">测试</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "main-header",
  data() {
    return {
      activeIndex: "1"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClick() {
      this.$router.push({
        path: "/center"
      });
    }
  }
};
</script>

<style>
.main-header {
  background: rgb(255, 255, 255);
  height: 50px;
  /* position:fixed;
  top:0px; */
  text-align: center;
}
.main-header-nav {
  width: 70%;
  background: rgb(144, 144, 233);
  margin: 0 auto;
}
.nav-a {
  line-height: 50px;
  float: right;
  /* background: rgb(214, 124, 124); */
  margin: 0 5px 0 0;
  width: 60px;
  text-decoration: none;
  color: black;
}

.nav-a:hover {
  /* 主题颜色 */
  background: rgb(252, 70, 25);
  color: white;
}
</style>