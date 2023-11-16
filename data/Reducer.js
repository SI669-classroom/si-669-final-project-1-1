const ADD_ITEM = 'ADD_ITEM'
const UPDATE_ITEM = 'UPDATE_ITEM'
const DELETE_ITEM = 'DELETE_ITEM'
const LOAD = 'LOAD'

const initialState = {
  trips: [],
}

const addItem = (state, item, key) => {
  let { trips } = state
  let newListItems = trips.concat({
    ...item,
    key: key
  })
  return {
    ...state,
    trips: newListItems
  }
}

const updateItem = (state, itemId, item) => {
  let { trips } = state
  let newItem = {
    ...item,
    key: itemId
  }
  let newListItems = trips.map(elem =>
    elem.key === itemId ? newItem : elem
  )
  return {
    ...state,
    trips: newListItems
  }
}

const deleteItem = (state, itemId) => {
  let { trips } = state
  let newListItems = trips.filter(elem => elem.key !== itemId)
  return {
    ...state,
    trips: newListItems
  }
}

const load = (state, trips) => {
  return {
    ...state,
    trips: [...trips]
  }
}

function rootReducer (state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case ADD_ITEM:
      return addItem(state, payload.item, payload.key)
    case UPDATE_ITEM:
      return updateItem(state, payload.key, payload.item)
    case DELETE_ITEM:
      return deleteItem(state, payload.key)
    case LOAD:
      return load(state, payload.newTrips)
    default:
      return state
  }
}

export {
  rootReducer,
  ADD_ITEM,
  UPDATE_ITEM,
  DELETE_ITEM,
  LOAD,
}
