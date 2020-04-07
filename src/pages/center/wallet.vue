<template>
  <div style="height:auto;text-align:left;">
    <el-tabs v-model="activeName" style="margin:0px 20px 0 20px;">
      <el-tab-pane label="账户余额" name="first">
        <div style="height:500px;width:100%;">
          <span>金豆余额</span>
          <br />
          <div class="wallent-div">
            <i class="wallent-icon"></i>
            <span class="wallet-balance">{{(balance)|getBalance}}</span>
          </div>

          <div class="wallent-tips-div">
            <p>金豆有什么用？</p>
            <p>金豆是AntLive世界中非常重要的物品</p>
            <ul>
              <li>金豆用于对优秀的主播进行打赏支持，这是对主播的一种肯定</li>
              <li>金豆还可用于、购买标识、参与活动等</li>
            </ul>
            <p>如何获得金豆？</p>
            <ul>
              <li>
                充钱
                <a href="#" @click="handleToRecharge">立即充值</a>
              </li>
            </ul>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="账户充值" name="second" style="text-align:center;">
        <div style="height:260px;width:850px;">
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
                :step="1000"
                controls-position="right"
              ></el-input-number>
              <span>金豆</span>
              <span style="display:block;margin-top:8px;">￥{{num/10}}.00</span>
            </template>
          </RechargeItem>
          <br />
        </div>
        <el-button @click="handleRecharge" style="margin:0 auto;width:100px">充值</el-button>
      </el-tab-pane>
      <el-tab-pane label="账单记录" name="third">
        <div style="height:40px">
          <el-date-picker
      v-model="query_month"
      @change="handleQueryChange"
      value-format="yyyy-MM"
      type="month"
      placeholder="按月份查询"
      size="small">
    </el-date-picker>
        </div>
        <el-table :data="tableData" border style="width: 100%" >
          <el-table-column label="序号" type="index" align="center" width="50"></el-table-column>
          <el-table-column width="180" prop="createTime" label="日期" align="center"></el-table-column>
          <el-table-column prop="orderNo" label="流水号" align="center"></el-table-column>
          <el-table-column prop="billChange" width="80" label="存入" align="center">
            <template slot-scope="scope">{{scope.row.billChange>=0 ? scope.row.billChange:''}}</template>
          </el-table-column>
          <el-table-column prop="billChange" width="80" label="支出" align="center">
            <template slot-scope="scope">{{scope.row.billChange>=0 ? '':Math.abs(scope.row.billChange)}}</template>
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
      activeName: "third",
      balance: 0,
      num: 1000,
      tableData: [],
      checkIndex: 0,
      query_month:'',
      limit:10,
      currentPage:1,
      total:0,
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
      ]
    };
  },
  components: {
    RechargeItem
  },
  methods: {
    handleSizeChange(val) {
      this.limit = val;
      this.page();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.page();
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
    handleItemSelect(c, n) {
      this.checkIndex = c;
      this.num = n;
    },
    handleQueryChange(v){
      this.query_month = v;
      this.page();
    },
    page(){
      Api.getBillList(this.query_month,this.currentPage,this.limit).then(r => {
        let ret = r.data.data;
        this.tableData = ret.records;
        this.total = ret.total;
      });
    }
  },
  mounted() {
    Api.getBalance().then(r => {
      this.balance = r.data.data;
    });
    this.page();
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