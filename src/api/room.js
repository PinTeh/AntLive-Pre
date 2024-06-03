import request from '@/utils/request'

export default {
  /**
   * 保存直播间信息
   * @param {*} data
   * @returns
   */
  saveRoomInfo(data) {
    return request({
      url: '/api/v1/room/info/save',
      method: 'post',
      data,
    })
  },
  /**
   * 获取直播间信息
   * @param {*} params
   * @returns
   */
  getRoomInfo(params) {
    return request({
      url: '/api/v1/room',
      method: 'get',
      params,
    })
  },
  /**
   * 获取正在直播的房间
   * @param {*} params
   * @returns
   */
  getLivingRooms(params) {
    return request({
      url: '/api/v1/room/living',
      method: 'get',
      params,
    })
  },
  /**
   * 获取直播间配置信息
   * @returns
   */
  getRoomSettingInfo() {
    return request({
      url: '/api/v1/room/setting/info',
      method: 'get',
    })
  },
  getRoomExtraInfo(params) {
    return request({
      url: '/api/v1/room/extra/info',
      method: 'get',
      params,
    })
  },
}
