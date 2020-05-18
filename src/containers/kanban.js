import { connect } from 'react-redux'
import {
  addTodo,
  toggleTodo,
  removeTodo,
  modifyTodo,
  addList,
  removeList,
  modifyListTitle
} from '../actions/kanban'
import Kanban from '../components/kanban/kanban'

const mapStateToProps = (state, ownProps) => ({
  kanban: state.kanban,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  addList: () => dispatch(addList()),
  removeList: (listId) => dispatch(removeList(listId)),
  modifyListTitle: (listId, title) => dispatch(modifyListTitle(listId, title)),

  addTodo: (listId, text) => dispatch(addTodo(listId, text)),
  toggleTodo: (listId, todoId) => dispatch(toggleTodo(listId, todoId)),
  removeTodo: (listId, todoId) => dispatch(removeTodo(listId, todoId)),
  modifyTodo: (listId, todoId, text) => dispatch(modifyTodo(listId, todoId, text)),
  // setVisibilityFilter: (config) => dispatch(setVisibilityFilter(config)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Kanban)