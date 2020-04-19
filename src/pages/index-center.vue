<template>
  <el-container class="index-center">
    <el-header style="padding:0px">
      <Header :categorys="this.$store.state.categorys" @category-select="handleSelect" />
    </el-header>
    <el-main style="padding:5px 20px 20px 20px">
      <div class="item-container">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="bread-crumb">
          <el-breadcrumb-item>
            <span style="cursor:pointer;font-weight:bold;" @click="handleAllClick">全部</span>
          </el-breadcrumb-item>
          <el-breadcrumb-item>{{current_category}}</el-breadcrumb-item>
        </el-breadcrumb>
        <LiveRoom v-for="item in rooms" :key="item.id" :room="item"></LiveRoom>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import Header from "../components/Header";
import LiveRoom from "../components/LiveRoom";
import Api from "../api";
import store from '../store';
export default {
  components: {
    LiveRoom,
    Header
  },
  data() {
    return {
      rooms: [],
      categorys: [],
      current_category: ""
    };
  },
  mounted() {
    this.list();
    store.dispatch('getCategorys').then(()=>{})
  },
  methods: {
    handleSelect(c) {
      if (c == null) {
        this.current_category = "";
        this.list();
        return;
      }
      this.current_category = c.name;
      this.list(c.id);
    },
    list(cid) {
      Api.getLivingRoomInfo(cid).then(res => {
        this.rooms = res.data.data;
      });
    },
    handleAllClick() {
      this.current_category = "";
      this.list();
    }
  }
};
</script>

<style lang="less">
.item-container {
  width: 90%;
  margin: 0 auto;
}
.index-center {
  .bread-crumb {
    padding-left: 20px;
    margin-bottom: 10px;
  }
}
</style>
