import React from 'react'
import { useFormik } from 'formik'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import TextField from '@material-ui/core/TextField'
import DialogActions from '@material-ui/core/DialogActions'

const EMPTY_STRING = ''

export const SettingsDialog = props => {

  const [open, setOpen] = React.useState(!props.config.isConfigured)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const configWhisper = values => {
    props.shh.generateSymKeyFromPassword(values.dcGroupId).then(symKeyID => {
      props.shh.getSymKey(symKeyID).then(symKey => {
        props.clearMessage()
        props.setWhisper({
          topic: symKey.substring(0, 10),
          symKeyID: symKeyID,
          symPassword: values.dcGroupId,
          isConfigured: true,
          username: values.dcUsername,
        })
        window.location.reload()
      })
    })
  }

  const isGroupIdEqual = (values) =>
    values.dcGroupId === props.config.symPassword &&
    values.dcGroupId.length >= 3

  const isUsernameEqual = (values) =>
    values.dcUsername === props.config.username &&
    values.dcUsername !== EMPTY_STRING

  const validate = (values) => {
    const errors = {}
    if (values.dcGroupId.length < 3) {
      errors.dcGroupId = 'At least 3 characters are required.'
    }
    if (!values.dcUsername) {
      errors.dcUsername = 'Required.'
    }
    return errors
  }

  const formik = useFormik({
    initialValues: {
      dcGroupId: props.config.symPassword,
      dcUsername: props.config.username,
    },
    onSubmit: values => {
      if (isGroupIdEqual(values)) {
        if (!isUsernameEqual(values)) {
          props.setUsername(values.dcUsername)
        }
        handleClose()
      } else {
        configWhisper(values)
      }
    },
    validate,
  })

  return (
    <div>
      <Button color="inherit" onClick={handleClickOpen} style={{ textTransform: 'none' }}>
        {!props.config.isConfigured
          ? 'SETTINGS'
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
              error={!!formik.errors.dcGroupId}
              helperText={formik.errors.dcGroupId}
            />
            <TextField
              name="dcUsername"
              label='Username'
              value={formik.values.dcUsername}
              onChange={formik.handleChange}
              fullWidth
              required
              error={!!formik.errors.dcUsername}
              helperText={formik.errors.dcUsername}
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
  )
}
