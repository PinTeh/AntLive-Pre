import request from '@/utils/request'

export default {
  /**
   * 获取直播分类
   * @param {*} data
   * @returns
   */
  queryCategories(params) {
    return request({
      url: '/api/v1/category/query',
      method: 'get',
      params,
    })
  },
  /**
   * 生成验证码
   * @param {*} data
   * @returns
   */
  generateVerifyCode(data) {
    return request({
      url: '/api/v1/user/generateVerifyCode',
      method: 'post',
      data,
    })
  },
  getLiveStatus() {
    return request({
      url: '/api/v1/live/getLiveStatus',
      method: 'get',
    })
  },
  applySecret() {
    return request({
      url: '/api/v1/live/applySecret',
      method: 'post',
    })
  },
  stopLive() {
    return request({
      url: '/api/v1/live/stopLive',
      method: 'post',
    })
  },
}
