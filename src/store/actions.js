import * as types from './mutation-types'
import * as firebase from 'src/firebase'

export default {
  getInitialAppState ({ commit }) {
    const user = firebase.getCurrentUser()
    const uid = user.uid
    const email = user.email
    const displayName = user.displayName
    commit(types.SAVE_USER, { uid, email, displayName })
    firebase.getUserHomes(uid)
      .then(snap => commit(types.SAVE_USER_HOMES, snap.val()))
  },

  logOut ({ commit }) {
    firebase.logout()
    commit(types.LOG_USER_OUT)
  }
}
