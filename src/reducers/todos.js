import { ADD_TODO, MODIFY_TODO, REMOVE_TODO, TOGGLE_TODO } from '../actions/todos'

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

const todos = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        newTodoItem(action.id, action.text)
      ]
    case TOGGLE_TODO:
      return state.map(todo => {
        if (todo.id === action.id) {
          todo.isCompleted = !todo.isCompleted
        }
        return todo
      })
    case MODIFY_TODO:
      return state.map(todo => {
        if (todo.id === action.id) {
          todo.caption = action.text
        }
        return todo
      })
    case REMOVE_TODO:
      return state.filter(todo => todo.id !== action.id)
    default:
      return state
  }
}

export default todos