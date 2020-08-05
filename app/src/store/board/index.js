import * as api from '@/api'

export default {
  namespaced: true,
  state: () => ({
    // 设置为 null 的原因是，用来判断是首次获取还是获取的数据为空数组，所有这里不能设置为空数组
    boards: null,
    inited: false
  }),
  mutations: {
    updateBoards: (state, data) => {
      state.boards = data
    },
    addBoard: (state, data) => {
      if (state.boards === null) {
        state.boards = []
      }
      // console.log('data', data);
      state.boards = state.boards.concat(data)
    }
  },
  getters: {
    getBoard: ({boards}) => id => Array.isArray(boards) ? boards.find(board => board.id == id) : null

  },
  actions: {
    getBoard: async ({commit}, id) => {
      let res = await api.getBoard(id)
      commit('addBoard', res.data)
      return res
    },
    getBoards: async({commit}) => {
      try {
        let res = await api.getBoards()
        // console.log('res', res);
        commit('updateBoards', res.data)
        return res
      } catch(e) {
        throw e
      }
    },
    postBoard: async ({commit}, data) => {
      try {
        let res = await api.postBoard(data)
        commit('addBoard', data)
        return res
      } catch(e) {

      }
    }
  },
}