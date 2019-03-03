const state = {
  user: null
}

const getters = {
  check: state => !!state.user,
  username: state => state.user ? state.user.name : ''
}

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
  },
  async currentUser ({ commit }) {
    const { data } = await axios.get('/api/user')
    const user = data || null
    commit('setUser', user)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
