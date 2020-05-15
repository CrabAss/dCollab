import { connect } from 'react-redux'
import { addTodo, toggleTodo, removeTodo, modifyTodo } from '../actions/todos'
import todoApp from '../components/kanban/todoApp'

const mapStateToProps = (state, ownProps) => ({
  todos: state.todos,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  addTodo: (caption) => dispatch(addTodo(caption)),
  toggleTodo: (id) => dispatch(toggleTodo(id)),
  removeTodo: (id) => dispatch(removeTodo(id)),
  modifyTodo: (id, text) => dispatch(modifyTodo(id, text)),
  // setVisibilityFilter: (config) => dispatch(setVisibilityFilter(config)),
})

export default connect(mapStateToProps, mapDispatchToProps)(todoApp)