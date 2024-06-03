<template>
  <div class="info">
    <!-- <div class="info" :style="'background-image: url(' + bg + ')'"> -->
    <img
      class="portrait"
      draggable="false"
      :src="user.avatar"
      width="80"
      height="80"
    />
    <div class="user-info">
      <div class="nick-level">
        <div class="nick" v-text="user.nickName"></div>
        <div :class="'level level' + levelClass">
          <i :class="'icons icon_level_' + levelClass"></i>
          <span v-text="user.level || 0"></span>
        </div>
      </div>
      <div class="uid" v-text="'ID : ' + user.userId"></div>
      <div class="wealth">
        <div class="w-star">
          <el-tooltip effect="dark" content="开心果余额" placement="bottom">
            <span v-text="user.balance || 0"></span>
          </el-tooltip>
          <i class="icons star-sm"></i>
        </div>
        <span class="cut">|</span>
        <div class="w-diamond">
          <span v-text="user.diamondNumber || 0"></span>
          <i class="icons diamond-sm"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserInfo',
  data() {
    return {
      bg: require('@/assets/img/cover.jpg'),
    }
  },
  props: ['user'],
  computed: {
    levelClass() {
      var level = this.level
      if (1 <= level && level <= 7) {
        return 1
      } else if (8 <= level && level <= 16) {
        return 2
      } else {
        return 6
      }
    },
  },
}
</script>

<style lang="less" scoped>
.info {
  background: #fff;
  height: 180px;
  text-align: left;
}
.portrait {
  width: 80px;
  height: 80px;
  overflow: hidden;
  margin: 46px 20px 0 30px;
  border-radius: 40px;
  object-fit: cover;
  // border: 1px solid rgba(205, 205, 205, 0.5);
}
.user-info {
  margin-top: 46px;
  vertical-align: top;
}
.portrait,
.user-info,
.w-star,
.w-diamond,
.nick,
.level {
  display: inline-block;
}
.nick {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 110px;
}
.nick,
.level {
  font-weight: bold;
  vertical-align: middle;
}
.cut {
  padding: 0 10px;
  color: #e9e9e9;
  font-size: 15px;
}
.uid,
.wealth {
  margin-top: 14px;
}
.uid {
  font-size: 13px;
}
.level {
  padding: 0 6px;
  color: #fff;
  font-size: 12px;
  margin-left: 5px;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  -ms-border-radius: 10px;
  -o-border-radius: 10px;
  border-radius: 10px;
  height: 20px;
  line-height: 20px;
}
.level .icons {
  display: inline-block;
}
.level1 {
  background: #50e4ce;
}
.level2 {
  background: #4a87f6;
}
.level3 {
  background: #fa9f47;
}
.level4 {
  background: #fad247;
}
.level5 {
  background: #5061e4;
}
.level6 {
  background: #ac47fa;
}
.level .num {
  display: inline-block;
}
.wealth {
  font-size: 12px;
  white-space: nowrap;
}
.wealth .icons {
  margin-top: -3px;
  vertical-align: middle;
}
</style>
