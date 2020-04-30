<template>
  <el-card style="boder-box:box-sizing;">
    <el-row :gutter="20">
      <el-col :span="16">
        <el-card >
          <div slot="header">
            <span>角色列表</span>
          </div>
          <el-table :data="tableData" style="width: 100%" @row-click="handleRowClick">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column type="index" label="序号" align="center"></el-table-column>
            <el-table-column prop="name" label="名称"></el-table-column>
            <el-table-column prop="permission" label="权限"></el-table-column>
            <el-table-column prop="level" label="级别" width="100"></el-table-column>
            <el-table-column prop="createTime" label="创建日期" width="160"></el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <div slot="header">
            <span>{{currentSelectRole.name}}菜单列表</span>
              <el-button style="float: right; padding: 0px;font-size:15px" type="text" @click="handleSave">保存</el-button>
          </div>
          <el-tree ref="tree" :data="treeData" show-checkbox node-key="id"></el-tree>
        </el-card>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import Api from "../../../api";
export default {
  name: "system-manage-role",
  data() {
    return {
      tableData: [],
      treeData: [],
      selectData:[],
      selectRow:[],
      currentSelectRole:''
    };
  },
  mounted() {
    this.getRoleList();
    this.getMenuTree();
  },
  methods: {
    handleSave(){
      if(this.currentSelectRole==''){
        return;
      }
      let data = {
        roleId:this.currentSelectRole.id,
        menuIds:this.$refs.tree.getCheckedKeys()
      }
      Api.updateRoleMenu(data).then(()=>{

      })

    },
    handleRowClick(row) {
      this.getMenuTreeByRole(row.id);
      this.currentSelectRole = row;
    },
    getMenuTreeByRole(rid) {
      Api.getMenuListByRole(rid).then(res => {
        this.$refs.tree.setCheckedNodes(res.data.data);
      });
    },
    getMenuTree() {
      Api.getMenuList().then(res => {
        this.treeData = res.data.data;
      });
    },
    getRoleList() {
      Api.getRoleList().then(res => {
        this.tableData = res.data.data;
      });
    }
  },
};
</script>

<style>
</style>