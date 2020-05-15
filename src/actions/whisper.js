export const SET_WHISPER = 'SET_WHISPER'
export const SET_SUBSCRIPTION_ID = 'SET_SUBSCRIPTION_ID'
export const SET_USERNAME = 'SET_USERNAME'

export const setWhisper = config => ({
  type: SET_WHISPER,
  config
})

export const setSubscriptionID = subscriptionID => ({
  type: SET_SUBSCRIPTION_ID,
  subscriptionID
})

export const setUsername = username => ({
  type: SET_USERNAME,
  username
})
