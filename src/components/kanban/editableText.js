import React, { useState } from 'react'
import { useFormik } from 'formik'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  root: {
    flex: '1 1 auto',
    minWidth: 0,
    marginTop: 4,
    marginBottom: 4,
  },
})

const NanoForm = props => {
  const formik = useFormik({
    initialValues: {
      text: props.text,
    },
    onSubmit: values => {
      props.callback(values.text)
    },
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        name="text"
        value={formik.values.text}
        onChange={formik.handleChange}
        onBlur={formik.handleSubmit}
        fullWidth
        required
      />
    </form>
  )

}

const EditableText = props => {
  const classes = useStyles()
  const [isEditing, setIsEditing] = useState(false)
  let child
  if (props.isEditable) {
    child = isEditing ? (
      <NanoForm
        text={props.text}
        callback={(text) => {
          setIsEditing(false)
          props.callback(text)
        }}
      />
    ) : (
      <Typography
        onClick={() => setIsEditing(true)}
      >
        {props.text}
      </Typography>
    )
  } else {
    child = <Typography>{props.text}</Typography>
  }
  return <div className={classes.root + ' ' + props.className}>{child}</div>
}

export default EditableText