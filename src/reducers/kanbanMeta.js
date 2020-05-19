import { UPDATE_LAST_MODIFIED_DATE } from '../actions/kanban'

const defaultMeta = {
  lastModifiedDate: new Date(0)
}

const kanbanMeta = (state = defaultMeta, action) => {
  const stateCopy = Object.assign({}, state)
  switch (action.type) {
    case UPDATE_LAST_MODIFIED_DATE:
      stateCopy.lastModifiedDate = action.date
      return stateCopy
    default:
      return state
  }
}

export default kanbanMeta