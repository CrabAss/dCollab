import { combineReducers } from 'redux'
import kanban from './kanban'
import visibilityFilter from './visibilityFilter'
import messages from './messages'
import whisper from './whisper'
import shh from './shh'

export default combineReducers({
  kanban,
  visibilityFilter,
  messages,
  whisper,
  shh,
})