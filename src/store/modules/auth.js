const state = {
  isAuthenticated: false,
  user: {
    name: 'Guest',
    email: null,
  },
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
