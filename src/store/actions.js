import * as types from './mutation-types'
import * as firebase from 'src/firebase'
import each from 'lodash/each'
import router from 'src/router'

export default {
  getInitialAppState ({ commit, getters, dispatch, state }) {
    const user = firebase.getCurrentUser()
    const uid = user.uid
    const email = user.email
    const displayName = user.displayName
    commit(types.SAVE_USER, { uid, email, displayName })
    firebase.getUserHomes(uid)
      .then(snap => commit(types.SAVE_USER_HOMES, snap.val()))
      .then(() => commit(types.SET_SELECTED_HOME, getters.defaultHome))
      .then(() => dispatch('populateDevicesView', state.selectedHome))
      .then(() => router.push('/devices'))
  },

  logOut ({ commit, dispatch }) {
    dispatch('subscriptionCleanup')
    firebase.logout()
    commit(types.LOG_USER_OUT)
  },

  getDevicesPrimaryState ({state, commit, getters}) {
    const homeId = getters.selectedHome
    const devicesViewList = state.homes[homeId].devicesViewList
    const ref = `homeStatus/${homeId}/deviceStatus`
    firebase.getDevicesStatus(ref)
      .then((snap) => {
        const deviceStatus = snap.val()
        each(devicesViewList, (device) => {
          if (device.export_ui) {
            const deviceId = device.ff_id
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

  subscribeToDevicePrimaryState ({ commit, state }) {
    const homeId = state.selectedHome
    const devicesViewList = state.homes[homeId].devicesViewList
    const ref = `homeStatus/${homeId}/deviceStatus`
    const onSuccess = (snap) => {
      const deviceId = snap.key
      const primaryStateType = devicesViewList[deviceId].metadata.primary
      const primaryStateStatus = snap.val()[primaryStateType]
      commit(types.DEVICE_PRIMARY_STATE_UPDATE, {
        primaryStateStatus,
        deviceId,
        homeId
      })
    }
    const onFail = (err) => {
      console.error(err)
    }
    commit(types.ADD_SUBSCRIPTION, ref)
    firebase.subscribeToDeviceStatus(ref, onSuccess, onFail)
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
      dispatch('subscribeToDevicePrimaryState')
      commit(types.INITIAL_STATE_NOT_LOADING)
    } else {
      firebase.getDevicesView(homeId)
        .then((snap) => {
          commit(types.SAVE_DEVICE_VIEW_LIST, { devicesViewList: snap.val(), homeId })
          return snap.val()
        })
        .then(() => dispatch('getDevicesPrimaryState'))
        .then(() => dispatch('subscribeToDevicePrimaryState'))
        .then(() => commit(types.INITIAL_STATE_NOT_LOADING))
    }
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
// so an on/off device will have a type === "switch"
// action title = label for title when pulling up the modal
// can_command = is changable by the user (vs state reporting ie. if proxy sensor is going off or not)
// can_request = can be used as a trigger (typically true)
// color_mapping = has colors as the keys that point to an array with the various states
// text_mapping = key = text to display, while the value is when to display them (based on states)
// request = where front end/automation will target keywise to collect the data on that action.
// it grabs it from the deviceStatus

//  context = description

// Sending a command
