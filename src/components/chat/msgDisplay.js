import React from 'react'
import Box from '@material-ui/core/Box'

class MsgDisplay extends React.Component {
  scrollToBottom = () => this.messagesEnd.scrollIntoView();
  componentDidMount() {
    this.scrollToBottom();
  }
  componentDidUpdate() {
    this.scrollToBottom();
  }

  render () {
    const selfName = this.props.username
    return (
      <Box id='messages'>
        {
          this.props.msgs.map((msgSegment) => {
            const msgType = selfName === msgSegment.sender ? 'sent' : 'received'
            const msgClasses = `msg ${msgType}`
            return (
              <Box className={msgClasses} key={msgSegment.id}>
                {
                  msgSegment.messages.map((m, idx) => (
                    <Box key={m.id}>
                      <Box className='content'>
                        {msgType === 'received' && idx === 0 &&
                        <div className='name'>{msgSegment.sender}</div>
                        }
                        {m.text}
                      </Box>
                      <Box className='date'>
                        {m.date}
                      </Box>
                    </Box>
                  ))
                }
              </Box>
            )
          })
        }
        <div style={{ float: "left", clear: "both" }}
             ref={(el) => { this.messagesEnd = el; }}>
        </div>
      </Box>
    )
  }
}

export default MsgDisplay