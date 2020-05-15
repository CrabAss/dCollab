export const NEW_MSG = 'NEW_MSG'
export const CLEAR_MSG = 'CLEAR_MSG'

export const newMessage = m => ({
  type: NEW_MSG,
  m
})

export const clearMessage = () => ({
  type: CLEAR_MSG,
})