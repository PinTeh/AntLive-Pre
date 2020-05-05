<template>
  <div style="height:auto;text-align:left;boder-box:box-sizing;">
    <el-tabs v-model="activeName" style="margin:0px 20px 0 20px;" @tab-click="handleTabsClick">
      <el-tab-pane label="账户余额" name="first">
        <div style="width:100%;padding:10px;margin-bottom:30px;">
          <span>开心果余额</span>
          <br />
          <div class="wallent-div">
            <i class="wallent-icon"></i>
            <span class="wallet-balance">{{(balance)}}</span>
          </div>

          <div class="wallent-tips-div">
            <p>开心果有什么用？</p>
            <p>开心果是AntLive世界中非常重要的物品</p>
            <ul>
              <li>开心果用于对优秀的主播进行打赏支持，这是对主播的一种肯定</li>
            </ul>
            <p>如何获得开心果？</p>
            <ul>
              <li>
                充钱
                <a href="#" @click="handleToRecharge">立即充值</a>
              </li>
            </ul>
            <p>如何将开心果提现？</p>
            <ul>
              <li>
                提现
                <a href="#" @click="handleToWithdrawal">去提现</a>
              </li>
            </ul>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="账户充值" name="second" style="text-align:center;">
        <div style="height:280px;width:850px;">
          <RechargeItem
            v-for="item in rechargeData"
            :key="item.index"
            @click.native="handleItemSelect(item.index,item.num)"
            :num="item.num"
            :select="checkIndex==item.index?true:false"
          />
          <RechargeItem @click.native="checkIndex = -1" :select="checkIndex==-1?true:false">
            <template v-slot:content>
              <el-input-number
                type="number"
                size="small"
                v-model="num"
                :step="100"
                controls-position="right"
              ></el-input-number>
              <span>开心果</span>
              <span style="display:block;margin-top:8px;">￥{{num/10}}.00</span>
            </template>
          </RechargeItem>
          <br />
        </div>
        <el-button
          @click="handleRecharge"
          style="margin:0 auto;width:100px;position:relative;bottom:20px;"
        >充值</el-button>
      </el-tab-pane>
      <el-tab-pane label="账单记录" name="third">
        <div style="height:40px">
          <el-date-picker
            v-model="query_month"
            @change="handleQueryChange"
            value-format="yyyy-MM"
            type="month"
            placeholder="按月份查询"
            size="small"
          ></el-date-picker>
        </div>
        <el-table :data="tableData" border style="width: 100%" size="small">
          <el-table-column label="序号" type="index" align="center" width="50"></el-table-column>
          <el-table-column width="180" prop="createTime" label="日期" align="center"></el-table-column>
          <el-table-column prop="orderNo" label="流水号" align="center" width="230"></el-table-column>
          <el-table-column prop="billChange" width="80" label="存入" align="center">
            <template slot-scope="scope">{{scope.row.billChange>=0 ? scope.row.billChange:''}}</template>
          </el-table-column>
          <el-table-column prop="billChange" width="80" label="支出" align="center">
            <template
              slot-scope="scope"
            >{{scope.row.billChange>=0 ? '':Math.abs(scope.row.billChange)}}</template>
          </el-table-column>
          <el-table-column prop="type" width="80" label="类型" align="center">
            <template slot-scope="scope">{{scope.row.type===0 ? '充值':'支出'}}</template>
          </el-table-column>
          <el-table-column prop="balance" width="80" label="余额" align="center"></el-table-column>
          <el-table-column prop="mark" label="备注" align="center"></el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="limit"
          layout="prev, pager, next"
          :total="total"
          style="margin:10px 0px 10px 0px;text-align:center;"
        ></el-pagination>
      </el-tab-pane>
      <el-tab-pane label="提现记录" name="fourth">
        <div style="height:40px">
          <el-date-picker
            v-model="withdrawal_query_month"
            @change="handleWithdrawalQueryChange"
            value-format="yyyy-MM"
            type="month"
            placeholder="按月份查询"
            size="small"
          ></el-date-picker>
        </div>
        <el-table :data="withdrawalTableData" border style="width: 100%" size="small">
          <el-table-column label="序号" type="index" align="center" width="50"></el-table-column>
          <!-- <el-table-column prop="account" label="提现账号" align="center"></el-table-column> -->
          <el-table-column prop="virtualAmount" label="提现开心果" align="center"></el-table-column>
          <el-table-column prop="realAmount" label="折现（￥）" align="center"></el-table-column>
          <el-table-column prop="type" label="平台" align="center"></el-table-column>
          <!-- <el-table-column prop="mark" label="备注" align="center"></el-table-column> -->
          <el-table-column prop="createTime" label="申请时间" align="center" width="170"></el-table-column>
          <el-table-column prop="status" label="状态" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.status===0 ">受理中</span>
              <span style="color:green;" v-else>已完成</span>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @current-change="handleWithdrawalCurrentChange"
          :current-page.sync="withdrawalCurrentPage"
          :page-size="withdrawalLimit"
          layout="prev, pager, next"
          :total="withdrawalTotal"
          style="margin:10px 0px 10px 0px;text-align:center;"
        ></el-pagination>
      </el-tab-pane>
      <el-tab-pane label="提现" name="fifth" v-loading="loading" element-loading-text="正在快马加鞭提现中">
        <div>
          <div style="margin-left:20px">
            <span>开心果余额</span>
            <br />
            <div class="wallent-div">
              <i class="wallent-icon"></i>
              <span class="wallet-balance">{{(balance)}}</span>
            </div>
          </div>
          <el-form
            ref="withdrawal-form"
            :model="form"
            label-width="90px"
            style="width:400px;display:inline-block;margin-top:20px;"
          >
            <el-form-item prop="virtualAmount" label="开心果数额">
              <el-input v-model="form.virtualAmount"></el-input>
            </el-form-item>
            <el-form-item prop="acount" label="支付宝账号">
              <el-input v-model="form.acount"></el-input>
            </el-form-item>
            <el-form-item prop="name" label="姓名">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item></el-form-item>
            <el-form-item>
              <el-button @click="handleWithdrawalClick">提现</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Api from "../../api";
import RechargeItem from "../../components/RechargeItem";
export default {
  name: "wallet",
  data() {
    return {
      activeName: 'first',
      loading: false,
      balance: 0,
      num: 100,
      tableData: [],
      withdrawalTableData: [],
      checkIndex: 0,
      query_month: '',
      withdrawal_query_month: '',
      limit: 10,
      withdrawalLimit: 10,
      currentPage: 1,
      withdrawalCurrentPage: 1,
      total: 0,
      withdrawalTotal: 0,
      rechargeData: [
        {
          index: 0,
          num: 100
        },
        {
          index: 1,
          num: 640
        },
        {
          index: 2,
          num: 1280
        },
        {
          index: 3,
          num: 6480
        },
        {
          index: 4,
          num: 12960
        }
      ],
      form: {
        name: '',
        acount: '',
        virtualAmount: null
      }
    };
  },
  components: {
    RechargeItem
  },
  methods: {
    // withdrawal
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleWithdrawalClick() {
      if (this.form.virtualAmount > this.balance) {
        return;
      }
      this.loading = true;
      Api.withdrawal(this.form).then(res => {
        this.$message({
          message: res.data.msg,
          type: "success"
        });
        this.loading = false;
        this.balance -= this.form.virtualAmount;
        this.resetForm("withdrawal-form");
      });
    },
    handleSizeChange(val) {
      this.limit = val;
      this.page();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.page();
    },
    handleWithdrawalCurrentChange(val) {
      this.withdrawalCurrentPage = val;
      this.witdrawalPage();
    },
    handleRecharge() {
      let routeUrl = this.$router.resolve({
        path: "/recharge",
        query: { m: this.num }
      });
      window.open(routeUrl.href, "_blank");
    },
    handleToRecharge() {
      this.activeName = "second";
    },
    handleToWithdrawal() {
      this.activeName = "fifth";
    },
    handleItemSelect(c, n) {
      this.checkIndex = c;
      this.num = n;
    },
    handleQueryChange(v) {
      this.query_month = v;
      this.page();
    },
    handleWithdrawalQueryChange(v) {
      this.withdrawal_query_month = v;
      this.withdrawalPage();
    },
    getBalance() {
      Api.getBalance().then(r => {
        this.balance = r.data.data;
      });
    },
    page() {
      Api.getBillList(this.query_month, this.currentPage, this.limit).then(
        r => {
          let ret = r.data.data;
          this.tableData = ret.records;
          this.total = ret.total;
        }
      );
    },
    withdrawalPage() {
      Api.getWithdrawalList(this.withdrawal_query_month,this.currentPage, this.limit).then(r => {
        let ret = r.data.data;
        this.withdrawalTableData = ret.records;
        this.whithdrawalTotal = ret.total;
      });
    },
    handleTabsClick(tab) {
      this.loading = false;
      switch (tab.name) {
        case "first":
          this.getBalance();
          break;
        case "third":
          this.page();
          break;
        case "fourth":
          this.withdrawalPage();
          break;
        default:
          break;
      }
    }
  },
  mounted() {
    this.getBalance();
    // this.page();
    // this.withdrawalPage();
  },
  filters: {
    getBalance: v => {
      return v * 1000;
    }
  }
};
</script>

<style>
.wallent-div {
  margin: 20px 0 0 0;
  height: 30px;
  display: flex;
}
.wallet-balance {
  color: #fa7900;
  line-height: 25px;
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  font-size: 18px;
}
.wallent-icon {
  display: inline-block;
  width: 25px;
  height: 25px;
  background-image: url("../../assets/img/dou.png");
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 25px 25px;
}
.wallent-tips-div {
  font-size: 15px;
  color: rgb(83, 83, 83);
  margin: 20px 0 0 0;
}
</style>