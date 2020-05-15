import { connect } from 'react-redux'
import App from '../components/App'
import { setSubscriptionID, setSymKeyId, setWhisper } from '../actions/whisper'
import { newMessage } from '../actions/messages'

const mapStateToProps = (state, ownProps) => ({
  config: state.whisper,
  shh: state.shh,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  setSymKeyId: (symKeyID) => dispatch(setSymKeyId(symKeyID)),
  setSubscriptionID: (subscriptionID) => dispatch(setSubscriptionID(subscriptionID)),
  setWhisper: (config) => dispatch(setWhisper(config)),
  newMessage: (m) => dispatch(newMessage(m)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)