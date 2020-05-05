<template>
  <el-card style="boder-box:box-sizing;">
    <el-row :gutter="20">
      <el-col :span="16">
        <div style="text-align:left;padding-bottom:10px;">
          <el-button plain @click="dialogFormVisible = true" size="small" type="primary">新建</el-button>
          <el-button plain size="small" type="danger">删除</el-button>
        </div>
        <el-card>
          <div slot="header">
            <span>角色列表</span>
          </div>
          <el-table :data="tableData" style="width: 100%" @row-click="handleRowClick">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column type="index" label="序号" align="center"></el-table-column>
            <el-table-column prop="name" label="名称"></el-table-column>
            <el-table-column prop="permission" label="角色权限"></el-table-column>
            <el-table-column prop="level" label="级别" width="100"></el-table-column>
            <el-table-column prop="createTime" label="创建日期" width="160"></el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <div slot="header">
            <span>{{currentSelectRole.name}}菜单列表</span>
            <el-button
              style="float: right; padding: 0px;font-size:15px"
              type="text"
              @click="handleSave"
            >保存</el-button>
          </div>
          <el-tree ref="tree" :data="treeData" show-checkbox node-key="id"></el-tree>
        </el-card>
      </el-col>
    </el-row>

    <el-dialog title="新建" :visible.sync="dialogFormVisible" width="600px">
      <el-form :model="form" size="small" label-width="100px">
        <el-form-item label="角色名称">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色权限">
          <el-input v-model="form.permission" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="级别">
          <el-input v-model="form.level" type="number" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogFormVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="handleEditConfirm">确 定</el-button>
      </div>
    </el-dialog>
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
      selectData: [],
      selectRow: [],
      currentSelectRole: "",
      dialogFormVisible: false,
      form: {
        name: "",
        permission: "",
        level: ""
      }
    };
  },
  mounted() {
    this.getRoleList();
    this.getMenuTree();
  },
  methods: {
    handleEditConfirm() {},
    handleSave() {
      if (this.currentSelectRole == "") {
        return;
      }
      let data = {
        roleId: this.currentSelectRole.id,
        menuIds: this.$refs.tree.getCheckedKeys()
      };
      Api.updateRoleMenu(data).then(() => {});
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
  }
};
</script>

<style>
</style>