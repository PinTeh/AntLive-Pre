<template>
  <el-container class="index-center">
    <el-header style="padding:0px">
      <Header :categorys="this.$store.state.categorys" :notIndexPage="true" @category-select="handleSelect" />
    </el-header>
    <el-main style="padding:5px 20px 20px 20px">
      <div class="item-container">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="bread-crumb">
          <!-- <el-breadcrumb-item>
            <span style="cursor:pointer;font-weight:bold;" @click="handleAllClick">全部</span>
          </el-breadcrumb-item>
          <el-breadcrumb-item>{{current_category}}</el-breadcrumb-item> -->
        </el-breadcrumb>
        <VideoItem v-for="item in videos" :key="item.id" :video="item"></VideoItem>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import Header from "../components/Header";
import VideoItem from "../components/VideoItem";
import Api from "../api";
export default {
  components: {
    VideoItem,
    Header
  },
  data() {
    return {
      videos: [],
      categorys: [],
      current_category: ""
    };
  },
  mounted() {
    this.list();
    
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
    list() {
      let params = {
        page:1,
        limit:794409767
      }
      Api.getVodNormalList(params).then(res => {
        this.videos = res.data.data.records;
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
