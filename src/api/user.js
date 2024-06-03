import request from '@/utils/request'

export default {
  /**
   * 注册
   * @param {*} data
   * @returns
   */
  register(data) {
    return request({
      url: '/api/v1/user/register',
      method: 'post',
      data,
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
  /**
   * 绑定安全认证信息（手机、邮箱）
   * @param {*} data
   * @returns
   */
  bindSecurityInfo(data) {
    return request({
      url: '/api/v1/user/bind',
      method: 'post',
      data,
    })
  },
  /**
   * 获取安全绑定信息
   * @returns
   */
  getSecurityInfo() {
    return request({
      url: '/api/v1/user/getSecurityInfo',
      method: 'get',
    })
  },
  /**
   * 更新用户信息
   * @param {*} data
   * @returns
   */
  updateUserInfo(data) {
    return request({
      url: '/api/v1/user/info/update',
      method: 'post',
      data,
    })
  },
  /**
   * 获取当前用户信息
   */
  getUserInfo() {
    return request({
      url: '/api/v1/user/info',
      method: 'post',
    })
  },
  /**
   * 验证token有效性
   * @param {*} params
   * @returns
   */
  verifyToken(params) {
    return request({
      url: '/api/v1/user/verify/token',
      method: 'get',
      params,
    })
  },
}
