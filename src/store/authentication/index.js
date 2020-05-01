import { authAPI as axios } from '../../axios'

import tokens from './tokens'
import account from './account'

const actions = {
  login ({ dispatch, rootGetters }, payload) {
    return axios
      .post('/login', payload)
      .then((res) => {
        const refreshToken = res.data.refresh_token
        const accessToken = res.data.access_token

        dispatch('authentication/tokens/create', { refreshToken, accessToken }, { root: true })

        return rootGetters['authentication/tokens/currentSession']
      })
      .catch((error) => {
        return Promise.reject(error.response.data)
      })
  },
  signup ({ dispatch, rootGetters }, payload) {
    return axios
      .post('/signup', payload)
      .then((res) => {
        const refreshToken = res.data.refresh_token
        const accessToken = res.data.access_token

        dispatch('authentication/tokens/create', { refreshToken, accessToken }, { root: true })

        return rootGetters['authentication/tokens/currentSession']
      })
      .catch((error) => {
        return Promise.reject(error.response.data)
      })
  },
  confirm ({ dispatch, rootGetters }, params) {
    return axios
      .get('/confirm/' + params.confirmation_token, { params: { email: params.email } })
      .then((res) => {
        const refreshToken = res.data.refresh_token
        const accessToken = res.data.access_token

        dispatch('authentication/tokens/create', { refreshToken, accessToken }, { root: true })

        return rootGetters['authentication/tokens/currentSession']
      })
      .catch((error) => {
        return Promise.reject(error.response.data)
      })
  },
  resetPassword (_context, payload) {
    return axios
      .post('/reset_password', payload)
      .then((res) => {
        return true
      })
      .catch((error) => {
        return Promise.reject(error.response.data)
      })
  },
  signout ({ dispatch }) {
    return axios
      .delete('/signout')
      .then((res) => {
        dispatch('authentication/tokens/destroy', { root: true })
        return true
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

const authentication = {
  namespaced: true,
  actions,
  modules: {
    tokens,
    account
  }
}

export default authentication
