import * as shortId from 'shortid'

export const ADD_TODO = 'ADD_TODO'
export const TOGGLE_TODO = 'TOGGLE_TODO'
export const REMOVE_TODO = 'REMOVE_TODO'
export const MODIFY_TODO = 'MODIFY_TODO'
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'


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

export const modifyTodo = (id, text) => ({
  type: MODIFY_TODO,
  id,
  text,
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