import moment from 'moment'

const setList = async ({ commit }, axiosGet) => {
  const { data } = await axiosGet('/dqc841')
  const list = data.data.map(item => {
    item.UPDATE_DT = moment(item.UPDATE_DT).format('DD/MM/YYYY hh:mm:ss')
    item.CREATE_DT = moment(item.CREATE_DT).format('DD/MM/YYYY hh:mm:ss')
    return item
  })
  commit('SET_LIST', list)
}

const setSelectOptions = async ({ commit }, axiosGet) => {
  const { data } = await axiosGet('/dqc84')
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      commit('SET_SELECT_OPTIONS', data.data)
      resolve()
    }, 500)
  })
}

const removeItem = async ({ commit }, { axiosDelete, item }) => {
  const res = await axiosDelete(`/dqc841/${item.ID}`)
  return res
}

const leanList = (state) => state.list.map(item => item.PARTS_NO)

const SET_LIST = (state, payload) => {
  state.list = payload
}

const SET_SELECT_OPTIONS = (state, payload) => {
  state.selectOptions = payload
}

export default {
  namespaced: true,
  actions: {
    setList,
    setSelectOptions,
    removeItem,
  },
  getters: {
    leanList,
  },
  mutations: {
    SET_LIST,
    SET_SELECT_OPTIONS,
  },
  state: {
    list: [],
    selectOptions: [],
  },
}
