import { ADD_TODO, REMOVE_TODO, TOGGLE_TODO } from '../actions/todos'

const newTodoItem = (id, caption) => ({
  id,
  caption,
  isCompleted: false,
})

const todos = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        newTodoItem(action.id, action.text)
      ]
    case TOGGLE_TODO:
      return state.map((todo) => {
        if (todo.id === action.id) {
          todo.isCompleted = !todo.isCompleted;
        }
        return todo;
      })
    case REMOVE_TODO:
      return state.filter(todo => todo.id !== action.id)
    default:
      return state
  }
}

export default todos