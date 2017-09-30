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

// @params fn callback
// {object} user

export const attemptLogin = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password)
}

export const initFirebase = (fn) => {
  firebase.auth().onAuthStateChanged(fn, error => error)
}
