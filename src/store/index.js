import Vue from 'vue'
import Vuex from 'vuex'

import settings from './settings'

import authentication from './authentication'

import workspaces from './workspaces'
import users from './users'
import templates from './templates'
import entities from './entities'
Vue.use(Vuex)

const state = () => ({
  packageVersion: process.env.PACKAGE_VERSION || '0'
})

const getters = {
  appVersion: (state) => {
    return state.packageVersion
  }
}

const actions = {
  login ({ dispatch }, payload) { // A shortcut for...
    return dispatch('authentication/login', payload)
  },
  signup ({ dispatch }, payload) { // A shortcut for...
    return dispatch('authentication/signup', payload)
  },
  signout ({ dispatch }) { // A shortcut for...
    return dispatch('authentication/signout')
  }
}

const store = new Vuex.Store({
  state,
  getters,
  actions,
  modules: {
    settings,
    authentication,
    workspaces,
    users,
    templates,
    entities
  }
})

export default store
