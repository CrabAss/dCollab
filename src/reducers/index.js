import { combineReducers } from 'redux'
import kanban from './kanban'
import visibilityFilter from './visibilityFilter'
import messages from './messages'
import whisper from './whisper'
import shh from './shh'
import kanbanMeta from './kanbanMeta'

export default combineReducers({
  kanban,
  kanbanMeta,
  visibilityFilter,
  messages,
  whisper,
  shh,
})