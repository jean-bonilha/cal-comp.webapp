const state = {
  isAuthenticated: false,
}

const mutations = {
  setIsAuthenticated (state, isAuthenticated) {
    state.isAuthenticated = isAuthenticated
  },
}

const actions = {
  login ({ commit }, user) {
    commit('setIsAuthenticated', true)
  },
}

export default {
  state,
  mutations,
  actions,
}
