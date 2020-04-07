<template>
  <div class="user-manage-container">
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
      <el-table-column prop="disabled" label="禁用状态" align="center"></el-table-column>
      <el-table-column label="操作" align="center" width="200">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
      currentPage: 1
    };
  },
  mounted() {
    this.page();
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleSizeChange(val) {
      this.limit = val;
      this.page();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.page();
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
}
</style>