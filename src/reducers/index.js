import { combineReducers } from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'
import messages from './messages'
import whisper from './whisper'
import shh from './shh'

export default combineReducers({
  todos,
  visibilityFilter,
  messages,
  whisper,
  shh,
})