import React from 'react'
import Box from '@material-ui/core/Box'
import { INIT_CHAT } from '../../const/messageType'

class MsgDisplay extends React.Component {

  scrollToBottom = () => this.messagesEnd.scrollIntoView();
  componentDidMount() {
    this.scrollToBottom();
  }
  componentDidUpdate() {
    this.scrollToBottom();
  }

  render () {
    return (
      <Box id='messages'>
        {
          this.props.msgs.map((msgSegment) => {
            if (msgSegment.type === INIT_CHAT) {
              return (
                <Box className='msg join' key={msgSegment.id}>
                  <Box className='joinBubble'>
                    <Box className='date'>
                      {msgSegment.date}
                    </Box>
                    <Box className='content'>
                      {msgSegment.sender + ' joined the group!'}
                    </Box>
                  </Box>
                </Box>
              )
            }
            const msgType = this.props.username === msgSegment.sender ? 'sent' : 'received'
            const msgClasses = `msg ${msgType}`
            return (
              <Box className={msgClasses} key={msgSegment.id}>
                {
                  msgSegment.messages.map((m, idx) => (
                    <Box className='msgBubble' key={m.id}>
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