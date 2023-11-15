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
  ADD_GROUP,
  UPDATE_GROUP,
  DELETE_GROUP
} from './Reducer'

let app
if (getApps().length < 1) {
  app = initializeApp(firebaseConfig)
}
const db = getFirestore(app)

const addItem = (contact, groups) => {
  let groupNames = groups
    .filter(group => group.selected === true)
    .map(group => {
      return group.name
    })
  return async dispatch => {
    const docRef = await addDoc(collection(db, 'Contacts'), {
      ...contact,
      groups: groupNames
    })
    const id = docRef.id
    dispatch({
      type: ADD_ITEM,
      payload: {
        item: contact,
        groups: groupNames,
        key: id
      }
    })
  }
}

const updateItem = (item, contact, groups) => {
  let groupNames = groups
    .filter(group => group.selected === true)
    .map(group => {
      return group.name
    })
  return async dispatch => {
    const d = doc(db, 'Contacts', item.key)
    await updateDoc(d, {
      ...contact,
      groups: groupNames
    })
    dispatch({
      type: UPDATE_ITEM,
      payload: {
        key: item.key,
        item: contact,
        groups: groupNames
      }
    })
  }
}

const deleteItem = item => {
  return async dispatch => {
    const d = doc(db, 'Contacts', item.key)
    await deleteDoc(d)
    dispatch({
      type: DELETE_ITEM,
      payload: {
        key: item.key
      }
    })
  }
}

const addGroup = groupName => {
  return async dispatch => {
    const docRef = await addDoc(collection(db, 'Groups'), { name: groupName })
    const id = docRef.id
    dispatch({
      type: ADD_GROUP,
      payload: {
        text: groupName,
        key: id
      }
    })
  }
}

const updateGroup = (group, groupName, listItems) => {
  return async dispatch => {
    const d = doc(db, 'Groups', group.key)
    await updateDoc(d, { name: groupName })
    for (const element of listItems) {
      const d = doc(db, 'Contacts', element.key)
      await updateDoc(d, {
        groups: element.groups.map(elem => (elem === group.name ? groupName : elem))
      })
    }
    dispatch({
      type: UPDATE_GROUP,
      payload: {
        key: group.key,
        text: groupName,
        oldText: group.name
      }
    })
  }
}

const deleteGroup = (group, listItems) => {
  return async dispatch => {
    const d = doc(db, 'Groups', group.key)
    await deleteDoc(d)
    for (const element of listItems) {
      const d = doc(db, 'Contacts', element.key)
      await updateDoc(d, {
        groups: element.groups.filter(elem => elem !== group.name)
      })
    }
    dispatch({
      type: DELETE_GROUP,
      payload: {
        key: group.key
      }
    })
  }
}

const load = () => {
  return async dispatch => {
    let querySnapshotContacts = await getDocs(collection(db, 'Contacts'))
    let newListItems = querySnapshotContacts.docs.map(docSnap => {
      return {
        ...docSnap.data(),
        key: docSnap.id
      }
    })
    let querySnapshotGroups = await getDocs(collection(db, 'Groups'))
    let newGroups = querySnapshotGroups.docs.map(docSnap => {
      return {
        ...docSnap.data(),
        key: docSnap.id
      }
    })
    dispatch({
      type: LOAD,
      payload: {
        newListItems: newListItems,
        groups: newGroups
      }
    })
  }
}

export {
  addItem,
  updateItem,
  deleteItem,
  addGroup,
  updateGroup,
  deleteGroup,
  load
}
