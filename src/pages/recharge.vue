<template>
    <div>正在跳转，请稍后...</div>
</template>

<script>
import Api from '../api'
export default {
    name:'recharge',
    mounted(){
        Api.recharge(this.$route.query.m).then(r => {
            const div = document.createElement('div')
            div.innerHTML = r.data.data
            document.body.appendChild(div)
            document.forms[0].submit()
      })
    }
}
</script>

<style>

</style>