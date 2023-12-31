import { initializeApp, getApps } from 'firebase/app'
import { initializeAuth, getReactNativePersistence } from 'firebase/auth'
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  or
} from 'firebase/firestore'

import { firebaseConfig } from '../Secrets'
import { ADD_ITEM, UPDATE_ITEM, DELETE_ITEM, LOAD, ADD_USER } from './Reducer'
import { manageFileDownload } from './Storage'
import { getAuthUser } from '../AuthManager'

let app
const apps = getApps()
if (apps.length == 0) {
  app = initializeApp(firebaseConfig)
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  })
} else {
  app = apps[0]
}
const db = getFirestore(app)

const addItem = trip => {
  return async dispatch => {
    const docRef = await addDoc(collection(db, 'TripsMeta'), {
      ...trip
    })
    const id = docRef.id
    dispatch({
      type: ADD_ITEM,
      payload: {
        item: trip,
        key: id
      }
    })
  }
}

const updateItem = (item, trip) => {
  return async dispatch => {
    const d = doc(db, 'TripsMeta', item.key)
    await updateDoc(d, {
      ...trip
    })
    dispatch({
      type: UPDATE_ITEM,
      payload: {
        key: item.key,
        item: trip
      }
    })
  }
}

const deleteItem = item => {
  return async dispatch => {
    const d = doc(db, 'TripsMeta', item.key)
    await deleteDoc(d)
    dispatch({
      type: DELETE_ITEM,
      payload: {
        key: item.key
      }
    })
  }
}

const load = currUid => {
  return async dispatch => {
    let newTrips
    const q = query(collection(db, 'TripsMeta'))
    let querySnapshotContacts = await getDocs(q)
    newTrips = await Promise.all(
      querySnapshotContacts.docs.map(async docSnap => {
        let uri = await manageFileDownload(docSnap.data().cover)
        return {
          ...docSnap.data(),
          key: docSnap.id,
          uri: uri,
          endDate: docSnap.data().endDate.toDate(),
          startDate: docSnap.data().startDate.toDate(),
          itinerary: docSnap.data().itinerary ? docSnap.data().itinerary : [],
          packingList: docSnap.data().packingList
            ? docSnap.data().packingList
            : []
        }
      })
    )
    newTrips = newTrips.filter(trip => {
      let flag = false
      if (trip.owner === currUid) {
        flag = true
        return flag
      }
      trip.peers && trip.peers.forEach(peer => {
        if (peer === currUid) {
          flag = true
          return
        }
      })
      return flag
    })
    let allUsers = []
    const q2 = query(collection(db, 'UserMeta'))
    let querySnapshotContacts2 = await getDocs(q2)
    allUsers = await Promise.all(
      querySnapshotContacts2.docs.map(async docSnap => {
        return {
          ...docSnap.data(),
          key: docSnap.id
        }
      })
    )
    dispatch({
      type: LOAD,
      payload: {
        newTrips: newTrips,
        allUsers: allUsers
      }
    })
  }
}

const addUser = user => {
  return async dispatch => {
    const docRef = await addDoc(collection(db, 'UserMeta'), {
      ...user
    })
    const id = docRef.id
    dispatch({
      type: ADD_USER,
      payload: {
        user: user,
        key: id
      }
    })
  }
}

export { addItem, updateItem, deleteItem, load, addUser }
