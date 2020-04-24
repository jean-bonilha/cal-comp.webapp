const setList = async ({ commit }, get) => {
  const { data } = await get('/dqcmodel')
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
