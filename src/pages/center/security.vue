<template>
  <div style="height:500px">
    <el-row>
      <el-col :span="12">
        <SecurityItem />
      </el-col>
      <el-col :span="12">
        <SecurityItem />
      </el-col>
    </el-row>
        <el-row>
      <el-col :span="12">
        <SecurityItem />
      </el-col>
      <el-col :span="12">
      </el-col>
    </el-row>
  </div>
</template>

<script>
import SecurityItem from "../../components/SecurityItem";
export default {
  name: "security",
  components: {
    SecurityItem
  },
  data() {
    return {
      url: "http://image.imhtb.cn/avatar.png"
    };
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