import { CLEAR_MSG, NEW_MSG } from '../actions'
import { getMsgDate } from '../util/util'

const messages = (state = [], action) => {
  switch (action.type) {
    case NEW_MSG:
      const stateCopy = state.slice()
      const newMsg = {id: action.m.id, text: action.m.text, date: getMsgDate(new Date(action.m.date))}
      const newMsgSegment = {
        id: action.m.id,
        sender: action.m.sender,
        messages: [newMsg]
      }

      if (stateCopy.length === 0) {
        return [newMsgSegment]
      }
      if (action.m.sender === stateCopy.slice(-1)[0].sender) {
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