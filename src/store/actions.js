import * as types from './mutation-types'
import * as firebase from 'src/firebase'

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

  logOut ({ commit }) {
    firebase.logout()
    commit(types.LOG_USER_OUT)
  },

  populateDevicesView ({ commit }, homeId) {
    firebase.getDevicesView(homeId)
      .then(snap => commit(types.SAVE_DEVICE_VIEW_LIST, snap.val()))
  }
}
