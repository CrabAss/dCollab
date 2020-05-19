import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'

import { styles } from '../util/styles'
import SettingsDialog from '../containers/settings'

const TopBar = () => {
  return (
    <div>
      <AppBar position="static" >
        <Toolbar>
          <Typography variant="h6" className='flexGrow'>
            dCollab (COMP4913 Capstone Project)
          </Typography>
          <SettingsDialog />
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default withStyles(styles)(TopBar)

