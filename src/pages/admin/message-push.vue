<template>
  <div class="message-container">
    <el-card shadow="never">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card style="height:400px">
            <div slot="header" >
              <span style="color:#666;font-size:14px">推送配置</span>
            </div>
            <el-alert style="margin:10px;" title="Tips: 邮箱、手机未空时不会进行推送~" type="info"></el-alert>
            <el-form ref="form" :model="form" label-width="60px" size="mini">
              <el-form-item label="邮箱">
                <el-input v-model="form.email"></el-input>
              </el-form-item>
              <el-form-item label="手机">
                <el-input v-model="form.mobile"></el-input>
              </el-form-item>
              <el-form-item label="监听">
                <el-checkbox-group v-model="form.type">
                  <el-checkbox-button label="鉴黄通知" name="type"></el-checkbox-button>
                  <el-checkbox-button label="系统异常通知" disabled name="type"></el-checkbox-button>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="开启">
                <el-switch v-model="form.open"></el-switch>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">保存</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card style="height:400px">
            <div slot="header" >
              <span style="color:#666;font-size:14px">推送历史</span>
            </div>
            <el-table :data="tableData" style="width: 100%" size="mini">
              <el-table-column prop="date" label="日期" width="180"></el-table-column>
              <el-table-column prop="name" label="姓名" ></el-table-column>
              <el-table-column prop="address" label="地址"></el-table-column>
            </el-table>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "message-push",
  data() {
    return {
      form: {
        email: "794409767@qq.com",
        mobile: "1877839999",
        open: false,
        type: []
      },
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  methods: {
    onSubmit() {
      console.log(this.form);
    }
  }
};
</script>

<style>
.message-container {
  text-align: left;
}
.-top {
  overflow: inherit;
  z-index: 100;
  float: left;
  position: absolute;
  margin: -15px 0px 0px 20px;
}
.image {
  width: 100%;
  display: block;
}
</style>