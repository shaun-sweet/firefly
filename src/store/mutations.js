import Vue from 'vue'
import * as types from './mutation-types'
import initialState from './initialState'
import store from 'src/store'

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
    state.locationStatus.lastMetadataUpdate = 0
  },

  [types.SAVE_DEVICE_VIEW_LIST] (state, { devicesViewList, homeId }) {
    state.homes = {
      ...state.homes,
      [homeId]: {
        ...state.homes[homeId],
        devicesViewList
      }
    }
    state.forceRefresh = false
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
      deviceStatus: {},
      deviceAlias: ''
    }
  },

  [types.SET_DEVICE_MENU_STATE] (state, {deviceId, deviceMetadata, deviceStatus, deviceAlias}) {
    const activeModalDeviceMenu = state.appState.activeModalDeviceMenu
    activeModalDeviceMenu.deviceId = deviceId
    activeModalDeviceMenu.deviceMetadata = deviceMetadata
    activeModalDeviceMenu.deviceStatus = deviceStatus
    activeModalDeviceMenu.deviceAlias = deviceAlias
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

  [types.LOCATION_UPDATE] (state, payload) {
    const oldUpdateTime = state.locationStatus.lastMetadataUpdate
    state.locationStatus = payload
    // On metadata change it triggers twice, once on value deleted and once on the new time value. On value delete it will set
    // the old value to undefined, so we only want to trigger when the undefined becomes a value otherwise we trigger twice.
    if (payload.lastMetadataUpdate !== oldUpdateTime && oldUpdateTime !== 0 && payload.lastMetadataUpdate !== undefined) {
      state.forceRefresh = true
      store.dispatch('populateDevicesView', state.selectedHome)
    }
  },

  [types.SAVE_ROUTINES] (state, payload) {
    state.routines = payload
  }
}
