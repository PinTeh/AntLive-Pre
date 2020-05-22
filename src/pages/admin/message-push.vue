<template>
  <div class="message-container">
    <el-card shadow="never">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card style="height:400px">
            <div slot="header">
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
                <el-checkbox-group v-model="form.listenerItems">
                  <el-checkbox-button label="salacity-notice" name="type">鉴黄通知</el-checkbox-button>
                  <el-checkbox-button label="system-exception-notice" name="type">系统异常通知</el-checkbox-button>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="开启">
                <el-switch :value="form.open == 1" @click.native="handleSwitch"></el-switch>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">保存</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card style="height:400px">
            <div slot="header">
              <span style="color:#666;font-size:14px">推送日志</span>
            </div>
            <el-table :data="tableData" style="width: 100%" size="mini">
              <el-table-column prop="createTime" label="日期" width="180"></el-table-column>
              <el-table-column prop="content" label="内容"></el-table-column>
              <el-table-column prop="status" label="状态">
                <template slot-scope="scope">
                  <span>{{scope.row.status == 0 ? '处理中':'已完成'}}</span>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import Api from "../../api";
export default {
  name: "message-push",
  data() {
    return {
      form: {
        id: null,
        email: null,
        mobile: null,
        open: 1,
        listenerItems: []
      },
      tableData: []
    };
  },
  methods: {
    onSubmit() {
      let data = {
        id: this.form.id,
        email: this.form.email,
        mobile: this.form.mobile,
        open: this.form.open,
        listenerItems: this.form.listenerItems + ""
      };
      Api.updateSystemPushInfo(data).then(res => {
        this.$message({
          message: res.data.msg,
          type: "success"
        });
      });
    },
    handleSwitch() {
      if (this.form.open == 0) {
        this.form.open = 1;
      } else {
        this.form.open = 0;
      }
    },
    listLog(sysPushId) {
      Api.getSystemPushLog(sysPushId).then(res => {
        this.tableData = res.data.data;
      });
    }
  },
  mounted() {
    Api.getSystemPushInfo()
      .then(res => {
        if (res.data.data != null) {
          this.form = res.data.data;
          this.form.listenerItems = this.form.listenerItems.split(",");
          this.listLog(this.form.id);
        }
      })
      .catch(() => {});
  },
  computed: {
    opened: () => {
      return true;
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