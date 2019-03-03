import { OK, UNPROCESSABLE_ENTITY, CREATED } from '../util'

const state = {
  user: null,
  apiStatus: null,
  loginErrorMessages: null,
  registerErrorMessages: null
}

const getters = {
  check: state => !!state.user,
  username: state => state.user ? state.user.name : ''
}

const mutations = {
  setUser (state, user) {
    state.user = user
  },
  setApiStatus (state, status) {
    state.apiStatus = status
  },
  setLoginErrorMessages (state, messages) {
    state.loginErrorMessages = messages
  },
  setRegisterErrorMessages (state, messages) {
    state.registerErrorMessages = messages
  }
}

const actions = {
  async register ({ commit }, payload) {
    commit('setApiStatus', null)
    const { status, data } = await axios.post('/api/register', payload)

    if (status === CREATED) {
      context.commit('setApiStatus', true)
      context.commit('setUser', data)
      return false
    }

    commit('setApiStatus', false)
    if (status === UNPROCESSABLE_ENTITY) {
      commit('setRegisterErrorMessages', data.errors)
    } else {
      commit('error/setCode', status, { root: true })
    }
  },

  async login ({ commit }, payload) {
    commit('setApiStatus', null)
    const { status, data } = await axios.post('/api/login', payload)

    if (status === OK) {
      commit('setApiStatus', true)
      commit('setUser', data)
      return false
    }

    commit('setApiStatus', false)
    if (status === UNPROCESSABLE_ENTITY) {
      commit('setLoginErrorMessages', data.errors)
    } else {
      commit('error/setCode', status, { root: true })
    }
  },

  async logout ({ commit }, payload) {
    commit('setApiStatus', null)
    const { status } = await axios.post('/api/logout', payload)

    if (status === OK) {
      commit('setApiStatus', true)
      commit('setUser', null)
      return false
    }

    commit('setApiStatus', false)
    commit('error/setCode', status, { root: true })
  },

  async currentUser ({ commit }) {
    commit('setApiStatus', null)

    const { status, data } = await axios.get('/api/user')
    const user = data || null

    if (status === OK) {
      commit('setApiStatus', true)
      commit('setUser', user)
      return false
    }

    commit('setApiStatus', false)
    commit('error/setCode', status, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
