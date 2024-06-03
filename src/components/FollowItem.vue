<template>
  <div class="item-container" @click="handleItemClick(item.roomId)">
    <el-image :src="item.cover" fit="cover" class="item-img"></el-image><br />
    <div class="item-span" style="text-align: left; margin-left: 5px">
      <span
        >{{ item.name == null ? '' : '[ ' + item.name + ' ] '
        }}{{ item.title }}</span
      ><br />
      <i class="el-icon-user" v-if="item.name != null">{{ ' ' + item.name }}</i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'follow-item',
  data() {
    return {}
  },
  props: ['item'],
  methods: {
    handleItemClick(roomId) {
      this.$router.push({
        path: '/live/' + roomId,
      })
    },
  },
}
</script>

<style lang="less" scoped>
.item-container {
  height: 200px;
  width: 250px;
  cursor: pointer;
  margin: 50px 0px 0px 55px;
  display: inline-block;
  border: 1px solid rgba(233, 233, 233, 0.503);
  border-radius: 2px;
  .item-img {
    width: 250px;
    height: 140px;
    border-radius: 2px;
  }
  .item-span {
    line-height: 25px;
    color: rgb(59, 59, 59);
  }
  .item-span:hover {
    color: rgb(45, 93, 183);
    transition: all 0.3s;
  }
}
.item-container:hover {
  border: 1px solid rgba(144, 144, 144, 0.503);
  color: rgb(45, 93, 183);
  transition: all 0.6s;
}
</style>
