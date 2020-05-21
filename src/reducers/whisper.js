import { SET_WHISPER, SET_SUBSCRIPTION_ID, SET_USERNAME } from '../actions/whisper'

const EMPTY_STRING = ""
const defaultState = {
  isConfigured: false,
  username: EMPTY_STRING,
  topic: null,
  symKeyID: null,
  symPassword: EMPTY_STRING,
  subscriptionID: EMPTY_STRING,
}

const whisper = (state = defaultState, action) => {
  const stateCopy = Object.assign({}, state);
  switch (action.type) {
    case SET_SUBSCRIPTION_ID:
      stateCopy.subscriptionID = action.subscriptionID
      return stateCopy
    case SET_USERNAME:
      stateCopy.username = action.username
      return stateCopy
    case SET_WHISPER:
      const subscriptionID = state.subscriptionID
      return {
        ...action.config,
        subscriptionID
      }
    default:
      return state
  }
}

export default whisper