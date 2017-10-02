import Vue from 'vue'
import * as types from './mutation-types'
import initialState from './initialState'

export default {

  [types.SAVE_USER_HOMES] (state, payload) {
    state.homes = payload
  },

  [types.LOG_USER_OUT] (state) {
    let reset = initialState()
    for (let k in state) {
      Vue.set(state, k, reset[k])
    }
  },

  [types.SAVE_USER] (state, payload) {
    state.id = payload.uid
    state.email = payload.email
    state.displayName = payload.displayName
  },

  [types.ERROR_LOGIN] (state, payload) {
    state.errors.login = payload.errorMsg
  },

  [types.SET_SELECTED_HOME] (state, selectedHome) {
    state.selectedHome = selectedHome
  },

  [types.SAVE_DEVICE_VIEW_LIST] (state, devicesViewList) {
    state.devicesView = devicesViewList
  }
}
