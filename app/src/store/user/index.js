import { register, login } from "../../api"
import TMessage from '@/components/TMessage/TMessage.js'
import Axios from 'axios'

// 拦截错误信息
Axios.interceptors.response.use(response => {
  return response
}, error => {
  // 在这里做同意错误提示
  let {message, errorDetails} = error.response.data
  // if (errorDetail) {
  //   message += ':' + errorDetails
  // }
  TMessage.error(message + ':' + errorDetails)
  throw error
})

Axios.interceptors.request.use(configs => {
  try {
    let data = JSON.parse(localStorage.getItem('user'))
    if (data.authorization) {
      configs.headers.common.authorization = data.authorization
    }
  } catch (e) {}
  return configs
})

export default {
  namespaced: true,
  state: () => ({
    info: null
  }),
  mutations: {
    initUserInfo: state => {
      try {
        let user = JSON.parse(localStorage.getItem('user'))
        state.info = user
      } catch (e) {}
    },
    updateUserInfo: (state, data) => {
      state.info = data;
      localStorage.setItem('user', JSON.stringify(data))
    },
    removeUserInfo: (state, data) => {
      state.info = null;
      localStorage.removeItem('user')
    }
  },
  actions: {
    register: ({}, data) => {
      return register(data)
    },
    async login ({commit}, data) {
      try {
        let res = await login(data)
        // console.log('res', res);
        commit('updateUserInfo', {
          id: res.data.id,
          name: res.data.name,
          authorization: res.headers.authorization
        })
        return res
      } catch (e) {
        throw e
      }
    },
    logout: async ({commit}) => {
      commit('removeUserInfo')
    }
  }
}