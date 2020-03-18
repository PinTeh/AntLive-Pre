<template>
    <div style="height:500px;">
        <FollowItem v-for="item in watchList" :key="item.id" :item="item"/>
    </div>
</template>

<script>
import Api from '../../api'
import FollowItem from '../../components/FollowItem'
export default {
    name:'follow',
    components:{
        FollowItem
    },
        data(){
        return{
            watchList:[]
        }
    },
    mounted(){
        Api.getWatctList(1).then((res) => {
            let ret = res.data.data;
            this.watchList = ret;
        })
    },
}
</script>

<style>
    
</style>