import Vue from 'vue'
import Vuex from 'vuex'
import {
  setToken,
  removeAll,
  setLocalUserInfo,
  getLocalUserInfo,
  getToken,
} from '../utils/auth'
import Api from '../api'
import UserApi from '../api/user'
import LiveApi from '../api/live'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userInfo: null,
    token: '',
    webSocket: {
      rid: '',
      socket: '',
    },
    categorys: [],
    currentSelectCategory: {},
    menu: [],
  },
  getters: {
    foo(state) {
      return '￥' + state.token
    },
    //调用方式store.getters.foo
    // `拼接${state.xx}字符`
  },
  mutations: {
    setCurrentSelectCategory(state, v) {
      state.currentSelectCategory = v
    },
    setUserInfo(state, v) {
      state.userInfo = v
    },
    setUserInfoUpdate(state, v) {
      if (v.avatar) {
        state.userInfo.avatar = v.avatar
      }
      if (v.nickName) {
        state.userInfo.nickName = v.nickName
      }
    },
    setStateToken(state, v) {
      state.token = v
    },
    setWebSocket(state, v) {
      state.webSocket = v
    },
    setCatrgorys(state, v) {
      state.categorys = v
    },
    setAdminMenu(state, v) {
      state.menu = v
    },
  },
  actions: {
    foo({ commit }, e) {
      commit('foo', e)
    },
    init({ commit }) {
      return new Promise((resolve) => {
        commit('setStateToken', getToken())
        commit('setUserInfo', JSON.parse(getLocalUserInfo()))
        resolve()
      })
    },
    login({ commit }, e) {
      return new Promise((resolve, reject) => {
        Api.login(e.username, e.password)
          .then((res) => {
            const { token, user, menu } = res.data.data
            if (res.data.code == 0) {
              commit('setStateToken', token)
              commit('setUserInfo', user)
              commit('setAdminMenu', menu)
              // 放置token在localstorage中
              setToken(token)
              setLocalUserInfo(JSON.stringify(user))
            }
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    logout({ commit }) {
      return new Promise((resolve) => {
        commit('setStateToken', null)
        commit('setUserInfo', null)
        commit('setAdminMenu', null)
        removeAll()
        resolve()
      })
    },
    register(_, e) {
      return new Promise((resolve, reject) => {
        UserApi.register(e)
          .then((res) => {
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    sendCode({ commit }, account) {
      return new Promise((resolve, reject) => {
        Api.sendCode(account)
          .then(() => {
            commit('')
          })
          .catch((error) => {
            reject(error)
          })
        resolve()
      })
    },
    getCategorys({ commit }) {
      return new Promise((resolve, reject) => {
        LiveApi.queryCategories({
          limit: 10,
          page: 1,
        })
          .then((res) => {
            let categorys = res.data.data.list
            commit('setCatrgorys', categorys)
          })
          .catch((error) => {
            reject(error)
          })
        resolve()
      })
    },
  },
})

export default store
