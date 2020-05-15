import { connect } from 'react-redux'
import App from '../components/App'
import { setSubscriptionID } from '../actions/whisper'
import { newMessage } from '../actions/messages'

const mapStateToProps = (state, ownProps) => ({
  config: state.whisper,
  shh: state.shh,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  setSubscriptionID: (subscriptionID) => dispatch(setSubscriptionID(subscriptionID)),
  newMessage: (m) => dispatch(newMessage(m)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)