<template>
  <div>
    <el-card
      v-if="this.$scopedSlots.content"
      :class="[this.select ? 'box-card-select':'',this.$scopedSlots.content?'box-card-self':'aa']"
      class="box-card"
    >
      <slot name="content"></slot>
    </el-card> 
       <!-- <el-card
      v-if="this.$scopedSlots.content"
      :class="[this.$scopedSlots.content?'box-card-self':'aa']"
      class="box-card"
    >
      <slot name="content"></slot>
    </el-card> -->

    <el-card v-else :class="this.select ? 'box-card-select':''" class="box-card">
      <span
        :class="this.select ? 'box-card-text-select':''"
        style="font-size:17px;margin:10px;display:block;"
      >{{this.num}} 开心果</span>
      <span :class="this.select ? 'box-card-text-select':''">￥{{this.num/10 }}.00</span>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "recharge-item",
  props: ["num", "select"]
};
</script>

<style>
.box-card {
  margin: 10px;
  width: 190px;
  height: 100px;
  text-align: center;
  float: left;
  cursor: pointer;
}
.box-card-self{
  width: 400px !important;
}
.box-card:hover {
  border: 1px solid rgb(39, 109, 214);
}

.box-card-text-select {
  color: rgb(39, 109, 214);
}
.el-card .box-card-select {
  border: 1px solid rgb(39, 109, 214);
}
</style>