import moment from 'moment'

const removeItem = async ({ commit }, { axiosDelete, item }) => {
  const res = await axiosDelete(`/dqcmodel/${item.ID}`)
  return res
}

const setList = async ({ commit }, axiosGet) => {
  const { data } = await axiosGet('/dqcmodel')
  const list = data.map(item => {
    item.UPDATE_DT = moment(item.UPDATE_DT).format('DD/MM/YYYY hh:mm:ss')
    item.CREATE_DT = moment(item.CREATE_DT).format('DD/MM/YYYY hh:mm:ss')
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
    removeItem,
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
