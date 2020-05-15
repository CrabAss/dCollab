import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import Checkbox from '@material-ui/core/Checkbox'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import { DeleteOutlined } from '@material-ui/icons'

const TodoItem = props => (
  <ListItem divider={props.divider}>
    <Checkbox
      onClick={() => props.toggleTodo(props.id)}
      checked={props.isCompleted}
      disableRipple
    />
    <ListItemText primary={props.caption} style={{ textDecoration: props.isCompleted ? 'line-through' : 'none' }}/>
    <ListItemSecondaryAction>
      <IconButton aria-label="Delete Todo" onClick={() => props.removeTodo(props.id)}>
        <DeleteOutlined/>
      </IconButton>
    </ListItemSecondaryAction>
  </ListItem>
)

export default TodoItem