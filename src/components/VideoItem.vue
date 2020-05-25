<template>
  <el-card @click.native="handleClick" class="card" :body-style="{ padding: '0px' }" shadow="hover" style="position:relative">
    <el-image fit="cover" class="image-cover" :src="video.coverUrl"></el-image>
    <div style="padding: 14px;">
      <span class="title">{{video.title}}</span>
      <div class="bottom clearfix">
        <img class="avatar" :src="video.userInfo.avatar" />
        <time class="time">{{video.userInfo.name}}</time>
      </div>
    </div>
  </el-card>
</template>

<script>
    export default {
    name: "video-item",
    props: ["video"],
    data() {
        return {
          currentDate: new Date()
        };
    },
    methods: {
        handleClick() {
        this.$router.push({
            path: "/vod/" + this.video.id
        });
        }
    }
  };
</script>

<style lang="less" >
.avatar {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 10px;
}
.card {
  width: 300px;
  height: 230px;
  float: left;
  cursor: pointer;
  margin: 10px;
}
.image-cover {
  width: 300px;
  height: 160px;
  display: block;
}
.bottom {
  margin-top: 5px;
  line-height: 20px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
.time {
  font-size: 13px;
  color: #999;
  vertical-align: top;
  line-height: 22px;
}
</style>
