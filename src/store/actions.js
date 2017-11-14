import * as types from './mutation-types'
import * as firebase from 'src/firebase'
import each from 'lodash/each'
import get from 'lodash/get'
import router from 'src/router'

export default {
  getInitialAppState ({ commit, getters, dispatch, state }) {
    const user = firebase.getCurrentUser()
    const uid = user.uid
    const email = user.email
    const displayName = user.displayName
    firebase.getUserData(uid)
      .then((snap) => {
        const defaultHome = get(snap.val(), 'defaultHome', null)
        commit(types.SAVE_USER, { uid, email, displayName, defaultHome })
      })
    firebase.getUserHomes(uid)
      .then(snap => commit(types.SAVE_USER_HOMES, snap.val()))
      .then(() => commit(types.SET_SELECTED_HOME, getters.defaultHome))
      .then(() => dispatch('populateDevicesView', state.selectedHome))
      .then(() => router.push('/devices'))
  },

  subscribeToNotifications ({ commit, state, getters }) {
    const homeId = getters.selectedHome
    const onSuccess = (snap) => {
      commit(types.NOTIFICATION_UPDATE, snap.val())
    }
    const onFail = (err) => {
      console.error(err)
    }
    firebase.subscribeToNotifications(homeId, onSuccess, onFail)
    commit(types.ADD_SUBSCRIPTION, `homeStatus/${homeId}/notifications`)
  },

  subscribeToEvents ({ commit, state, getters }) {
    const homeId = getters.selectedHome
    const onSuccess = (snap) => {
      commit(types.EVENT_UPDATE, snap.val())
    }
    const onFail = (err) => {
      console.error(err)
    }
    firebase.subscribeToEvents(homeId, onSuccess, onFail)
    commit(types.ADD_SUBSCRIPTION, `homeStatus/${homeId}/events`)
  },

  subscribeToMessages ({ dispatch }) {
    dispatch('subscribeToNotifications')
    dispatch('subscribeToEvents')
  },

  logOut ({ commit, dispatch }) {
    dispatch('subscriptionCleanup')
    firebase.logout()
    commit(types.LOG_USER_OUT)
  },

  getDevicesPrimaryState ({state, commit, getters}) {
    const homeId = getters.selectedHome
    const devicesViewList = state.homes[homeId].devicesViewList
    firebase.getDevicesStatus(homeId)
      .then((snap) => {
        const deviceStatus = snap.val()
        each(devicesViewList, (device) => {
          if (device.exportUI) {
            const deviceId = device.ffUid
            const primaryStateType = devicesViewList[deviceId].metadata.primary
            const primaryStateStatus = deviceStatus[deviceId][primaryStateType]
            commit(types.DEVICE_PRIMARY_STATE_UPDATE, {
              primaryStateStatus,
              deviceId,
              homeId
            })
            commit(types.ADD_AUTOCOMPLETE_FIELDS, {
              homeId,
              deviceId
            })
          }
        })
      })
  },

  subscribeToDeviceState ({ commit, state }) {
    const homeId = state.selectedHome
    const devicesViewList = state.homes[homeId].devicesViewList
    const onSuccess = (snap) => {
      const deviceId = snap.key
      const deviceState = snap.val()
      const primaryStateType = get(devicesViewList[deviceId], 'metadata.primary', null)
      if (primaryStateType !== null) {
        const primaryStateStatus = deviceState[primaryStateType]
        commit(types.DEVICE_PRIMARY_STATE_UPDATE, {
          primaryStateStatus,
          deviceId,
          homeId
        })
        // if the device is currently in the active modal, also change the modal data
        if (deviceId === state.appState.activeModalDeviceMenu.deviceId) {
          commit(types.DEVICE_STATE_UPDATE, deviceState)
        }
      }
    }
    const onFail = (err) => {
      console.error(err)
    }
    const ref = `homeStatus/${homeId}/deviceStatus`
    commit(types.ADD_SUBSCRIPTION, ref)
    firebase.subscribeToDeviceStatus(homeId, onSuccess, onFail)
  },

  openDeviceMenu ({ commit, state }, { deviceId, deviceMetadata }) {
    const homeId = state.selectedHome
    firebase.getDeviceStatus(homeId, deviceId)
      .then((snap) => {
        const deviceStatus = snap.val()
        const payload = {
          deviceId,
          deviceStatus,
          deviceMetadata
        }
        commit(types.SET_DEVICE_MENU_STATE, payload)
      })
  },

  closeDeviceMenu ({ commit }) {
    commit(types.CLEAR_DEVICE_MENU_STATE)
  },

  changeSelectedHome ({state, commit, dispatch}, newSelectedHomeId) {
    Promise.resolve(commit(types.INITIAL_STATE_IS_LOADING))
      .then(() => dispatch('subscriptionCleanup'))
      .then(() => commit(types.SET_SELECTED_HOME, newSelectedHomeId))
      .then(() => dispatch('populateDevicesView', newSelectedHomeId))
  },

  populateDevicesView ({ commit, state, dispatch }, homeId) {
    // checks for cached data and skips firebase call if cached
    if (state.homes[homeId].devicesViewList) {
      dispatch('subscribeToDeviceState')
      commit(types.INITIAL_STATE_NOT_LOADING)
    } else {
      firebase.getDevicesView(homeId)
        .then((snap) => {
          const devicesViewList = snap.val()
          each(devicesViewList, (device) => {
            device.primaryStateStatus = false
          })
          commit(types.SAVE_DEVICE_VIEW_LIST, { devicesViewList: devicesViewList, homeId })
          return snap.val()
        })
        .then(() => dispatch('getDevicesPrimaryState'))
        .then(() => dispatch('subscribeToDeviceState'))
        .then(() => commit(types.INITIAL_STATE_NOT_LOADING))
    }
  },

  getRoutines ({ state, commit }) {
    const homeId = state.selectedHome
    firebase.getRoutines(homeId)
      .then((snap) => {
        const routines = snap.val()
        commit(types.SAVE_ROUTINES, routines)
      })
  },

  subscriptionCleanup ({ state, commit }) {
    // Removes firebase subscriptions
    each(state.appState.activeSubscriptions, (subLocation) => {
      firebase.subscriptionCleanup(subLocation)
    })
    // Removes local store of what the current subscriptions are
    commit('CLEANUP_SUBSCRIPTIONS')
  }
}
// for each device... metadata > primary (which points to the type of action that is the primary)
//  actions > actionType (eg. alarm, battery, contact (like if a contact sensor has contact or not))
// so an on/oF_F device will have a type === "switch"
// action title = label for title when pulling up the modal
// can_command = is changable by the user (vs state reporting ie. if proxy sensor is going off or not)
// can_request = can be used as a trigger (typically true)
// color_mapping = has colors as the keys that point to an array with the various states
// text_mapping = key = text to display, while the value is when to display them (based on states)
// request = where front end/automation will target keywise to collect the data on that action.
// it grabs it from the deviceStatus

//  context = description

// Sending a command
