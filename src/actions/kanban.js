import * as shortId from 'shortid'

export const ADD_LIST = 'ADD_LIST'
export const REMOVE_LIST = 'REMOVE_LIST'
export const MODIFY_LIST_TITLE = 'MODIFY_LIST_TITLE'

export const ADD_TODO = 'ADD_TODO'
export const TOGGLE_TODO = 'TOGGLE_TODO'
export const REMOVE_TODO = 'REMOVE_TODO'
export const MODIFY_TODO = 'MODIFY_TODO'
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'

export const addList = (title = 'Untitled List') => ({
  type: ADD_LIST,
  id: shortId.generate(),
  title,
})

export const removeList = (id) => ({
  type: REMOVE_LIST,
  id
})

export const modifyListTitle = (id, title) => ({
  type: MODIFY_LIST_TITLE,
  id,
  title,
})

export const addTodo = (listId, text) => ({
  type: ADD_TODO,
  listId,
  todoId: shortId.generate(),
  text,
})

export const toggleTodo = (listId, todoId) => ({
  type: TOGGLE_TODO,
  listId,
  todoId
})

export const removeTodo = (listId, todoId) => ({
  type: REMOVE_TODO,
  listId,
  todoId
})

export const modifyTodo = (listId, todoId, text) => ({
  type: MODIFY_TODO,
  listId,
  todoId,
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