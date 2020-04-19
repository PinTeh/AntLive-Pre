<template>
  <el-popover
  placement="bottom"
  width="160"
  v-model="visible">
  <p>这是一段内容这是一段内容确定删除吗？</p>
</el-popover>
</template>

<script>
export default {
    name:'category-component',
    data(){
        return{
            visible:false
        }
    }
}
</script>

<style lang="less" >

</style>