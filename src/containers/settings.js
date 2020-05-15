import { connect } from 'react-redux'
import { setSubscriptionID, setSymKeyId, setUsername, setWhisper } from '../actions/whisper'
import { clearMessage, newMessage } from '../actions/messages'
import { SettingsDialog } from '../components/settings'

const mapStateToProps = (state, ownProps) => ({
  config: state.whisper,
  shh: state.shh,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  setSymKeyId: (symKeyID) => dispatch(setSymKeyId(symKeyID)),
  setSubscriptionID: (subscriptionID) => dispatch(setSubscriptionID(subscriptionID)),
  setUsername: (username) => dispatch(setUsername(username)),
  setWhisper: (config) => dispatch(setWhisper(config)),
  newMessage: (m) => dispatch(newMessage(m)),
  clearMessage: () => dispatch(clearMessage()),
})

export default connect(mapStateToProps, mapDispatchToProps)(SettingsDialog)