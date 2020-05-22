<template>
  <div class="snapshot-templates" v-loading="loading">
    <div style="height:40px;padding-bottom:10px;">
      <el-button @click="handleNew" size="small">新建</el-button>
    </div>
    <div class="templates-container">
      <el-row>
        <el-col :span="8">
          <el-table :data="tableData" style="width: 100%" @row-click="handleRowClick" border>
            <!-- <el-table-column prop="templateId" label="模板ID"></el-table-column>
            <el-table-column prop="snapshotInterval" label="截图间隔"></el-table-column>-->
            <el-table-column prop="templateName" label="模板名称"></el-table-column>
            <!-- <el-table-column prop="description" label="模板描述"></el-table-column> -->
            <!-- <el-table-column prop="pornFlag" label="是否开启鉴黄"></el-table-column> -->
          </el-table>
        </el-col>
        <el-col :span="16">
          <el-form ref="form" :model="form" label-width="100px" size="small" >
            <el-form-item label="模板名称">
              <el-input v-model="form.templateName"></el-input>
            </el-form-item>
            <el-form-item label="模板描述">
              <el-input v-model="form.description"></el-input>
            </el-form-item>
            <el-form-item label="截图间隔">
              <el-input v-model="form.snapshotInterval"></el-input>
            </el-form-item>
            <el-form-item label="开启鉴黄">
              <el-switch :active-value="1" :inactive-value="0" v-model="form.pornFlag"></el-switch>
            </el-form-item>
              <el-form-item>
            <el-button type="primary" @click="onSubmit">保存</el-button>
          </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <!-- <div class="templates">
        
      </div>
      <div class="template-setting">
       
      </div>-->
    </div>
  </div>
</template>

<script>
import Api from "../../api";
export default {
  name: "audit-templates",
  data() {
    return {
      tableData: [],
      form: {},
      currentSelectRow:{},
      loading:true
    };
  },
  mounted() {
    Api.getSnapshotTempaltes().then(r => {
      this.loading = false;
      let d = r.data.data;
      if (d != null) {
        this.tableData = d.templates;
        if(d.templates != null){
          this.form = d.templates[0];
        }
      }
    });
  },
  methods: {
    handleRowClick(row) {
      this.currentSelectRow = row;
      this.form = row;
    },
    onSubmit(){
      Api.updateSnapshotTemplate(this.form).then(r=>{
        console.log(r)
      })
    },
    handleNew(){

    }
  }
};
</script>

<style lang="less">
.snapshot-templates {
  padding: 20px;
  background: #fff;
  text-align: left;
  .templates {
    width: 300px;
    display: inline-block;
  }
  .template-setting {
    display: block;
  }
}
</style>