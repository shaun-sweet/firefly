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

export const attemptLogin = (email, password) => firebase.auth().signInWithEmailAndPassword(email, password)

export const logout = () => firebase.auth().signOut()

export const getCurrentUser = () => firebase.auth().currentUser

export const getUserHomes = (userId) => firebase.database().ref(`users/${userId}/homes`)
  .once('value')

export const getDevicesView = (homeId) => firebase.database().ref(`homeStatus/${homeId}/deviceViews`)
  .once('value')
