import { initializeApp, getApps } from 'firebase/app'
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc
} from 'firebase/firestore'

import { firebaseConfig } from '../Secrets'
import {
  ADD_ITEM,
  UPDATE_ITEM,
  DELETE_ITEM,
  LOAD,
} from './Reducer'

let app
if (getApps().length < 1) {
  app = initializeApp(firebaseConfig)
}
const db = getFirestore(app)

const addItem = (contact) => {
  return async dispatch => {
    const docRef = await addDoc(collection(db, 'TripsMeta'), {
      ...contact,
    })
    const id = docRef.id
    dispatch({
      type: ADD_ITEM,
      payload: {
        item: contact,
        key: id
      }
    })
  }
}

const updateItem = (item, contact) => {
  return async dispatch => {
    const d = doc(db, 'TripsMeta', item.key)
    await updateDoc(d, {
      ...contact,
    })
    dispatch({
      type: UPDATE_ITEM,
      payload: {
        key: item.key,
        item: contact,
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

const load = () => {
  return async dispatch => {
    let querySnapshotContacts = await getDocs(collection(db, 'TripsMeta'))
    let newTrips = querySnapshotContacts.docs.map(docSnap => {
      console.log(docSnap.data().endDate.toDate())
      return {
        ...docSnap.data(),
        key: docSnap.id,
        endDate: docSnap.data().endDate.toDate(),
        startDate: docSnap.data().startDate.toDate(),
      }
    })
    console.log(newTrips)
    dispatch({
      type: LOAD,
      payload: {
        newTrips: newTrips,
      }
    })
  }
}

export {
  addItem,
  updateItem,
  deleteItem,
  load
}