import request from '@/utils/request'

export default {
    login(username, password) {
        const data = {
            username,
            password
        }
        return request({
            url: '/login',
            method: 'post',
            data
        })
    },
    logout() {
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
    foo(rid) {
        return request({
            url: '/live/info',
            method: 'get',
            params: {
                rid
            }
        })
    },
    register(data) {
        return request({
            url: '/register',
            method: 'post',
            data
        })
    },
    sendCode(account) {
        return request({
            url: '/code',
            method: 'post',
            params: {
                account
            }
        })
    },
    bind(data){
        return request({
            url: '/bind',
            method: 'post',
            params: {
                account:data.account,
                code:data.code
            }
        })
    },
    auth(data) {
        return request({
            url: '/auth',
            method: 'post',
            data
        })
    },
    getAuthInfo(){
        return request({
            url: '/auth/info',
            method: 'get',
        })
    },
    userBlock(ids,type){
        return request({
            url: '/admin/user/block/'+type,
            method: 'post',
            data:{
                ids
            }
        })
    },
    authPass(ids,type){
        return request({
            url: '/admin/auth/pass/'+type,
            method: 'post',
            data:{
                ids
            }
        })
    },
    authDel(ids){
        return request({
            url: '/admin/auth/del/',
            method: 'post',
            data:{
                ids
            }
        })
    },
    getSecurityInfo() {
        return request({
            url: '/getSecurityInfo',
            method: 'get'
        })
    },
    getUserInfo() {
        return request({
            url: '/getUserInfo',
            method: 'get'
        })
    },
    saveRole(data){
        return request({
            url: '/admin/role/save',
            method: 'post',
            data
        })
    },
    getRoleList() {
        return request({
            url: '/admin/role/list',
            method: 'get'
        })
    },
    getHasRoleUserList(){
        return request({
            url: '/admin/user/hasRole/list',
            method: 'get'
        })
    },
    getRoleListByUserId(uid){
        return request({
            url: '/admin/role/listByUserId',
            method: 'get',
            params:{
                uid
            }
        })
    },
    getRoomInfo(rid) {
        return request({
            url: '/room',
            method: 'get',
            params: {
                rid
            }
        })
    },
    getRoomSettingInfo() {
        return request({
            url: '/room/setting/info',
            method: 'get',
        })
    },
    getPresentInfo() {
        return request({
            url: '/present',
            method: 'get'
        })
    },
    getMenuList() {
        return request({
            url: '/admin/menu/list',
            method: 'get'
        })
    },
    getMenuListByRole(rid) {
        return request({
            url: '/admin/menu/listByRole',
            method: 'get',
            params:{
                rid
            }
        })
    },
    getMenuListByRoleIds(roleIds) {
        return request({
            url: '/admin/menu/listByRoleIds',
            method: 'post',
            data:{
                ids:roleIds
            }
        })
    },
    getSystemMonitor(){
        return request({
            url: '/admin/monitor',
            method: 'get'
        })
    },
    getLivingRoomInfo(cid) {
        return request({
            url: '/room/living',
            method: 'get',
            params: {
                cid
            }
        })
    },
    getLiveStatInfo(page,limit,dateRange) {
        return request({
            url: '/live/info/list',
            method: 'get',
            params: {
                page,
                limit,
                dateRange
            }
        })
    },
    getBalance() {
        return request({
            url: '/bill',
            method: 'get',
        })
    },
    recharge(num) {
        return request({
            url: '/bill/recharge',
            method: 'get',
            params: {
                num
            }
        })
    },
    getCategory(page,limit){
        return request({
            url: '/category/query',
            method: 'get',
            params: {
                page,
                limit            
            }
        })
    },
    getBillList(month, page, limit) {
        return request({
            url: '/bill/list',
            method: 'get',
            params: {
                page,
                limit,
                month
            }
        })
    },
    getRoomPresentList(page, limit, dateRange) {
        return request({
            url: '/room/present/list',
            method: 'get',
            params: {
                page,
                limit,
                dateRange
            }
        })
    },
    getWithdrawalList(month, page, limit) {
        return request({
            url: '/bill/withdrawal/list',
            method: 'get',
            params: {
                page,
                limit, month
            }
        })
    },
    getWatctList(type, page, limit) {
        return request({
            url: '/watch/list',
            method: 'get',
            params: {
                type,
                page,
                limit
            }
        })
    },
    saveWatch(data) {
        return request({
            url: '/watch',
            method: 'post',
            data
        })
    },
    updateMenu(data){
        return request({
            url: '/admin/menu/update',
            method: 'post',
            data
        })
    },

    saveMenu(data){
        return request({
            url: '/admin/menu/save',
            method: 'post',
            data
        })
    },
    getSystemPushInfo(){
        return request({
            url: '/admin/push/info',
            method: 'get',
        })
    },
    getSystemPushLog(sysPushId){
        return request({
            url: '/admin/push/log',
            method: 'get',
            params:{
                sysPushId
            }
        })
    },
    updateSystemPushInfo(data){
        return request({
            url: '/admin/push/update',
            method: 'post',
            data
        })
    },
    delWatch(id) {
        return request({
            url: '/watch',
            method: 'delete',
            params: {
                id
            }
        })
    },
    liveOpen() {
        return request({
            url: '/live/open',
            method: 'post'
        })
    },
    updateRoleMenu(data){
        return request({
            url: '/admin/role/menu/update',
            method: 'post',
            data
        })
    },
    updateUserRole(data){
        return request({
            url: '/admin/user/role/update',
            method: 'post',
            data
        })
    },
    savePresent(data){
        return request({
            url: '/admin/present/save',
            method: 'post',
            data
        })
    },
    editPresent(data){
        return request({
            url: '/admin/present/edit',
            method: 'post',
            data
        })
    },
    removePresent(id){
        return request({
            url: '/admin/present/del',
            method: 'post',
            params: {
                id
            }
        })
    },
    liveClose(rid) {
        return request({
            url: '/live/on_done',
            method: 'post',
            params: {
                name: rid
            }
        })
    },
    sendPresent(data) {
        return request({
            url: '/present/send',
            method: 'post',
            data
        })
    },
    saveRoomInfo(data) {
        return request({
            url: '/room/info/save',
            method: 'post',
            data
        })
    },
    updateUserInfo(data) {
        return request({
            url: '/user/info/update',
            method: 'post',
            data
        })
    },
    getDashboardData() {
        return request({
            url: '/admin/dashboard/data',
            method: 'get'
        })
    },
    adminGetUserList(page, limit, uid, disabled) {
        return request({
            url: '/admin/user/list',
            method: 'get',
            params: {
                page,
                limit,
                uid,
                disabled
            }
        })
    },
    adminGetRoomList(page, limit) {
        return request({
            url: '/admin/room/list',
            method: 'get',
            params: {
                page,
                limit
            }
        })
    },
    adminAuthInfoList(page, limit,status) {
        return request({
            url: '/admin/auth/list',
            method: 'get',
            params: {
                page,
                limit,
                status
            }
        })
    },
    adminPresentList(page, limit) {
        return request({
            url: '/admin/present/list',
            method: 'get',
            params: {
                page,
                limit
            }
        })
    },
    adminBillList(page, limit, type, dateRange) {
        return request({
            url: '/admin/bill/list',
            method: 'get',
            params: {
                page,
                limit,
                type,
                dateRange
            }
        })
    },
    adminLiveInfoList(page, limit, rid, dateRange) {
        return request({
            url: '/admin/liveInfo/list',
            method: 'get',
            params: {
                page,
                limit,
                rid,
                dateRange
            }
        })
    },
    adminLiveBanList(page, limit) {
        return request({
            url: '/admin/live/ban/list',
            method: 'get',
            params: {
                page,
                limit
            }
        })
    },
    liveDetectList(page, limit){
        return request({
            url: '/admin/live/detect/list',
            method: 'get',
            params: {
                page,
                limit
            }
        })
    },
    applySecret() {
        return request({
            url: '/ant/live/applySecret',
            method: 'post',
        })
    },
    stopLive() {
        return request({
            url: '/ant/live/stopLive',
            method: 'post',
        })
    },
    getLiveStatus() {
        return request({
            url: '/ant/live/getLiveStatus',
            method: 'get',
        })
    },
    openLive() {
        return request({
            url: '/tencent/live/open',
            method: 'get',
        })
    },
    withdrawal(data) {
        return request({
            url: '/bill/withdrawal',
            method: 'post',
            data
        })
    },
    getStatView(params) {
        return request({
            url: '/admin/stat/view/list',
            method: 'get',
            params
        })
    },
    getStatSpeak(params) {
        return request({
            url: '/admin/stat/speak/list',
            method: 'get',
            params
        })
    },
    getSnapshotTempaltes(){
        return request({
            url: '/admin/live/snapshot/template/list',
            method: 'get',
        })
    },
    updateSnapshotTemplate(data){
        return request({
            url: '/admin/live/snapshot/template/update',
            method: 'post',
            data
        })
    },
    getBanRecordList(params){
        return request({
            url: '/admin/live/ban/record/list',
            method: 'get',
            params
        })
    },
    getVodSignature(){
        return request({
            url: '/vod/signature',
            method: 'post',
        })
    },
    saveUploadVodInfo(data){
        return request({
            url: '/vod/video/info/save',
            method: 'post',
            data
        })
    },
    getVodList(params){
        return request({
            url: '/vod/video/list',
            method: 'get',
            params
        })
    },
    getVodNormalList(params){
        return request({
            url: '/vod/video/list/normal',
            method: 'get',
            params
        })
    },
    getVodVideoInfo(params){
        return request({
            url: '/vod/video/info',
            method: 'get',
            params
        })
    }
}