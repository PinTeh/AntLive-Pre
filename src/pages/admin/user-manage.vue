<template>
  <div class="user-manage-container">
    <div class="header-operator">
      <span>用户标识</span>
      <el-input
        placeholder="请输入ID"
        v-model="uid"
        style="width:200px"
        size="small"
        :clearable="true"
        @clear="handleInputClear"
      >
        <el-button slot="append" @click="handleSearchButton" icon="el-icon-search"></el-button>
      </el-input>
      <span>封禁状态</span>
      <el-select
        v-model="disabled"
        placeholder="封禁状态"
        size="small"
        @change="handleSelectChange"
        :clearable="true"
      >
        <el-option key="0" label="未封禁" value="0"></el-option>
        <el-option key="1" label="封禁中" value="1"></el-option>
      </el-select>
    </div>

    <el-table :data="tableData" style="width: 100%;">
      <!-- <el-table-column label type="index" show-overflow-tooltip width="50" align="center"></el-table-column> -->
      <el-table-column prop="id" label="标识" align="center"></el-table-column>
      <el-table-column prop="nickName" label="别称" align="center"></el-table-column>
      <el-table-column prop="mobile" label="手机" align="center"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180" align="center"></el-table-column>
      <el-table-column prop="sex" label="性别" align="center"></el-table-column>
      <el-table-column prop="isValidated" label="身份认证" align="center">
        <template slot-scope="scope">{{scope.row.isValidated===0 ? '未认证':'已认证'}}</template>
      </el-table-column>
      <el-table-column prop="disabled" label="封禁状态" align="center">
        <template slot-scope="scope">
          <el-switch
            :value="scope.row.disabled===1"
            @change="handleBlock(scope.row)"
            active-color="#ff4949"
            >
          </el-switch>
          <!-- <el-tag v-if="scope.row.disabled===0" type="success" size="mini" effect="plain">正常</el-tag>
          <el-tag v-else type="danger" effect="plain" size="mini">已封禁</el-tag> -->
        </template>
      </el-table-column>
      <!-- <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            @click="handleBlock(scope.row)"
            v-if="scope.row.disabled===0"
            type="danger"
            size="mini"
          >封禁</el-button>
          <el-button @click="handleBlock(scope.row)" v-else size="mini">解封</el-button>
        </template>
      </el-table-column> -->
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
  name: "user-manage",
  data() {
    return {
      tableData: [],
      currentPage: 1,
      limit: 10,
      total: 0,
      uid: null,
      disabled: null
    };
  },
  mounted() {
    this.page();
  },
  methods: {
    handleBlock(v) {
      let id = (v.id + "").split(",");
      if (v.disabled == 0) {
        Api.userBlock(id, "block").then(() => {
          this.page();
        });
      } else if (v.disabled == 1) {
        Api.userBlock(id, "unblock").then(() => {
          this.page();
        });
      }
    },
    handleInputClear() {
      this.page();
    },
    handleSearchButton() {
      this.page();
    },
    handleSelectChange() {
      this.page();
    },
    handleSizeChange(val) {
      this.limit = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.page();
    },
    page() {
      Api.adminGetUserList(
        this.currentPage,
        this.limit,
        this.uid,
        this.disabled
      ).then(res => {
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