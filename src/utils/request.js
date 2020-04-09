import axios from 'axios'
import Code from './code'
import { Message } from 'element-ui';
import { getToken } from './auth'
 import store from '../store';
 import router from '../router'

const instance = axios.create({
    //baseURL:'http://localhost:9000',
    baseURL:'http://www.imhtb.cn:9000',
    timeout:20000,
    //20s
    withCredentials:true
})

instance.interceptors.request.use(config => {
    config.headers.token = getToken()
    return config
},error => {
    Promise.reject(error)
})

instance.interceptors.response.use(res=>{
    let ret = res.data;
    if(ret.code == Code.SUCCESS){
        return res;
    }else{
        if(ret.code == Code.UNAUTH){
            store.dispatch('logout').then(()=>{
                //location.reload()
                router.push('/login')
            })
        }else if(ret.code == Code.ERROR){
            Message.error(ret.msg)
        }
    }
},err => {
    Message.warning("请求异常")
    return Promise.reject(err)
})

export default instance