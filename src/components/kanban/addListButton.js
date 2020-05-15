import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AddIcon from '@material-ui/icons/Add'
import theme from '../../util/theme'

const useStyles = makeStyles({
  root: {
    border: '4px solid rgba(0, 0, 0, 0.12)',
    borderRadius: theme.spacing(2),
    width: 400,
    height: 160,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

const AddListButton = props => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <AddIcon fontSize='large'/>
    </div>
  )
}

export default AddListButton