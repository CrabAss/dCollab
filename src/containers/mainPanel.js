import { connect } from 'react-redux'
import mainPanel from '../components/mainPanel'


const mapStateToProps = (state, ownProps) => ({
  isConfigured: state.whisper.isConfigured
})

export default connect(mapStateToProps)(mainPanel)