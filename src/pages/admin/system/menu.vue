<template>
  <el-card>
    <div style="text-align:left;padding-bottom:10px;">
      <el-button @click="handleShowDialog" size="small">新建</el-button>
    </div>
    <el-table
      :data="treeData"
      row-key="id"
      border
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="label" label="菜单名称" width="180"></el-table-column>
      <el-table-column label="图标" width="130">
        <template slot-scope="scope">
          <i :class="scope.row.icon"></i>
        </template>
      </el-table-column>
      <el-table-column prop="icon" label="菜单图标" width="180"></el-table-column>
      <el-table-column prop="path" label="路径"></el-table-column>
      <el-table-column label="是否显示" width="130">
        <template slot-scope="scope">
          <span>{{scope.row.hidden == 0 ? '是':'否'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="#" sortable width="70"></el-table-column>
      <el-table-column prop="sort" label="排序" width="70"></el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="handleEdit(scope.row)"></el-button>
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="this.op.title" :visible.sync="dialogFormVisible" width="600px">
      <el-form :model="form" size="small" label-width="100px">
        <el-form-item label="菜单名称">
          <el-input v-model="form.label" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="菜单图标">
          <el-input v-model="form.icon" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="菜单路径">
          <el-input v-model="form.path" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否显示">
          <el-radio-group v-model="form.hidden" style="float:left">
            <el-radio-button label="0">是</el-radio-button>
            <el-radio-button label="1">否</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="form.sort" type="number" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="父级#">
          <el-input v-model="form.pid" autocomplete="off"></el-input>
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
  name: "system-manage-menu",
  data() {
    return {
      treeData: [],
      dialogFormVisible: false,
      form: {},
      op: {
        title: "",
        tag: "save"
      }
    };
  },
  mounted() {
    this.getMenuTree();
  },
  methods: {
    getMenuTree() {
      Api.getMenuList().then(res => {
        this.treeData = res.data.data;
      });
    },
    handleEdit(row) {
      this.op = {
        title: "编辑",
        tag: "edit"
      };
      this.form = row;
      this.dialogFormVisible = true;
    },
    handleShowDialog() {
      this.op = {
        title: "新建",
        tag: "save"
      };
      this.form = {};
      this.dialogFormVisible = true;
    },
    handleEditConfirm() {
      if (this.op.tag == "save") {
        Api.saveMenu(this.form).then(res => {
          this.$message({
            message: res.data.msg,
            type: "success"
          });
          this.getMenuTree();
        });
      } else if (this.op.tag == "edit") {
        Api.updateMenu(this.form).then((res) => {
          this.$message({
            message: res.data.msg,
            type: "success"
          });
          this.getMenuTree();
        });
      }
      this.dialogFormVisible = false;
    },
    handleDelete(row) {
      console.log(row);
    }
  }
};
</script>

<style>
</style>