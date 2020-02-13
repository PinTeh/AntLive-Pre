<template>
  <div class="item-container">
      <el-image :src="src" class="item-img"></el-image><br>
     <div style="text-align:left;margin-left:5px;">
       <span style="line-height:30px;width:220px;">[央视新闻]长镜头下的</span><br>
      <i class="el-icon-user">央视新闻</i>
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
    }
}
</script>

<style scoped>
.item-container{
    height:200px;
    width: 250px;
    /* background: red; */
    float: left;
    margin-left: 45px;
    margin-top: 20px;
    cursor: pointer;
}
.item-img{
    width:250px;
    height:140px;
    border-radius: 3%;
}
</style>