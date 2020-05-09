<template>
  <el-card style="boder-box:box-sizing;">
    <div style="text-align:left;padding-bottom:10px;">
          <el-button @click="dialogFormVisible = true" size="small">新建</el-button>
          <el-button size="small" type="danger">删除</el-button>
        </div>
    <el-row :gutter="20">
      <el-col :span="16">
        
        <el-card>
          <div slot="header">
            <span>用户列表</span>
          </div>
          <el-table :data="tableData" style="width: 100%" @row-click="handleRowClick">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column type="index" label="序号" align="center"></el-table-column>
            <el-table-column prop="id" label="用户id"></el-table-column>
            <el-table-column prop="nickName" label="用户名"></el-table-column>
            <el-table-column prop="createTime" label="创建日期" width="160"></el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <div slot="header">
            <span>{{currentSelectUser==null ? '':currentSelectUser.nickName}}角色列表</span>
            <el-button
              style="float: right; padding: 0px;font-size:15px"
              type="text"
              @click="handleSave"
            >保存</el-button>
          </div>
          <el-tree :props="defaultProps" ref="tree" :data="treeData" show-checkbox node-key="id"></el-tree>
        </el-card>
      </el-col>
    </el-row>

    <el-dialog title="新建" :visible.sync="dialogFormVisible" width="600px">
      <el-form :model="form" size="small" label-width="100px">
        <el-form-item label="用户ID">
          <el-input v-model="form.uid" autocomplete="off"></el-input>
        </el-form-item>
        <el-tree
          :props="defaultProps"
          ref="formTree"
          :data="formTreeData"
          show-checkbox
          node-key="id"
        ></el-tree>
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
  name: "system-user-role",
  data() {
    return {
      tableData: [],
      treeData: [],
      formTreeData: [],
      selectData: [],
      selectRow: [],
      currentSelectUser: null,
      dialogFormVisible: false,
      form: {
        uid: ""
      },
      defaultProps: {
        children: "children",
        label: "name"
      }
    };
  },
  mounted() {
    this.getHasRoleUserList();
    this.getRoleList();
  },
  methods: {
    handleEditConfirm() {
      let data = {
        userId: this.form.uid,
        roleIds: this.$refs.formTree.getCheckedKeys()
      };
      this.updateUserRole(data);
      this.dialogFormVisible = false;
    },
    handleSave() {
      if (this.currentSelectUser == null) {
        return;
      }
      let data = {
        userId: this.currentSelectUser.id,
        roleIds: this.$refs.tree.getCheckedKeys()
      };
      this.updateUserRole(data);
    },
    handleRowClick(row) {
      this.getRoleListByUserId(row.id);
      this.currentSelectUser = row;
    },
    getRoleListByUserId(uid) {
      Api.getRoleListByUserId(uid).then(res => {
        this.$refs.tree.setCheckedNodes(res.data.data);
      });
    },
    getHasRoleUserList() {
      Api.getHasRoleUserList().then(res => {
        this.tableData = res.data.data;
      });
    },
    getRoleList() {
      Api.getRoleList().then(res => {
        this.treeData = res.data.data;
        this.formTreeData = res.data.data;
      });
    },
    updateUserRole(data) {
      Api.updateUserRole(data).then(res => {
        this.$message({
          message: res.data.msg,
          type: "success"
        });
        this.getHasRoleUserList();
      });
    }
  }
};
</script>

<style>
</style>