import {
  ADD_LIST,
  ADD_TODO,
  MODIFY_LIST_TITLE,
  MODIFY_TODO,
  REMOVE_LIST,
  REMOVE_TODO,
  TOGGLE_TODO
} from '../actions/kanban'

const newTodoItem = (id, caption) => ({
  id,
  caption,
  isCompleted: false,
})

const newTodoList = (id = '0', title = 'Untitled List') => ({
  id,
  title,
  items: []
})

const newKanban = [newTodoList()]

const kanban = (state = newKanban, action) => {
  switch (action.type) {
    case ADD_LIST:
      return [
        ...state,
        newTodoList(action.id, action.title)
      ]
    case REMOVE_LIST:
      return state.filter(list => list.id !== action.id)
    case MODIFY_LIST_TITLE:
      return state.map(list => {
        if (list.id === action.id) {
          list.title = action.title
        }
        return list
      })
    case ADD_TODO:
      return state.map(list => {
        if (list.id === action.listId) {
          list.items = [
            ...list.items,
            newTodoItem(action.todoId, action.text)
          ]
        }
        return list
      })
    case TOGGLE_TODO:
      return state.map(list => {
        if (list.id === action.listId) {
          list.items = list.items.map(todo => {
            if (todo.id === action.todoId) {
              todo.isCompleted = !todo.isCompleted
            }
            return todo
          })
        }
        return list
      })
    case MODIFY_TODO:
      return state.map(list => {
        if (list.id === action.listId) {
          list.items = list.items.map(todo => {
            if (todo.id === action.todoId) {
              todo.caption = action.text
            }
            return todo
          })
        }
        return list
      })
    case REMOVE_TODO:
      return state.map(list => {
        if (list.id === action.listId) {
          list.items = list.items.filter(
            todo => todo.id !== action.todoId
          )
        }
        return list
      })
    default:
      return state
  }
}

export default kanban