import axios from 'axios'
import ResponseCode from './code'
import { Message, MessageBox } from 'element-ui'
import { getToken } from './auth'
import store from '../store'
import router from '../router'

const instance = axios.create({
  // baseURL: 'http://localhost:9000',
  baseURL: '/api',
  timeout: 20000,
  // 20s
  withCredentials: true,
})

/**
 * 设置请求头部
 */
instance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = getToken()
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

/**
 * 配置通用响应拦截
 */
instance.interceptors.response.use(
  (res) => {
    const { code, msg } = res.data
    switch (code) {
      case ResponseCode.SUCCESS:
        return Promise.resolve(res)
      case ResponseCode.UN_AUTH:
        store.dispatch('logout').then(() => {
          MessageBox.confirm('账号已过期, 点击确定重新登录?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }).then(() => {
            router.push('/login')
          })
        })
        break
      default:
        if (msg) {
          Message.error(msg)
        }
        return Promise.resolve(res)
    }
  },
  (err) => {
    Message.error('Service error.')
    return Promise.reject(err)
  }
)

export default instance
