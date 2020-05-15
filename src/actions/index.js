import * as shortId from 'shortid'

export const NEW_MSG = 'NEW_MSG'
export const CLEAR_MSG = 'CLEAR_MSG'
export const ADD_TODO = 'ADD_TODO'
export const TOGGLE_TODO = 'TOGGLE_TODO'
export const REMOVE_TODO = 'REMOVE_TODO'
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'

export const SET_SYMKEYID = 'SET_SYMKEYID'
export const SET_WHISPER = 'SET_WHISPER'
export const SET_SUBSCRIPTION_ID = 'SET_SUBSCRIPTION_ID'


export const newMessage = m => ({
  type: 'NEW_MSG',
  m
})

export const clearMessage = () => ({
  type: 'CLEAR_MSG',
})

export const addTodo = text => ({
  type: ADD_TODO,
  id: shortId.generate(),
  text,
})

export const toggleTodo = id => ({
  type: TOGGLE_TODO,
  id
})

export const removeTodo = id => ({
  type: REMOVE_TODO,
  id
})

export const setVisibilityFilter = filter => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
})

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}

export const setSymKeyId = symKeyID => ({
  type: SET_SYMKEYID,
  symKeyID
})

export const setWhisper = config => ({
  type: SET_WHISPER,
  config
})

export const setSubscriptionID = subscriptionID => ({
  type: SET_SUBSCRIPTION_ID,
  subscriptionID
})

