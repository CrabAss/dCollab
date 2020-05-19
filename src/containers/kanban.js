import { connect } from 'react-redux'
// import {
//   addTodo,
//   toggleTodo,
//   removeTodo,
//   modifyTodo,
//   addList,
//   removeList,
//   modifyListTitle
// } from '../actions/kanban'
import Kanban from '../components/kanban/kanban'

const mapStateToProps = (state, ownProps) => ({
  config: state.whisper,
  kanban: state.kanban,
  shh: state.shh,
})

const mapDispatchToProps = (dispatch, ownProps) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Kanban)