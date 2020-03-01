<template>
  <div style="height:200px;width:100%;text-align:left;">
    <div class="img-container">
      <i class="auth-icon" :class="this.item.icon"></i>
    </div>
    <div style="float:left;margin-top:30px;">
      <p style="font-size:18px;">{{this.item.title}}</p>
      <p>{{this.item.desc}}</p>
      <el-button :disabled="checked"  size="mini">{{!checked?'去完善':'已认证'}}</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "security-item",
  props:["item","checked"]
};
</script>

<style>
.auth-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-top: 50px;
  font-size: 50px;
  color:rgb(112, 112, 112);
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