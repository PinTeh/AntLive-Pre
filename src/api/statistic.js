import request from '@/utils/request'

export default {
  getStatView(params) {
    return request({
      url: '/api/v1/statistic/stat/view/list',
      method: 'get',
      params,
    })
  },
  getStatSpeak(params) {
    return request({
      url: '/api/v1/statistic/stat/speak/list',
      method: 'get',
      params,
    })
  },
}
