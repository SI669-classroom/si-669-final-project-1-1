import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut as fbSignOut
} from 'firebase/auth'
import { getApps, initializeApp } from 'firebase/app'
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'
import { firebaseConfig } from './Secrets'

let app, auth

const apps = getApps()
if (apps.length == 0) {
  app = initializeApp(firebaseConfig)
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  })
} else {
  app = apps[0]
  auth = getAuth(app)
}

const signIn = async (email, password) => {
  await signInWithEmailAndPassword(auth, email, password)
}

const signUp = async (displayName, email, password) => {
  const userCred = await createUserWithEmailAndPassword(auth, email, password)
  await updateProfile(userCred.user, { displayName: displayName })
}

const signOut = async () => {
  await fbSignOut(auth)
}

const getAuthUser = () => {
  return auth.currentUser
}

export { signIn, signUp, signOut, getAuthUser }
