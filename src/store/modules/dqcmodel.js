import axios from 'axios'

const setList = async ({ commit }, params) => {
  const { data } = await axios.get('http://localhost/api/dqcmodel', { params })
  commit('SET_LIST', data)
}

const leanList = (state) => state.list.map(item => item.PARTS_NO)

const SET_LIST = (state, payload) => {
  state.list = payload
}

export default {
  namespaced: true,
  actions: {
    setList,
  },
  getters: {
    leanList,
  },
  mutations: {
    SET_LIST,
  },
  state: {
    list: [],
  },
}
