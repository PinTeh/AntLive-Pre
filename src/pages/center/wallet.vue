<template>
  <div style="height:500px;text-align:left;padding:10px 20px 0 20px;">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="账户余额" name="first">
        <div style="height:100px;width:100%;">
          <span>账户余额</span>
          <h1>30</h1>
        </div>
      </el-tab-pane>
      <el-tab-pane label="账户充值" name="second">账户充值</el-tab-pane>
      <el-tab-pane label="消费记录" name="third">消费记录</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "wallet",
   data() {
      return {
        activeName: 'first'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
};
</script>

<style>
</style>