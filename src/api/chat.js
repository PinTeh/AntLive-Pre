import request from '@/utils/request'

export default {
  sendChatMsg(data) {
    return request({
      url: '/api/v1/chat/sendMsg',
      method: 'post',
      data,
    })
  },
  getPopularity(params) {
    return request({
      url: '/api/v1/chat/getPopularity',
      method: 'get',
      params,
    })
  },
}
