import React, { useContext } from 'react'
import Web3 from 'web3';
import { useFormik } from 'formik';
import * as shortId from 'shortid';

import { decodeFromHex, encodeToHex, getMsgDate } from './util'
import { styles } from './styles'
import KanbanPanel from './kanban/kanbanPanel'
import './resizer.css'

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
import withStyles from '@material-ui/core/styles/withStyles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import SplitPane from 'react-split-pane'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'

const EMPTY_STRING = ""
const NameContext = React.createContext(EMPTY_STRING);

const TopBar = (props) => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className='flexGrow'>
            dCollab (COMP4913 Capstone Project)
          </Typography>
          {props.dialog}
        </Toolbar>
      </AppBar>
    </div>
  )
}

const SettingsDialog = (props) => {
  const [open, setOpen] = React.useState(!props.isConfigured);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const name = useContext(NameContext);
  const formik = useFormik({
    initialValues: {
      dcGroupId: props.symPassword,
      dcUsername: name
    },
    onSubmit: values => {
      if (props.configWithKey(values) !== false) {
        handleClose()
      }
    },
  });

  return (
    <div>
      <Button color="inherit" onClick={handleClickOpen}>
        Settings
      </Button>
      <Dialog open={open} onClose={formik.handleSubmit} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Settings</DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <DialogContentText>
              Please enter Group ID and your username to join a group.
            </DialogContentText>
            <TextField
              name="dcGroupId"
              margin="dense"
              label='Group ID'
              value={formik.values.dcGroupId}
              onBlur={() => props.updateSymKey(formik.values.dcGroupId)}
              onChange={formik.handleChange}
              fullWidth
              required
            />
            <TextField
              name="dcUsername"
              label='Username'
              value={formik.values.dcUsername}
              onChange={formik.handleChange}
              fullWidth
              required
            />
          </DialogContent>
          <DialogActions>
            <Button type='submit' color="primary">
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

const ChatPanel = (props) => {
  const formik = useFormik({
    initialValues: {
      text: EMPTY_STRING,
    },
    onSubmit: values => {
      props.sendMessage(values)
      formik.resetForm()
    },
  });
    return (
      <Box className="chatPanel fullHeight" p={1}>
        <MsgDisplay msgs={props.msgs} />
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
  static contextType = NameContext;

  scrollToBottom = () => this.messagesEnd.scrollIntoView();

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  render () {
    const selfName = this.context
    return (
      <Box id='messages'>
        {
          this.props.msgs.map((m) => {
            const msgType = selfName === m.username ? 'sent' : 'received'
            const msgClasses = `msg ${msgType}`
            return (
              <Box className={msgClasses} key={m.id}>
                <Box>
                  <Box className='content'>
                    {msgType === 'received' &&
                      <div className='name'>{m.username}</div>
                    }
                    {m.text}
                  </Box>
                  <Box className='date'>
                    {getMsgDate(m.date)}
                  </Box>
                </Box>
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

class App extends React.Component {
  constructor (props) {
    super(props);
    this.web3 = new Web3(new Web3.providers.WebsocketProvider("ws://localhost:8546"));
    this.shh = this.web3.shh;

    this.state = {
      tabIndex: 0,
      isConfigured: false,
      username: EMPTY_STRING,
      topic: null,
      msgs: [],
      symKey: EMPTY_STRING,
      symKeyId: null,
      symPassword: EMPTY_STRING,
    };

  }
  render () {
    const settingsDialog = <SettingsDialog
      updateSymKey={(symPassword) => this.updateSymKey(symPassword)}
      configWithKey={(values) => this.configWithKey(values)}
      symPassword={this.state.symPassword}
      isConfigured={this.state.isConfigured}
    />
    return (
      <NameContext.Provider value={this.state.username}>
        <TopBar classes={this.props.classes} dialog={settingsDialog} />
        {this.state.isConfigured &&
          <SplitPane split="vertical" defaultSize={400} minSize={300} primary="second" className='unibox'>
            <KanbanPanel/>
            <ChatPanel
              msgs={this.state.msgs}
              sendMessage={(values) => this.sendMessage(values)}
            />
          </SplitPane>
        }
      </NameContext.Provider>
    )
  }

  sendMessage(values) {
    const msg = {
      id: shortId.generate(),
      text: values.text,
      username: this.state.username
    };

    const postData = {
      symKeyID: this.state.symKeyId,
      topic: this.state.topic,
      payload: encodeToHex(JSON.stringify(msg)),
      ttl: 60,
      powTarget: 1,
      powTime: 100
    };

    this.shh.post(postData);
  }

  updateSymKey(symPassword) {
    Promise.all([
      this.shh.generateSymKeyFromPassword(symPassword).then(symKeyID => this.setState({symKeyId: symKeyID})),
    ]).then(() => {
      this.shh.getSymKey(this.state.symKeyId).then(symKey => {
        this.setState({
          topic: symKey.substring(0, 10),
          symKey: symKey,
          symPassword: symPassword
        })
      })
    })
  }

  configWithKey(values) {
    if (this.state.symPassword.length < 3) {
      alert("Group ID should be at least 3 characters!");
      return false;
    }
    if (!values.dcUsername || values.dcUsername.length === 0) {
      alert("Please pick a username!");
      return false;
    }

    let filter = {
      topics: [this.state.topic],
      symKeyID: this.state.symKeyId,
    }

    this.shh.subscribe('messages', filter, (error, message, subscription) => {
      let msgs = this.state.msgs.slice()
      let newMessageObj = decodeFromHex(message.payload);
      this.setState({
        msgs: msgs.concat({
          username: newMessageObj.username,
          text: newMessageObj.text,
          date: new Date(message.timestamp * 1000)
        }),
      })
    })

    this.setState({
      isConfigured: true,
      username: values.dcUsername,
    })
  }
}


export default withStyles(styles)(App);
