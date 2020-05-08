<template>
  <div class="user-manage-container">
    <div style="text-align:left;padding-bottom:10px;">
      <el-button plain @click="handleShowDialog" size="small">新建</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="序号" type="index" width="50" align="center"></el-table-column>
      <!-- <el-table-column prop="id" label="标识" width="80" align="center"></el-table-column> -->
      <el-table-column prop="name" label="名称" align="center"></el-table-column>
      <el-table-column prop="icon" label="图片" align="center">
        <template slot-scope="scope">
          <el-image style="width: 30px; height: 30px" :src="scope.row.icon" fit="fit"></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="price" label="价格" sortable align="center"></el-table-column>
      <el-table-column prop="sort" label="排序" sortable align="center"></el-table-column>
      <el-table-column prop="disabled" label="禁用状态" align="center">
        <template slot-scope="scope"><span>{{scope.row.disabled == 0 ? '否':'是'}}</span></template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="200">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)" icon="el-icon-edit" type="primary"></el-button>
          <el-button size="mini" @click="handleDel(scope.row)" icon="el-icon-delete" type="danger"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="limit"
      layout="prev, pager, next, jumper"
      :total="total"
      style="margin-top:10px;"
    ></el-pagination>

    <el-dialog title="新建" :visible.sync="dialogFormVisible" width="600px">
      <el-form :model="form" size="small" label-width="100px">
        <el-form-item label="名称">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片">
          <el-input v-model="form.icon" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格(金豆)">
          <el-input v-model="form.price" type="number" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="form.sort" type="number" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="禁用状态">
          <el-radio-group v-model="form.disabled" style="float:left">
            <el-radio-button label="0">否</el-radio-button>
            <el-radio-button label="1">是</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogFormVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="handleEditConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Api from "../../api";
export default {
  name: "present-manage",
  data() {
    return {
      total: 0,
      limit: 10,
      tableData: [],
      currentPage: 1,
      form: {
        name: "",
        icon: "",
        price: "",
        sort: 0,
        disabled: 0
      },
      dialogFormVisible: false,
      op: {
        title: "",
        tag: "save"
      }
    };
  },
  mounted() {
    this.page();
  },
  methods: {
    handleEdit(row) {
      this.op = {
        title: "编辑",
        tag: "edit"
      };
      this.form = {
        id: row.id,
        name: row.name,
        price: row.price,
        sort: row.sort,
        disabled: row.disabled,
        icon: row.icon
      };
      this.dialogFormVisible = true;
    },
    handleEditConfirm() {
      if (this.op.tag == "save") {
        Api.savePresent(this.form).then(res => {
          this.$message({
            message: res.data.msg,
            type: "success"
          });
          this.page();
        });
      } else if (this.op.tag == "edit") {
        Api.editPresent(this.form).then(res => {
          this.$message({
            message: res.data.msg,
            type: "success"
          });
          this.page();
        });
      }
      this.dialogFormVisible = false;
    },
    handleSizeChange(val) {
      this.limit = val;
      this.page();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.page();
    },
    handleDel(row) {
      Api.removePresent(row.id).then(res => {
        this.$message({
          message: res.data.msg,
          type: "success"
        });
        this.page();
      });
    },
    handleShowDialog() {
      this.op = {
        title: "新建",
        tag: "save"
      };
      this.form = {
        name: "",
        icon: "",
        price: "",
        sort: 0,
        disabled: 0
      };
      this.dialogFormVisible = true;
    },
    page() {
      Api.adminPresentList(this.currentPage, this.limit).then(res => {
        let ret = res.data.data;
        this.tableData = ret.records;
        this.total = ret.total;
      });
    }
  }
};
</script>

<style lang="less">
.user-manage-container {
  background: #fff;
  padding: 20px;
}
</style>