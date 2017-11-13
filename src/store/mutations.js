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
    state.defaultHome = payload.defaultHome
  },

  [types.ERROR_LOGIN] (state, payload) {
    state.errors.login = payload.errorMsg
  },

  [types.SET_SELECTED_HOME] (state, selectedHome) {
    state.selectedHome = selectedHome
  },

  [types.SAVE_DEVICE_VIEW_LIST] (state, { devicesViewList, homeId }) {
    state.homes = {
      ...state.homes,
      [homeId]: {
        ...state.homes[homeId],
        devicesViewList
      }
    }
  },

  [types.ADD_AUTOCOMPLETE_FIELDS] (state, {homeId, deviceId}) {
    const primaryStateStatus = state.homes[homeId].devicesViewList[deviceId].primaryStateStatus
    const alias = state.homes[homeId].devicesViewList[deviceId].alias
    state.homes[homeId].devicesViewList[deviceId] = {
      ...state.homes[homeId].devicesViewList[deviceId],
      stamp: primaryStateStatus,
      label: alias
    }
  },

  [types.DEVICE_PRIMARY_STATE_UPDATE] (state, { homeId, deviceId, primaryStateStatus }) {
    state.homes[homeId].devicesViewList[deviceId] = {
      ...state.homes[homeId].devicesViewList[deviceId],
      primaryStateStatus
    }
  },

  [types.INITIAL_STATE_NOT_LOADING] (state) {
    state.appState.isLoadingInitialState = false
  },

  [types.CLEANUP_SUBSCRIPTIONS] (state) {
    state.appState.activeSubscriptions = []
  },

  [types.ADD_SUBSCRIPTION] (state, payload) {
    state.appState.activeSubscriptions.push(payload)
  },

  [types.INITIAL_STATE_IS_LOADING] (state) {
    state.appState.isLoadingInitialState = true
  },

  [types.CLEAR_DEVICE_MENU_STATE] (state) {
    state.appState.activeModalDeviceMenu = {
      deviceId: null,
      deviceMetadata: {},
      deviceStatus: {}
    }
  },

  [types.SET_DEVICE_MENU_STATE] (state, {deviceId, deviceMetadata, deviceStatus}) {
    const activeModalDeviceMenu = state.appState.activeModalDeviceMenu
    activeModalDeviceMenu.deviceId = deviceId
    activeModalDeviceMenu.deviceMetadata = deviceMetadata
    activeModalDeviceMenu.deviceStatus = deviceStatus
  },

  [types.DEVICE_STATE_UPDATE] (state, payload) {
    state.appState.activeModalDeviceMenu.deviceStatus = {
      ...state.appState.activeModalDeviceMenu.deviceStatus,
      ...payload
    }
  },

  [types.NOTIFICATION_UPDATE] (state, payload) {
    state.messages.notifications = {
      ...state.messages.notifications,
      ...payload
    }
  },

  [types.EVENT_UPDATE] (state, payload) {
    state.messages.events = {
      ...state.messages.events,
      ...payload
    }
  },

  [types.SAVE_ROUTINES] (state, payload) {
    state.routines = payload
  }
}
