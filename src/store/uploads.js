// import Vue from 'vue'
import axios from '../axios'

import { objectToFormData } from 'object-to-formdata'

import prototype from './prototypes/base'

const state = () => ({
  list: {}
})

const getters = {
  forWorkspace: (state) => (workspaceId) => {
    return Object.values(state.list).filter(upload => upload.workspace_id === workspaceId)
  }
}

const actions = {
  index ({ commit }, params) {
    return axios
      .get('/workspaces/' + params.workspaceId + '/uploads')
      .then((res) => {
        commit('insert', res.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  show ({ commit }, params) {
    return axios
      .get('/workspaces/' + params.workspaceId + '/uploads' + params.uploadId)
      .then((res) => {
        commit('insert', res.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  create ({ state, commit }, params) {
    const axiosPath = '/workspaces/' + params.workspaceId + '/uploads'
    const axiosHeaders = { headers: { 'Content-Type': 'multipart/form-data' } }

    const formData = objectToFormData(params.data)

    return axios
      .post(axiosPath, formData, axiosHeaders)
      .then((res) => {
        commit('insert', res.data)
        return Promise.resolve(state.list[res.data.id])
      })
      .catch((error) => {
        return Promise.reject(error.response.data)
      })
  }
}

const mutations = {
  insert (state, payload) {
    const isArray = Array.isArray(payload)
    const uploads = isArray ? payload : [payload]
    uploads.map((upload) => {
      state.list[upload.id] = { ...state.list[upload.id], ...prototype, ...upload }
    })
  }
}

const uploads = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

export default uploads
