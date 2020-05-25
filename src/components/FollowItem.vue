<template>
  <div class="item-container">
      <el-image :src="item.cover" fit="cover" class="item-img"></el-image><br>
     <div style="text-align:left;margin-left:5px;">
       <span style="line-height:30px;width:220px;">{{item.name==null?'':'['+item.name+']'}}{{item.title}}</span><br>
      <i class="el-icon-user" v-if="item.name!=null">{{item.name}}</i>
     </div>
  </div>
</template>

<script>
export default {
    name:'follow-item',
    data() {
      return {
        src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
      }
    },
    props:['item']
}
</script>

<style scoped>
.item-container{
    height:200px;
    width: 250px;
    /* background: red; */
    /* float: left; */
    cursor: pointer;
    margin-left: 30px;
    margin-top: 10px;
    float: left;
}
.item-img{
    width:250px;
    height:140px;
    border-radius: 3%;
}
</style>