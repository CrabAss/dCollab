import { useFormik } from 'formik'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import SendIcon from '@material-ui/icons/Send'
import React from 'react'
import { encodeToHex, getMsgDate } from '../../util/util'
import * as shortId from 'shortid'

const EMPTY_STRING = ""

export const ChatPanel = (props) => {
  const sendMessage = (values) => {
    const msg = {
      id: shortId.generate(),
      text: values.text,
      sender: props.username,
      date: new Date(),
    };

    const postData = {
      symKeyID: props.symKeyID,
      topic: props.topic,
      payload: encodeToHex(JSON.stringify(msg)),
      ttl: 60,
      powTarget: 1,
      powTime: 100
    };

    props.shh.post(postData);
  }

  const formik = useFormik({
    initialValues: {
      text: EMPTY_STRING,
    },
    onSubmit: values => {
      sendMessage(values)
      formik.resetForm()
    },
  });
  return (
    <Box className="chatPanel fullHeight" p={1}>
      <MsgDisplay msgs={props.msgs} username={props.username} />
      <form onSubmit={formik.handleSubmit}>
        <Box display="flex" flexDirection="row" alignItems="center">
          <Box flexGrow={1}>
            <TextField
              name="text"
              placeholder='Write your message...'
              value={formik.values.text}
              onChange={formik.handleChange}
              fullWidth
              required
            />
          </Box>
          <Box>
            <IconButton type='submit' aria-label="send">
              <SendIcon />
            </IconButton>
          </Box>
        </Box>
      </form>
    </Box>
  )
}


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

