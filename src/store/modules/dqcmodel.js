import moment from 'moment'

const setList = async ({ commit }, get) => {
  const { data } = await get('/dqcmodel')
  const list = data.map(item => {
    item.UPDATE_DT = moment(item.UPDATE_DT).format('DD/MM/YYY hh:mm:ss')
    item.CREATE_DT = moment(item.CREATE_DT).format('DD/MM/YYY hh:mm:ss')
    return item
  })
  commit('SET_LIST', list)
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
