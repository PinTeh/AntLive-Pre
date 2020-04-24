<template>
  <div class="user-manage-container">
        <div class="header-operator">
      <span>认证状态</span>
      <el-select
        v-model="authStatus"
        placeholder="认证状态"
        size="small"
        @change="handleSelectChange"
        :clearable="true"
      >
        <el-option key="0" label="未认证" value="0"></el-option>
        <el-option key="1" label="已认证" value="1"></el-option>
      </el-select>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <!-- <el-table-column label type="index" show-overflow-tooltip width="50" align="center"></el-table-column> -->
      <el-table-column prop="id" label="标识" width="80" align="center"></el-table-column>
      <el-table-column prop="userId" label="用户id" width="80" align="center"></el-table-column>
      <el-table-column prop="realName" label="真实姓名" width="100" align="center"></el-table-column>
      <el-table-column prop="positiveUrl" label="正面照" width="180" align="center">
        <template slot-scope="scope">
          <el-image
            style="width: auto; height: 40px"
            :src="scope.row.positiveUrl"
            :preview-src-list="(scope.row.positiveUrl).split('_')"
            fit="contain"
          >
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
        </template>
      </el-table-column>
      <el-table-column prop="reverseUrl" label="反面照" align="center">
        <template slot-scope="scope">
          <el-image
            style="width: auto; height: 40px"
            :src="scope.row.reverseUrl"
            :preview-src-list="(scope.row.reverseUrl).split('_')"
            fit="contain"
          >
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
        </template>
      </el-table-column>
      <el-table-column prop="cardNo" label="身份证号" width="180" align="center"></el-table-column>
      <el-table-column prop="createTime" label="申请时间" align="center" width="200"></el-table-column>
      <el-table-column prop="status" label="当前认证" align="center">
        <template slot-scope="scope">{{scope.row.status===0 ? '未认证':'已认证'}}</template>
      </el-table-column>
      <el-table-column label="操作" align="center" >
        <template slot-scope="scope">
          <el-button @click="handlePass(scope.row)" v-if="scope.row.status===0" type="success" size="mini">通过</el-button>
          <el-button @click="handlePass(scope.row)" v-else type="danger" size="mini">重置</el-button>
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
  name: "auth-manage",
  data() {
    return {
      total: 0,
      limit: 10,
      tableData: [],
      currentPage: 1,
      authStatus:''
    };
  },
  mounted() {
    this.page();
  },
  methods: {
    handlePass(v){
      let ids = (v.id + "").split(",");
      if (v.status == 0) {
        Api.authPass(ids, "pass").then(() => {
          this.page();
        });
      } else if (v.status == 1) {
        Api.authPass(ids, "reset").then(() => {
          this.page();
        });
      }
    },
    handleSelectChange() {
      this.page();
      console.log(this.authStatus)
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
      Api.adminAuthInfoList(this.currentPage, this.limit,this.authStatus).then(res => {
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
  .header-operator {
    text-align: left;
    padding: 10px 0px 5px 0px;
    height: 40px;
    background: rgba(255, 255, 255, 0.315);
    span {
      font-size: 13px;
      color: rgb(100, 100, 100);
      margin: 0px 5px 0px 20px;
    }
  }
}
</style>