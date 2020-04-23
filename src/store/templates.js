import Vue from 'vue'
import axios from '../axios'

import prototype from './prototypes/base'

const state = () => ({
  list: {}
})

const getters = {
  forWorkspace: (state) => (workspaceId) => {
    return Object.values(state.list).filter(template => template.workspace_id === workspaceId)
  },
  findBySlug: (state) => (workspaceId, slug) => {
    // TODO: This would do better to allow a hash of params and inclusively use them in the find function below.
    return Object.values(state.list).find(
      template => (template.workspace_id === workspaceId) && (template.slug === slug)
    )
  }
}

const actions = {
  index ({ commit }, params) {
    return axios
      .get('/workspaces/' + params.workspaceId + '/templates')
      .then((res) => {
        commit('insert', res.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  show ({ commit }, params) {
    return axios
      .get('/workspaces/' + params.workspaceId + '/templates/' + params.templateId)
      .then((res) => {
        commit('insert', res.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  create ({ state, commit }, params) {
    return axios
      .post('/workspaces/' + params.workspaceId + '/templates', params.data)
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
      .patch('/workspaces/' + params.workspaceId + '/templates/' + params.templateId, params.data)
      .then((res) => {
        commit('modify', { slug: params.templateId, data: res.data })
        return Promise.resolve(state.list[res.data.slug])
      })
      .catch((error) => {
        return Promise.reject(error.response.data)
      })
  },
  destroy ({ commit }, params) {
    return axios
      .delete('/workspaces/' + params.workspaceId + '/templates/' + params.templateId)
      .then((res) => {
        commit('remove', params.templateId)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}

const mutations = {
  insert (state, payload) {
    const isArray = Array.isArray(payload)
    const templates = isArray ? payload : [payload]
    templates.map((template) => {
      state.list[template.slug] = { ...state.list[template.slug], ...prototype, ...template }
    })
  },
  modify (state, params) {
    state.list[params.data.slug] = { ...state.list[params.slug], ...prototype, ...params.data }
    if (params.slug !== params.data.slug) {
      Vue.delete(state.list, params.slug)
    }
  },
  remove (state, slug) {
    Vue.delete(state.list, slug)
  }
}

const templates = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

export default templates
