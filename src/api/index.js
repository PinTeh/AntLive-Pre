import request from '@/utils/request'

export default {
    login(account,password){
        const data = {
            account,
            password
        }

        return request({
            url:'/login',
            method:'post',
            data
        })
    },
    logout(){
        return request.post('/logout')
    },
    // getUserInfo(token){
    //     return request({
    //         url:'/info',
    //         method:'get',
    //         params:{
    //             token
    //         }
    //     })
    // },
    foo(rid){
        return request({
            url:'/live/info',
            method:'get',
            params:{
                rid
            }
        })
    },
    register(data){
        return request({
            url:'/register',
            method:'post',
            data
        })
    },
    sendCode(account){
        return request({
            url:'/code',
            method:'post',
            params:{
                account
            }
        })
    },
    getSecurityInfo(){
        return request({
            url:'/getSecurityInfo',
            method:'get'
        })
    },
    getUserInfo(){
        return request({
            url:'/getUserInfo',
            method:'get'
        })
    },
    getRoomInfo(rid){
        return request({
            url:'/room',
            method:'get',
            params:{
                rid
            }
        })
    },
    getPresentInfo(){
        return request({
            url:'/present',
            method:'get'
        })
    },
    getLivingRoomInfo(cid){
        return request({
            url:'/room/living',
            method:'get',
            params:{
                cid
            }
        })
    },
    getLiveStatInfo(rid){
        return request({
            url:'/live/info',
            method:'get',
            params:{
                rid
            }
        })
    },
    getBalance(){
        return request({
            url:'/bill',
            method:'get',
        })
    },
    recharge(num){
        return request({
            url:'/bill/recharge',
            method:'get',
            params:{
                num
            }
        })
    },
}