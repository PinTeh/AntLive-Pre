<template>
  <el-container>
    <el-header style="padding:0px">
      <Header />
    </el-header>
    <el-main >
        <div class="item-container">
            <LiveRoom v-for="item in room_list" :key="item.id" :room="item"></LiveRoom>
        </div>
    </el-main>
  </el-container>
</template>

<script>
import Header from '../components/Header'
import LiveRoom from '../components/LiveRoom'
import Api from '../api'
export default {
    components:{
        LiveRoom,
        Header
    },
    data(){
        return {
            room_list:[]
        }
    },
    mounted(){
        Api.getLivingRoomInfo().then(res => {
            this.room_list = res.data.data;
        })
    }
}
</script>

<style lang="less">
    .item-container{
        width: 90%;
        margin: 0 auto;
    }
</style>
