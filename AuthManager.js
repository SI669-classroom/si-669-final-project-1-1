import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut as fbSignOut
} from 'firebase/auth'
import { getApps, initializeApp } from 'firebase/app'
import { firebaseConfig } from './Secrets'

let app, auth

const apps = getApps()
if (apps.length == 0) {
  app = initializeApp(firebaseConfig)
} else {
  app = apps[0]
}
auth = getAuth(app)

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

export { signIn, signUp, signOut }
