import Vue from 'vue'
import Vuex from 'vuex'
import { setToken,removeToken } from '../utils/auth'
import Api from '../api'

Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        userInfo:'',
        token:'',
        webSocket:{
            rid:'',
            socket:''
        }
    },
    getters:{
        foo(state){
            return "￥" + state.token 
        }
        //调用方式store.getters.foo
        // `拼接${state.xx}字符`
    },
    mutations:{
        setUserInfo(state,v){
            state.userInfo = v
        },
        setStateToken(state,v){
            state.token = v
        },
        setWebSocket(state,v){
            state.webSocket = v
        }
    },
    actions:{
        foo({commit},e){
            commit("foo",e)
        },
        login({commit},e){
            return new Promise((resolve,reject) => {
                Api.login(e.account,e.password).then((res)=>{
                    let ret = res.data;
                    commit('setStateToken',ret.data.token)
                    commit('setUserInfo',ret.data.user)
                    setToken(ret.data.token)
                    resolve()
                }).catch(error=>{
                    reject(error)
                })
            })
        },
        logout({commit}){
            return new Promise(resolve => {
                commit('setStateToken','')
                commit('setUserInfo','')
                removeToken()
                resolve()
            })
        },
        register({commit},e){
            return new Promise((resolve,reject)=>{
                Api.register(e).then(()=>{
                    commit('')
                }).catch(error=>{
                    reject(error)
                })
                resolve()
            })
        },
        sendCode({commit},account){
            return new Promise((resolve,reject)=>{
                Api.sendCode(account).then(()=>{
                    commit('')
                }).catch(error=>{
                    reject(error)
                })
                resolve()
            })
        }
    }

})

export default store