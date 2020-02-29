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
export default {
    components:{
        LiveRoom,
        Header
    },
    data(){
        return {
            room_list:[{
                id:1,
                title:"王牌3星1v4",
                cover:'https://images.unsplash.com/photo-1582917205301-bbb4afb5501f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
                user:{
                    id:1,
                    name:'PinTeh',
                    avatar:'http://image.imhtb.cn/avatar.png'
                }
            },
            {
                id:1,
                title:"Porsche Panamera",
                cover:'https://images.unsplash.com/photo-1579599709180-375ce2a5db8b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2125&q=80',
                user:{
                    id:1,
                    name:'Porsche',
                    avatar:'http://image.imhtb.cn/avatar.png'
                }
            }]
        }
    }
}
</script>

<style lang="less">
    .item-container{
        width: 90%;
        margin: 0 auto;
    }
</style>
