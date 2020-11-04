import Vue from 'vue'
import Vuex from 'vuex'

import {parseToken} from '../utils/jwt'

Vue.use(Vuex)

let localStorageEnabled = true
try {
  localStorage.setItem('storageTest', 'value')
  if (localStorage.getItem('storageTest') !== 'value') {
    localStorage.removeItem('storageTest');
  }
  localStorage.removeItem('storageTest');
} catch (e) {
  console.error('We can\'t remember your login through localStorage, please disable Incognito Mode')
  localStorageEnabled = false
}

const state = {
  token: '',
  uid: 0,
  username: '',
  isLogin: false,

  queryType: '',
  queryContent: '',
}

const getters = {
  token(state) {
    if (!state.token && localStorageEnabled)
      state.token = localStorage.getItem('token')
    return state.token
  },
  uid(state) {
    if (!state.uid && localStorageEnabled)
      state.uid = localStorage.getItem('uid')
    return state.uid
  },
  username(state) {
    if (!state.username && localStorageEnabled)
      state.username = localStorage.getItem('username')
    return state.username
  },
  isLogin(state) {
    if (!state.token && localStorageEnabled)
      state.token = localStorage.getItem('token')
    return state.token && state.token !== ''
  },

  query(state) {
    if (state.queryType) {
      let res = {}
      res[state.queryType] = state.queryContent
      return res
    }
    return null
  },
  queryString(state) {
    if (state.queryType) {
      if (state.queryType === 'title')
        return state.queryContent
      else
        return `${state.queryType}=${state.queryContent}`
    }
    return ''
  }
}

const mutations = {
  login(state, token) {
    let res = parseToken(token)
    if (res) {
      localStorage.setItem('token', token)
      localStorage.setItem('uid', res.uid)
      localStorage.setItem('username', res.username)
      state.token = token
      state.uid = res.uid
      state.username = res.username
      state.isLogin = true
    }
  },
  logout(state) {
    localStorage.removeItem('token')
    localStorage.removeItem('uid')
    localStorage.removeItem('username')
    state.token = ''
    state.uid = 0
    state.username = ''
    state.isLogin = false
  },
  search(state, query) {
    state.queryType = query.type
    state.queryContent = query.content
  },
  consumeSearch(state) {
    state.queryType = ''
    state.queryContent = ''
  }
}

const actions = {
  login(context, token) {
    context.commit('login', token)
  },
  logout(context) {
    context.commit('logout')
  },
  search(context, query) {
    context.commit('search', query)
  },
  consumeSearch(context) {
    context.commit('consumeSearch')
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
