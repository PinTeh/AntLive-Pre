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
        <el-option key="0" label="等待认证" value="0"></el-option>
        <el-option key="2" label="智能审核通过" value="2"></el-option>
        <el-option key="1" label="认证通过" value="1"></el-option>
        <el-option key="3" label="认证失败" value="3"></el-option>
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
      <el-table-column prop="handUrl" label="手持证件照" align="center">
        <template slot-scope="scope">
          <el-image
            style="width: auto; height: 40px"
            :src="scope.row.handUrl"
            :preview-src-list="(scope.row.handUrl).split('_')"
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
      <el-table-column prop="status" label="当前状态" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.status===0">未认证</span>
          <span v-else-if="scope.row.status===1" style="color:#00ca00">认证通过</span>
          <span v-else-if="scope.row.status===2" style="color:#5a99f7">智能审核通过</span>
          <span v-else-if="scope.row.status===3" style="color:#ff6363">认证失败</span>
          <span v-else>未知</span>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="status" label="审批" align="center">
        <template slot-scope="scope">
          <el-switch :value="scope.row.status===1" @change="handlePass(scope.row)"></el-switch>
        </template>
      </el-table-column>-->
      <el-table-column prop="status" label="审批" align="center">
        <template slot-scope="scope">
          <el-popover placement="top" width="160" v-model="popoverVisible">
            <div style="text-align: center; margin: 0">
              <el-button size="mini" type="danger" @click="handlePass(scope.row,'reject')">拒绝</el-button>
              <el-button type="primary" size="mini" @click="handlePass(scope.row,'pass')">通过</el-button>
            </div>
            <el-button icon="el-icon-edit" type="mini" slot="reference"></el-button>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="70">
        <template slot-scope="scope">
          <el-popconfirm @onConfirm="handleDel(scope.row)" title="你确定要删除吗?">
            <el-button type="danger" size="mini" icon="el-icon-delete" slot="reference"></el-button>
          </el-popconfirm>
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
      authStatus: "",
      popoverVisible: false
    };
  },
  mounted() {
    this.page();
  },
  methods: {
    handlePass(v,type) {
      this.popoverVisible = false;
      console.log(v)
      let ids = (v.id + "").split(",");
      if (type == 'pass') {
        console.log("通过")
        Api.authPass(ids, "pass").then(() => {
          this.page();
        });
      } else if (type == 'reject') {
         console.log("失败")
        Api.authPass(ids, "reject").then(() => {
          this.page();
        });
      }
    },
    handleSelectChange() {
      this.page();
      console.log(this.authStatus);
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
      let ids = (row.id + "").split(",");
      Api.authDel(ids).then(res => {
        this.$message({
          message: res.data.msg,
          type: "success"
        });
        this.page();
      });
    },
    page() {
      Api.adminAuthInfoList(this.currentPage, this.limit, this.authStatus).then(
        res => {
          let ret = res.data.data;
          this.tableData = ret.records;
          this.total = ret.total;
        }
      );
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