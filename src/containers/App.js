import { connect } from 'react-redux'
import App from '../components/App'
import { newMessage, setSubscriptionID, setSymKeyId, setWhisper } from '../actions'

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