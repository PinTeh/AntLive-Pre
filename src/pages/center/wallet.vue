<template>
  <div style="height:500px;text-align:left;">
    <el-tabs v-model="activeName" @tab-click="handleClick" style="margin:0px 20px 0 20px;">
      <el-tab-pane label="账户余额" name="first">
        <div style="height:500px;width:100%;">
          <span>金豆余额</span>
          <i></i>
          <h1 class="wallet-ret">{{(balance)|getBalance}}</h1>
          <p>金豆有什么用？</p>
          <p>金豆是AntLive世界中非常重要的物品</p>
          <ul>
            <li>金豆用于对优秀的主播进行打赏支持，这是对主播的一种肯定</li>
            <li>金豆还可用于、购买标识、参与活动等</li>
          </ul>
          <p>如何获得金豆？</p>
          <ul>
            <li>
              点击右边的充值即可~
              <a href="#">立即充值</a>
            </li>
          </ul>
        </div>
      </el-tab-pane>
      <el-tab-pane label="账户充值" name="second">
        <el-input-number v-model="num" :step="1000" controls-position="right"></el-input-number>
        <br />
        <el-button @click="handleRecharge">充值</el-button>
      </el-tab-pane>
      <el-tab-pane label="消费记录" name="third">
        <el-table :data="tableData" border style="width: 100%" header-row-style="font-size:14px;">
          <el-table-column prop="date" label="日期"></el-table-column>
          <el-table-column prop="order" label="订单号"></el-table-column>
          <el-table-column prop="balance" label="金额"></el-table-column>
          <el-table-column prop="type" label="充值类型"></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Api from "../../api";
export default {
  name: "wallet",
  data() {
    return {
      activeName: "third",
      balance: 0,
      num: 1000,
      tableData: [
        {
          date: "2020-03-16 01:28:54",
          order: "43514162138742",
          balance: 648,
          type:"系统充值"
        },
        {
          date: "2020-03-16 01:28:54",
          order: "67456745674657",
          balance: 324,
          type:"系统充值"
        },
         {
          date: "2020-03-16 01:28:54",
          order: "23456345739947",
          balance: 68,
          type:"系统充值"
        },
      ]
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleRecharge() {
      let routeUrl = this.$router.resolve({
        path: "/recharge",
        query: { m: this.num }
      });
      window.open(routeUrl.href, "_blank");
    }
  },
  mounted() {
    Api.getBalance().then(r => {
      this.balance = r.data.data;
    });
  },
  filters: {
    getBalance: v => {
      return "￥" + v;
    }
  }
};
</script>

<style>
.wallet-ret {
  color: #fa7900;
}
</style>