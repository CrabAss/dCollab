import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import Checkbox from '@material-ui/core/Checkbox'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import { DeleteOutlined } from '@material-ui/icons'
import EditableText from './editableText'

const TodoItem = props => (
  <ListItem divider={props.divider}>
    <Checkbox
      onClick={() => props.toggleTodo(props.id)}
      checked={props.isCompleted}
      disableRipple
    />
    <EditableText
      text={props.caption}
      className={props.isCompleted ? 'todo completed' : 'todo'}
      callback={(text) => props.modifyTodo(text)}
      isEditable={!props.isCompleted}
    />
    <ListItemSecondaryAction>
      <IconButton aria-label="Delete Todo" onClick={() => props.removeTodo(props.id)}>
        <DeleteOutlined/>
      </IconButton>
    </ListItemSecondaryAction>
  </ListItem>
)

export default TodoItem