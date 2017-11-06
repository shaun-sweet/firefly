import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

const config = {
  apiKey: 'AIzaSyCguxzjPs-2ky4lDUeHszynWFWC2WqqYl4',
  authDomain: 'firefly-beta-cdb9d.firebaseapp.com',
  databaseURL: 'https://firefly-beta-cdb9d.firebaseio.com',
  projectId: 'firefly-beta-cdb9d',
  storageBucket: 'firefly-beta-cdb9d.appspot.com',
  messagingSenderId: '893008059151'
}

firebase.initializeApp(config)

const db = firebase.database()

export const attemptLogin = (email, password) =>
  firebase.auth().signInWithEmailAndPassword(email, password)

export const onAuthStateChange = (cb) =>
  firebase.auth().onAuthStateChanged(cb)

export const logout = () => firebase.auth().signOut()

export const getCurrentUser = () => firebase.auth().currentUser

export const getUserHomes = (userId) =>
  db.ref(`users/${userId}/homes`).once('value')

export const getDevicesView = (homeId) =>
  db.ref(`homeStatus/${homeId}/deviceViews`).once('value')

export const subscriptionCleanup = (subLocation) => db.ref(subLocation).off()

export const zWaveCommand = (payload) => {
  db.ref(`homeStatus/${payload.homeId}/commands/service_zwave`).set(payload.command)
}

export const subscribeToNotifications = (homeId, onSuccess, onFail) =>
  db.ref(`homeStatus/${homeId}/notifications`).limitToFirst(100).on('value', onSuccess, onFail)

export const subscribeToEvents = (homeId, onSuccess, onFail) =>
  db.ref(`homeStatus/${homeId}/events`).limitToFirst(100).on('value', onSuccess, onFail)

export const subscribeToDeviceStatus = (homeId, onSuccess, onFail) =>
  db.ref(`homeStatus/${homeId}/deviceStatus`).on('child_changed', onSuccess, onFail)

export const issueCommand = ({homeId, deviceId, command}) =>
  db.ref(`homeStatus/${homeId}/commands/${deviceId}`).set(command)

export const getDevicesStatus = (homeId) =>
  db.ref(`homeStatus/${homeId}/deviceStatus`).once('value')

export const getDeviceStatus = (homeId, deviceId) =>
  db.ref(`homeStatus/${homeId}/deviceStatus/${deviceId}`).once('value')
