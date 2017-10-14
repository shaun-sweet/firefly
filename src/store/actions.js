import * as types from './mutation-types'
import * as firebase from 'src/firebase'
import each from 'lodash/each'

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
  },

  logOut ({ commit, dispatch }) {
    dispatch('subscriptionCleanup')
    firebase.logout()
    commit(types.LOG_USER_OUT)
  },

  subscribeToDevicePrimaryState ({ commit, state }, devicesViewList) {
    const homeId = state.selectedHome
    for (let deviceId in devicesViewList) {
      const device = devicesViewList[deviceId]
      if (device.export_ui) {
        const primaryActionType = device.metadata.primary
        const ref = `homeStatus/${homeId}/deviceStatus/${deviceId}/${primaryActionType}`
        const onSuccess = (snap) => {
          console.log(snap)
          commit(types.DEVICE_PRIMARY_STATE_UPDATE, { primaryStateStatus: snap.val(), deviceId, homeId })
        }
        const onFail = (err) => {
          console.error(err)
        }
        commit(types.ADD_SUBSCRIPTION, ref)
        firebase.subscribeToDevicePrimaryState(ref, onSuccess, onFail)
      }
    }
  },

  populateDevicesView ({ commit, state, dispatch }, homeId) {
    firebase.getDevicesView(homeId)
      .then((snap) => {
        commit(types.SAVE_DEVICE_VIEW_LIST, { devicesViewList: snap.val(), homeId })
        return snap.val()
      })
      .then(devicesViewList => dispatch('subscribeToDevicePrimaryState', devicesViewList))
  },

  subscriptionCleanup ({ state, commit }) {
    // Removes firebase subscriptions
    each(state.appState.activeSubscriptions, (subLocation) => {
      firebase.subscriptionCleanup(subLocation)
    })
    // Removes local store of what the current subscriptions are
    commit('CLEANUP_SUBSCRIPTIONS')
  },

  toggleLight (_, payload) {
    return firebase.toggleLight(payload)
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
