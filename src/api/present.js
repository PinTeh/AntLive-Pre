import request from '@/utils/request'

export default {
  /**
   * 保存直播间关注关系信息
   * @param {*} data
   * @returns
   */
  listPresents() {
    return request({
      url: '/api/v1/present/list',
      method: 'get',
    })
  },
  /**
   * 直播间礼物赠送
   * @param {*} data
   * @returns
   */
  liveReward(data) {
    return request({
      url: '/api/v1/present/live/reward',
      method: 'post',
      data,
    })
  },
}
