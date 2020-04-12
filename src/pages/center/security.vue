<template>
  <div style="height:500px;box-sizing: border-box;padding:15px">
    <el-row>
      <el-col :span="12">
        <SecurityItem :item="items[0]" :checked="checked[0]"/>
      </el-col>
      <el-col :span="12">
        <SecurityItem :item="items[1]" :checked="checked[1]"/>
      </el-col>
    </el-row>
        <el-row>
      <el-col :span="12">
        <SecurityItem :item="items[2]" :checked="checked[2]"/>
      </el-col>
      <el-col :span="12">
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Api from '../../api'
import SecurityItem from "../../components/SecurityItem";
export default {
  name: "security",
  components: {
    SecurityItem
  },
  data() {
    return {
      items:[{
        id:1,
        icon:'el-icon-message',
       title:'我的邮箱',
       desc:'绑定邮箱可以接收通知'
      },{
        id:2,
        icon:'el-icon-mobile-phone',
       title:'我的手机',
       desc:'绑定手机可以接收通知'
      },{
        id:3,
      icon:'el-icon-postcard',
       title:'我的认证',
       desc:'认证后可以接收通知'
      }],
      checked:[false,false,false]
    };
  },
  mounted(){
    Api.getSecurityInfo().then(res=>{
      this.checked = res.data.data;
    })
  }
};
</script>

<style>
.icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-top: 50px;
}
.img-container {
  float: left;
  width: 150px;
  height: 100%;
  text-align: center;
  line-height: 200px;
  vertical-align: middle;
}
</style>