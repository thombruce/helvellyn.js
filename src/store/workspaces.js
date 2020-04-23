import Vue from 'vue'
import axios from '../axios'

import prototype from './prototypes/workspace'

const state = () => ({
  list: {}
})

const getters = {}

const actions = {
  index ({ commit }, _params) {
    return axios
      .get('/workspaces')
      .then((res) => {
        commit('insert', res.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  show ({ commit }, params) {
    return axios
      .get('/workspaces/' + params.workspaceId)
      .then((res) => {
        commit('insert', res.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  create ({ state, commit }, params) {
    return axios
      .post('/workspaces', params.data)
      .then((res) => {
        commit('insert', res.data)
        return Promise.resolve(state.list[res.data.slug])
      })
      .catch((error) => {
        return Promise.reject(error.response.data)
      })
  },
  update ({ state, commit }, params) {
    return axios
      .patch('/workspaces/' + params.workspaceId, params.data)
      .then((res) => {
        commit('modify', { slug: params.workspaceId, data: res.data })
        return Promise.resolve(state.list[res.data.slug])
      })
      .catch((error) => {
        return Promise.reject(error.response.data)
      })
  },
  token ({ state, commit }, params) {
    return axios
      .patch('/workspaces/' + params.workspaceId + '/token')
      .then((res) => {
        commit('modify', { slug: params.workspaceId, data: res.data })
        return Promise.resolve(state.list[res.data.slug])
      })
      .catch((error) => {
        return Promise.reject(error.response.data)
      })
  },
  destroy ({ commit }, params) {
    return axios
      .delete('/workspaces/' + params.workspaceId)
      .then((res) => {
        commit('remove', params.workspaceId)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}

const mutations = {
  insert (state, payload) {
    const isArray = Array.isArray(payload)
    const workspaces = isArray ? payload : [payload]
    workspaces.map((workspace) => {
      state.list[workspace.slug] = { ...state.list[workspace.slug], ...prototype, ...workspace }
    })
  },
  modify (state, params) {
    state.list[params.data.slug] = { ...state.list[params.slug], ...prototype, ...params.data }
    if (params.slug !== params.data.slug) {
      Vue.delete(state.list, params.slug)
    }
  },
  addUsers (state, params) {
    state.list[params.workspaceId] = { ...state.list[params.workspaceId], ...prototype, ...{ users: params.users } }
  },
  remove (state, id) {
    Vue.delete(state.list, id)
  }
}

const workspaces = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

export default workspaces
