const state = {
  user: null
}

const getters = {}

const mutations = {
  setUser (state, user) {
    state.user = user
  }
}

const actions = {
  async register ({ commit }, payload) {
    const { data } = await axios.post('/api/register', payload)
    commit('setUser', data)
  },
  async login ({ commit }, payload) {
    const { data } = await axios.post('/api/login', payload)
    commit('setUser', data)
  },
  async logout ({ commit }, payload) {
    await axios.post('/api/logout', payload)
    commit('setUser', null)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
