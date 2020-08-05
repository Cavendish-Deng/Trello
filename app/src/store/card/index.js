import * as api from '@/api'

export default {
  namespaced: true,
  state: {
    cards: []
  },
  mutations: {
    removeAttachment: (state, data) => {
      state.cards = state.cards.map(card => {
        if (card.id == data.cardId) {
          return {
            ...card,
            attachments: card.attachments.filter(attachment => attachment.id != data.id)
          }
        }
        return card;
      });
    },

    setCover: (state, data) => {
      state.cards = state.cards.map(card => {
        if (card.id == data.cardId) {
          return {
            ...card,
            attachments: card.attachments.map(attachment => {
              return {
                ...attachment,
                isCover: attachment.id == data.id
              }
            })
          }
        }
        return card;
      });
    },

    removeCover: (state, data) => {
      state.cards = state.cards.map(card => {
        if (card.id == data.cardId) {
          return {
            ...card,
            attachments: card.attachments.map(attachment => {
              return {
                ...attachment,
                isCover: false
              }
            })
          }
        }
        return card;
      });
    },
    getCards: (state, data) => {
      state.cards = state.cards.concat(data)
    },
    addCard: (state, data) => {
      state.cards = state.cards.concat(data)
    },
    updateCard: (state, data) => {
      state.cards = state.cards.map(card => {
        if (card.id === data.id) {
          return { ...card, ...data }
        }
        return card
      })
    },
    addAttachment: (state, data) => {
      state.cards = state.cards.map(card => {
        if (card.id === data.boardListCardId) {
          return {
            ...card,
            attachments: [...card.attachments, data]
          }

        }
        return card;
      })
    }
  },
  getters: {
    getCards: ({ cards }) => boardListId => cards.filter(card => card.boardListId == boardListId),

    getCard: ({ cards }) => cardId => cards.find(card => card.id == cardId)
  },
  actions: {
    getCards: async ({ commit }, boardListId) => {
      try {
        let res = await api.getCards(boardListId)
        commit('getCards', res.data)
        return res
      } catch (e) {

      }
    },
    postCard: async ({ commit }, data) => {
      try {
        let res = await api.postCard(data)
        commit('addCard', res.data)
        return res
      } catch (e) {

      }
    },
    editCard: async ({ commit }, data) => {
      try {
        let res = await api.putCard(data)
        commit('updateCard', data)
        return res
      } catch (e) {

      }
    },
    uploadAttachment: async ({ commit }, data) => {
      try {
        let res = await api.uploadAttachment(data)
        commit('addAttachment', data)
        return res
      } catch (e) {

      }
    },
    setCover: async ({ commit }, data) => {
      try {
        let res = await api.setCover(data)
        commit('setCover', data)
        return res
      } catch (e) {

      }
    },
    removeCover: async ({ commit }, data) => {
      try {
        let res = await api.removeCover(data)
        commit('removeCover', data)
        return res
      } catch (e) {

      }
    },
    removeAttachment: async ({ commit }, data) => {
      try {
        let res = await api.removeAttachment(data)
        commit('removeAttachment', data)
        return res
      } catch (e) {

      }
    }
  }
}