const ADD_ITEM = 'ADD_ITEM'
const UPDATE_ITEM = 'UPDATE_ITEM'
const DELETE_ITEM = 'DELETE_ITEM'
const ADD_GROUP = 'ADD_GROUP'
const UPDATE_GROUP = 'UPDATE_GROUP'
const DELETE_GROUP = 'DELETE_GROUP'
const LOAD = 'LOAD'
const SET_SELECTED_GROUPS = 'SET_SELECTED_GROUPS'

const initialState = {
  groups: [],
  listItems: [],
  selectedGroups: []
}

const addItem = (state, item, groups, key) => {
  let { listItems } = state
  let newListItems = listItems.concat({
    ...item,
    key: key,
    groups: groups
  })
  return {
    ...state,
    listItems: newListItems
  }
}

const updateItem = (state, itemId, item, groups) => {
  let { listItems } = state
  let newItem = {
    ...item,
    key: itemId,
    groups: groups
  }
  let newListItems = listItems.map(elem =>
    elem.key === itemId ? newItem : elem
  )
  return {
    ...state,
    listItems: newListItems
  }
}

const deleteItem = (state, itemId) => {
  let { listItems } = state
  let newListItems = listItems.filter(elem => elem.key !== itemId)
  return {
    ...state,
    listItems: newListItems
  }
}

const addGroup = (state, groupName, key) => {
  let { groups } = state
  let newGroups = groups.concat({
    name: groupName,
    key: key
  })
  return {
    ...state,
    groups: newGroups
  }
}

const updateGroup = (state, key, groupName, oldGroupName) => {
  let { listItems, groups } = state
  let newGroup = {
    name: groupName,
    key: key
  }
  let newGroups = groups.map(elem => (elem.key === key ? newGroup : elem))
  let newListItems = listItems.map(elem => {
    return {
      ...elem,
      groups: elem.groups.map(elem => (elem === oldGroupName ? groupName : elem))
    }
  })
  return {
    ...state,
    listItems: newListItems,
    groups: newGroups
  }
}

const deleteGroup = (state, key) => {
  let { listItems, groups } = state
  let groupName = groups.filter(elem => elem.key === key)[0].name
  let newGroup = groups.filter(elem => elem.key !== key)
  let newListItems = listItems.map(elem => {
    return {
      ...elem,
      groups: elem.groups.filter(elem => elem !== groupName)
    }
  })
  return {
    ...state,
    listItems: newListItems,
    groups: newGroup
  }
}

const load = (state, listItems, groups) => {
  return {
    ...state,
    groups: [...groups],
    listItems: [...listItems]
  }
}

const setSelectedGroups = (state, selectedGroups) => {
  return {
    ...state,
    selectedGroups: selectedGroups
  }
}

function rootReducer (state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case ADD_ITEM:
      return addItem(state, payload.item, payload.groups, payload.key)
    case UPDATE_ITEM:
      return updateItem(state, payload.key, payload.item, payload.groups)
    case DELETE_ITEM:
      return deleteItem(state, payload.key)
    case ADD_GROUP:
      return addGroup(state, payload.text, payload.key)
    case UPDATE_GROUP:
      return updateGroup(state, payload.key, payload.text, payload.oldText)
    case DELETE_GROUP:
      return deleteGroup(state, payload.key)
    case LOAD:
      return load(state, payload.newListItems, payload.groups)
    case SET_SELECTED_GROUPS:
      return setSelectedGroups(state, payload.groups)
    default:
      return state
  }
}

export {
  rootReducer,
  ADD_ITEM,
  UPDATE_ITEM,
  DELETE_ITEM,
  ADD_GROUP,
  UPDATE_GROUP,
  DELETE_GROUP,
  LOAD,
  SET_SELECTED_GROUPS
}
