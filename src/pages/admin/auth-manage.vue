<template>
  <div class="user-manage-container">
    <el-table :data="tableData" style="width: 100%">
      <!-- <el-table-column label type="index" show-overflow-tooltip width="50" align="center"></el-table-column> -->
      <el-table-column prop="id" label="标识" width="80" align="center"></el-table-column>
      <el-table-column prop="userId" label="用户id" width="80" align="center"></el-table-column>
      <el-table-column prop="realName" label="真实姓名" width="100" align="center"></el-table-column>
      <el-table-column prop="positiveUrl" label="正面照" width="180" align="center"></el-table-column>
      <el-table-column prop="reverseUrl" label="反面照" align="center"></el-table-column>
      <el-table-column prop="cardNo" label="身份证号" width="180" align="center"></el-table-column>
      <el-table-column prop="createTime" label="申请时间"  align="center"></el-table-column>
      <el-table-column prop="status" label="当前认证" align="center">
        <template slot-scope="scope">{{scope.row.status===0 ? '未认证':'已认证'}}</template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="200">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status===0" type="success" size="mini">通过</el-button>
          <el-button v-else type="danger" size="mini">重置</el-button>
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
import Api from '../../api'
export default {
  name: "auth-manage",
  data() {
    return {
      total:0,
      limit:10,
      tableData: [
        {
          id: 1,
          userId: 1,
          realName: "静态数据",
          positiveUrl: "正面地址",
          reverseUrl: "http://www.baidu.com",
          cardNo: "450702200201272523",
          status: 0,
          createTime: "",
          updateTime: ""
        }
      ],
      currentPage: 1
    };
  },
  mounted(){
    this.page();
  },
  methods: {
    handleSizeChange(val) {
      this.limit = val;
      this.page()
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.page()
    },
    page() {
      Api.adminAuthInfoList(this.currentPage, this.limit).then(res => {
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
    padding:20px;

}
</style>