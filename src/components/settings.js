import React from 'react'
import { useFormik } from 'formik'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import TextField from '@material-ui/core/TextField'
import DialogActions from '@material-ui/core/DialogActions'
import { decodeFromHex, encodeToHex } from '../util/util'

const EMPTY_STRING = ''

export const SettingsDialog = (props) => {

  const [open, setOpen] = React.useState(!props.config.isConfigured);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const configWhisper = (values) => {
    if (values.dcGroupId.length < 3) {
      alert("Group ID should be at least 3 characters!");
      return false;
    }
    if (!values.dcUsername || values.dcUsername.length === 0) {
      alert("Please pick a username!");
      return false;
    }
    props.shh.generateSymKeyFromPassword(values.dcGroupId).then(symKeyID => {
      props.setSymKeyId(symKeyID)
      props.shh.getSymKey(symKeyID).then(symKey => {
        let filter = {
          topics: [symKey.substring(0, 10)],
          symKeyID: symKeyID,
        }
        if (props.config.subscriptionID !== EMPTY_STRING) {
          props.shh.unsubscribe(props.subscriptionID)
        }

        props.shh.subscribe('messages', filter, (error, message, subscription) => {
          let newMessageObj = decodeFromHex(message.payload)
          console.log(newMessageObj)
          if (newMessageObj.id === '0') {
            props.setSubscriptionID(subscription.id)
          } else {
            props.newMessage(newMessageObj)
          }
        })

        props.setWhisper({
          topic: symKey.substring(0, 10),
          symKey: symKey,
          symPassword: values.dcGroupId,
          isConfigured: true,
          username: values.dcUsername,
        })

        setTimeout(() => sendInitSignal(), 1000)  // not working
      })
    })
  }

  const sendInitSignal = () => {
    console.log('send init signal: ' + props.config.symKeyID)
    const msg = {
      id: '0',
    };  // init signal

    const postData = {
      symKeyID: props.config.symKeyID,
      topic: props.config.topic,
      payload: encodeToHex(JSON.stringify(msg)),
      ttl: 60,
      powTarget: 1,
      powTime: 100
    };

    props.shh.post(postData);
  }

  const formik = useFormik({
    initialValues: {
      dcGroupId: props.config.symPassword,
      dcUsername: props.config.username,
    },
    onSubmit: values => {
      if (configWhisper(values) !== false) {
        handleClose()
      }
    },
  });

  return (
    <div>
      <Button color="inherit" onClick={handleClickOpen} style={{textTransform: 'none'}}>
        {!props.config.isConfigured
          ? "SETTINGS"
          : props.config.username + ' @ ' + props.config.symPassword}
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
