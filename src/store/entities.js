import Vue from 'vue'
import axios from '../axios'

import prototype from './prototypes/base'

const state = () => ({
  list: {}
})

const getters = {
  forTemplate: (state) => (templateId) => {
    return Object.values(state.list).filter(entity => entity.template_id === templateId)

    // NOTE: The below uses the same approach but returns an Object, rather than an Array.
    //       I don't know that there's any reason an Array won't do.

    // let entriesForTemplate = {}
    // Object.values(state.list)
    //       .filter(entity => entity.template_id === templateId)
    //       .forEach((entity) => {
    //         entriesForTemplate[entity.slug] = { ...prototype, ...entity }
    //       })
    // return entriesForTemplate
  },
  findBySlug: (state) => (templateId, slug) => {
    // TODO: This would do better to allow a hash of params and inclusively use them in the find function below.
    return Object.values(state.list).find(
      entity => (entity.template_id === templateId) && (entity.slug === slug)
    )
  }
}

const actions = {
  index ({ commit }, params) {
    const workspaceId = params.workspaceId
    const templateId = params.templateId
    const query = params.query

    return axios
      .get('/workspaces/' + workspaceId + '/templates/' + templateId + '/entities', { params: query })
      .then((res) => {
        commit('insert', res.data)
        return res.data
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  show ({ commit }, params) {
    const workspaceId = params.workspaceId
    const templateId = params.templateId
    const entityId = params.entityId

    return axios
      .get('/workspaces/' + workspaceId + '/templates/' + templateId + '/entities/' + entityId)
      .then((res) => {
        commit('insert', res.data)
        return res.data
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  create ({ state, commit }, params) {
    const workspaceId = params.workspaceId
    const templateId = params.templateId
    const payload = params.data

    return axios
      .post('/workspaces/' + workspaceId + '/templates/' + templateId + '/entities', payload)
      .then((res) => {
        commit('insert', res.data)
        return Promise.resolve(state.list[res.data.slug]) // TODO: How should this be altered?
      })
      .catch((error) => {
        return Promise.reject(error.response.data)
      })
  },
  update ({ state, commit }, params) {
    const workspaceId = params.workspaceId
    const templateId = params.templateId
    const entityId = params.entityId
    const payload = params.data

    return axios
      .patch('/workspaces/' + workspaceId + '/templates/' + templateId + '/entities/' + entityId, payload)
      .then((res) => {
        commit('modify', { slug: params.entityId, data: res.data })
        return Promise.resolve(state.list[res.data.slug]) // TODO: How should this be altered?
      })
      .catch((error) => {
        return Promise.reject(error.response.data)
      })
  },
  destroy ({ commit }, params) {
    const workspaceId = params.workspaceId
    const templateId = params.templateId
    const entityId = params.entityId

    return axios
      .delete('/workspaces/' + workspaceId + '/templates/' + templateId + '/entities/' + entityId)
      .then((res) => {
        commit('remove', params.entityId)
        // TODO: What should be returned here?
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}

const mutations = {
  insert (state, payload) {
    const isArray = Array.isArray(payload)
    const entities = isArray ? payload : [payload]
    entities.map((entity) => {
      state.list[entity.slug] = { ...state.list[entity.slug], ...prototype, ...entity }
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

const entities = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

export default entities
