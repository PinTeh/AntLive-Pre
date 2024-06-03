import request from '@/utils/request'

export default {
  /**
   * 查询分类
   * @param {*} data
   * @returns
   */
  queryCategory(params) {
    return request({
      url: '/api/v1/category/query',
      method: 'get',
      params,
    })
  },
}
