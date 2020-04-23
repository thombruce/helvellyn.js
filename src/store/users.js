import Vue from 'vue'
import axios from '../axios'

import prototype from './prototypes/base'

const state = () => ({
  list: {}
})

const getters = {
  forWorkspace: (state, getters, rootState) => (workspaceId) => {
    return rootState.workspaces.list[workspaceId].users
  }
}

const actions = {
  index ({ commit }, params) {
    return axios
      .get('/workspaces/' + params.workspaceId + '/users')
      .then((res) => {
        commit('insert', res.data)
        commit('workspaces/addUsers', { workspaceId: params.workspaceId, users: res.data }, { root: true }) // TODO: IDs only
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  show ({ commit }, params) {
    return axios
      .get('/workspaces/' + params.workspaceId + '/users/' + params.userId)
      .then((res) => {
        commit('insert', res.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  invite ({ state, commit }, params) {
    return axios
      .post('/workspaces/' + params.workspaceId + '/users/invite', params.data)
      .then((res) => {
        commit('insert', res.data)
      })
      .catch((error) => {
        console.log(error)
      })
  },
  update ({ state, commit }, params) {
    return axios
      .patch('/workspaces/' + params.workspaceId + '/users/' + params.userId, params.data)
      .then((res) => {
        commit('insert', res.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

const mutations = {
  insert (state, payload) {
    const isArray = Array.isArray(payload)
    const users = isArray ? payload : [payload]
    users.map((user) => {
      state.list[user.id] = { ...state.list[user.id], ...prototype, ...user }
    })
  },
  remove (state, id) {
    Vue.delete(state.list, id)
  }
}

const users = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

export default users
