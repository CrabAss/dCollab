import { CLEAR_MSG, NEW_MSG } from '../actions/messages'
import { getMsgDate } from '../util/util'
import { INIT_CHAT, SEND_MESSAGE } from '../const/messageType'

const messages = (state = [], action) => {
  switch (action.type) {
    case NEW_MSG:
      const stateCopy = state.slice()
      const newMsg = { id: action.m.id, text: action.m.text, date: getMsgDate(new Date(action.m.date)) }
      const newMsgSegment = action.m.type === INIT_CHAT
        ? {
          id: action.m.id,
          type: action.m.type,
          sender: action.m.sender,
          date: getMsgDate(new Date(action.m.date))
        }
        : {
          id: action.m.id,
          type: action.m.type,
          sender: action.m.sender,
          messages: [newMsg]
        }

      if (stateCopy.length === 0) {
        return [newMsgSegment]
      }
      if (action.m.sender === stateCopy.slice(-1)[0].sender && action.m.type === SEND_MESSAGE) {
        if (action.m.id === stateCopy.slice(-1)[0].id) {
          return state  // do nothing
        }
        stateCopy.slice(-1)[0].messages.push(newMsg)
        return stateCopy
      }
      return [
        ...state,
        newMsgSegment
      ]
    case CLEAR_MSG:
      return []
    default:
      return state
  }
}

export default messages