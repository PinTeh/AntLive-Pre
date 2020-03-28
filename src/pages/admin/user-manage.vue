<template>
  <div class="user-manage-container">
    <el-table :data="tableData" style="width: 100%">
      <!-- <el-table-column label type="index" show-overflow-tooltip width="50" align="center"></el-table-column> -->
      <el-table-column prop="id" label="标识" align="center"></el-table-column>
      <el-table-column prop="nickName" label="别称" align="center"></el-table-column>
      <el-table-column prop="mobile" label="手机" align="center"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180" align="center"></el-table-column>
      <el-table-column prop="sex" label="性别" align="center"></el-table-column>
      <el-table-column prop="isValidated" label="身份认证" align="center">
        <template slot-scope="scope">{{scope.row.isValidated===0 ? '未认证':'已认证'}}</template>
      </el-table-column>
      <el-table-column prop="disabled" label="状态" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.disabled===0" type="success" size="mini" effect="plain">可用</el-tag>
          <el-tag v-else type="success" effect="plain" size="mini">已封禁</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <el-button type="danger" size="mini">封禁</el-button>
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
import Api from '../../api'
export default {
  name: "user-manage",
  data() {
    return {
      tableData: [
        {
          id: "10086",
          nickName: "PinTah",
          mobile: "3478919234",
          email: "794409767@qq.com",
          sex: "男",
          isValidated: 1,
          disabled: 0
        }
      ],
      currentPage: 1,
      limit:10,
      total:0,
    };
  },
  mounted(){
    this.page()
  },
  methods: {
    handleSizeChange(val) {
      this.limit = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.page()
    },
    page(){
      Api.adminGetUserList(this.currentPage,this.limit).then(res => {
      let ret = res.data.data;
      this.tableData = ret.records;
      this.total = ret.total;
    })
    }
  }
};
</script>

<style lang="less">
.user-manage-container {
  background: #fff;
}
</style>