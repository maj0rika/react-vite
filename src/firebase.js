import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import { initializeApp } from 'firebase/app'
import { getFirestore } from '@firebase/firestore'
const {
  VITE_API_KEY,
  VITE_AUTH_DOMAIN,
  VITE_PROJECT_ID,
  VITE_STORAGE_BUCKET,
  VITE_SENDER_ID,
  VITE_APP_ID,
  VITE_MEASUREMENT_ID,
} = import.meta.env

console.log(import.meta.env)

const firebaseConfig = {
  // apiKey: 'AIzaSyC62Gwkyf0FMOMgxp5BvNIk7cfiJ6svJqc',
  // authDomain: 'react-post-8f106.firebaseapp.com',
  // projectId: 'react-post-8f106',
  // storageBucket: 'react-post-8f106.appspot.com',
  // messagingSenderId: '72952291039',
  // appId: '1:72952291039:web:7ce10f8e542b83ca64936a',
  // measurementId: 'G-B32V8TF2TX',

  apiKey: VITE_API_KEY,
  authDomain: VITE_AUTH_DOMAIN,
  projectId: VITE_PROJECT_ID,
  storageBucket: VITE_STORAGE_BUCKET,
  messagingSenderId: VITE_SENDER_ID,
  appId: VITE_APP_ID,
  measurementId: VITE_MEASUREMENT_ID,
}

// initialize firebase app
const app = initializeApp(firebaseConfig)
console.log(app)
// get firestore instance
const db = getFirestore(app)
console.log(db)

export { db }
