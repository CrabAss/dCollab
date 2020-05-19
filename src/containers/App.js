import { connect } from 'react-redux'
import App from '../components/App'
import { setSubscriptionID } from '../actions/whisper'
import { newMessage } from '../actions/messages'
import {
  addList,
  addTodo,
  initKanban,
  modifyListTitle,
  modifyTodo,
  removeList,
  removeTodo,
  toggleTodo, updateLastModifiedDate
} from '../actions/kanban'

const mapStateToProps = (state, ownProps) => ({
  config: state.whisper,
  shh: state.shh,
  kanban: state.kanban,
  kanbanMeta: state.kanbanMeta,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  setSubscriptionID: (subscriptionID) => dispatch(setSubscriptionID(subscriptionID)),
  newMessage: (m) => dispatch(newMessage(m)),

  updateLastModifiedDate: (date) => dispatch(updateLastModifiedDate(date)),

  initKanban: (kanban) => dispatch(initKanban(kanban)),
  addList: (id) => dispatch(addList(id)),
  removeList: (listId) => dispatch(removeList(listId)),
  modifyListTitle: (listId, title) => dispatch(modifyListTitle(listId, title)),

  addTodo: (listId, todoId, text) => dispatch(addTodo(listId, todoId, text)),
  toggleTodo: (listId, todoId) => dispatch(toggleTodo(listId, todoId)),
  removeTodo: (listId, todoId) => dispatch(removeTodo(listId, todoId)),
  modifyTodo: (listId, todoId, text) => dispatch(modifyTodo(listId, todoId, text)),
  // setVisibilityFilter: (config) => dispatch(setVisibilityFilter(config)),

})

export default connect(mapStateToProps, mapDispatchToProps)(App)