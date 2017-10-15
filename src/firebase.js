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

export const toggleLight = ({ homeId, deviceId, command }) => {
  db.ref(`homeStatus/${homeId}/commands/${deviceId}`).set(command)
}

export const subscriptionCleanup = (subLocation) => db.ref(subLocation).off()

export const zWaveCommand = (payload) => {
  db.ref(`homeStatus/${payload.homeId}/commands/service_zwave`).set(payload.command)
}

const getNotifications = (homeId) =>
  db.ref(`homeStatus/${homeId}/notifications`).limitToFirst(100).once('value')

const getEvents = (homeId) =>
  db.ref(`homeStatus/${homeId}/events`).limitToFirst(100).once('value')

export const getMessages = homeId => Promise.all([getNotifications(homeId), getEvents(homeId)])

export const subscribeToDeviceStatus = (ref, onSuccess, onFail) =>
  db.ref(ref).on('child_changed', onSuccess, onFail)

export const getDevicesStatus = (ref) => db.ref(ref).once('value')
