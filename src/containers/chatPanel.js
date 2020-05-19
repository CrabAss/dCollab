import { connect } from 'react-redux'
import { ChatPanel } from '../components/chat/chatPanel'

const mapStateToProps = (state, ownProps) => ({
  username: state.whisper.username,
  symKeyID: state.whisper.symKeyID,
  topic: state.whisper.topic,
  shh: state.shh,
  msgs: state.messages,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(ChatPanel)