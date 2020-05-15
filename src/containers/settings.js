import { connect } from 'react-redux'
import { setUsername, setWhisper } from '../actions/whisper'
import { clearMessage } from '../actions/messages'
import { SettingsDialog } from '../components/settings'

const mapStateToProps = (state, ownProps) => ({
  config: state.whisper,
  shh: state.shh,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  setUsername: (username) => dispatch(setUsername(username)),
  setWhisper: (config) => dispatch(setWhisper(config)),
  clearMessage: () => dispatch(clearMessage()),
})

export default connect(mapStateToProps, mapDispatchToProps)(SettingsDialog)