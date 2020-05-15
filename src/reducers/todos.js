import { ADD_TODO, REMOVE_TODO, TOGGLE_TODO } from '../actions/todos'

const newTodoItem = (caption) => ({
  caption,
  isCompleted: false,
})

const todos = (state = {}, action) => {
  const stateCopy = Object.assign({}, state);
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        [action.id]: newTodoItem(action.text)
      }
    case TOGGLE_TODO:
      stateCopy[action.id].isCompleted = !(stateCopy[action.id].isCompleted)
      return stateCopy
    case REMOVE_TODO:
      break
    default:
      return state
  }
}

export default todos