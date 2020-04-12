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
    getRoomSettingInfo(){
        return request({
            url:'/room/setting/info',
            method:'get',
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
    getBillList(month,page,limit){
        return request({
            url:'/bill/list',
            method:'get',
            params:{
                page,
                limit,
                month
            }
        })
    },
    getRoomPresentList(page,limit,dateRange){
        return request({
            url:'/room/present/list',
            method:'get',
            params:{
                page,
                limit,
                dateRange
            }
        })
    },      
    getWithdrawalList(page,limit){
        return request({
            url:'/bill/withdrawal/list',
            method:'get',
            params:{
                page,
                limit            }
        })
    },
    getWatctList(type,page,limit){
        return request({
            url:'/watch/list',
            method:'get',
            params:{
                type,
                page,
                limit
            }
        })
    },
    saveWatch(data){
        return request({
            url:'/watch',
            method:'post',
            data
        })
    },
    delWatch(id){
        return request({
            url:'/watch',
            method:'delete',
            params:{
                id
            }
        })
    },
    liveOpen(){
        return request({
            url:'/live/open',
            method:'post'
        })
    },
    liveClose(rid){
        return request({
            url:'/live/on_done',
            method:'post',
            params:{
                name:rid
            }
        })
    },
    sendPresent(data){
        return request({
            url:'/present/send',
            method:'post',
            data
        })
    },
    getDashboardData(){
        return request({
            url:'/admin/dashboard/data',
            method:'get'
        })
    },
    adminGetUserList(page,limit,uid,disabled){
        return request({
            url:'/admin/user/list',
            method:'get',
            params:{
                page,
                limit,
                uid,
                disabled
            }
        })
    },
    adminGetRoomList(page,limit){
        return request({
            url:'/admin/room/list',
            method:'get',
            params:{
                page,
                limit
            }
        })
    },
    adminAuthInfoList(page,limit){
        return request({
            url:'/admin/auth/list',
            method:'get',
            params:{
                page,
                limit
            }
        })
    },
    adminPresentList(page,limit){
        return request({
            url:'/admin/present/list',
            method:'get',
            params:{
                page,
                limit
            }
        })
    },
    adminBillList(page,limit,type,dateRange){
        return request({
            url:'/admin/bill/list',
            method:'get',
            params:{
                page,
                limit,
                type,
                dateRange
            }
        })
    },
    adminLiveInfoList(page,limit,rid,dateRange){
        return request({
            url:'/admin/liveInfo/list',
            method:'get',
            params:{
                page,
                limit,
                rid,
                dateRange
            }
        })
    },
    openLive(){
        return request({
            url:'/tencent/live/open',
            method:'get',
        })
    },
    withdrawal(data){
        return request({
            url:'/bill/withdrawal',
            method:'post',
            data
        })
    },
    getStatView(days){
        return request({
            url:'/admin/stat/view/list',
            method:'get',
            params:{
                days
            }
        })
    },
    getStatSpeak(days){
        return request({
            url:'/admin/stat/speak/list',
            method:'get',
            params:{
                days
            }
        })
    }
}