import * as api from '@/api'

export default {
  namespaced: true,
  state: {
    lists: []
  },
  mutations: {
    updateLists: (state, data) => {
      state.lists = [...state.lists, ...data]
    },
    addList: (state, data) => {
      state.lists = state.lists.concat(data)
    },
    updateList: (state, data) => {
      state.lists = state.lists.map( list => {
        if (list.id === data.id) {
          return {...list, ...data};
        }
        return list;
      });
    }
  },
  getters: {
    getLists: ({lists}) => boardId => lists.filter(list => list.boardId == boardId),
    getList: ({lists}) => listId => lists.find(list => list.id == listId)
  },
  actions: {
    getLists: async ({commit}, boardId) => {
      try {
        let res = await api.getLists(boardId);
        commit('updateLists', res.data)
        return res
      } catch(e) {}
    },
    postLists: async ({commit}, data) => {
      try {
        let res = await api.postLists(data);
        // console.log('res.data', res.data);
        commit('addList', res.data)
        return res
      } catch(e) {}
    },
    editList: async ({commit}, data) => {
      try {
        let res = await api.putList(data);
        commit('updateList', data)
        return res
      } catch(e) {}
    }
  }
}