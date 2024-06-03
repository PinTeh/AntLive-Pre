import request from '@/utils/request'

export default {
  /**
   * 保存直播间关注关系信息
   * @param {*} data
   * @returns
   */
  saveRelation(data) {
    return request({
      url: '/api/v1/watch/relation/save',
      method: 'post',
      data,
    })
  },
  listWatches(params) {
    return request({
      url: '/api/v1/watch/list',
      method: 'get',
      params,
    })
  },
  clearHistory() {
    return request({
      url: '/api/v1/watch/history/clear',
      method: 'post',
    })
  },
}
