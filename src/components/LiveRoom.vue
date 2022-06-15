<template>
  <el-card @click.native="handleClick" class="card" :body-style="{ padding: '0px' }" shadow="hover" style="position:relative">
    <el-image fit="cover" class="image-cover" :src="require('@/assets/img/live_cover.png')">
    <!-- <el-image fit="cover" class="image-cover" :src="room.cover"> -->
    </el-image>
    <el-tag style="position:absolute;left:7px;top:7px;height:24px;line-height:24px;background-color: #ffffff6b;" type="success" effect="plain">直播</el-tag>
    <div style="padding: 14px;">
      <span class="title">{{room.title}}</span>
      <div class="bottom clearfix">
        <img class="avatar" :src="room.userInfo.avatar" />
        <span class="nick_name">{{room.userInfo.name}}</span>
      </div>
    </div>
  </el-card>
</template>

<script>
    export default {
    name: "live-room",
    props: ["room"],
    data() {
        return {
        currentDate: new Date()
        };
    },
    methods: {
        handleClick() {
        this.$router.push({
            path: "/live/" + this.room.id
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
.nick_name {
  font-size: 13px;
  color: rgb(112, 112, 112);
  vertical-align: top;
  line-height: 22px;
}
</style>
