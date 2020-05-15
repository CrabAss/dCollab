import React, { memo } from "react";
import { useInputValue, useTodos } from "./custom-hooks";
import '../../css/kanban.css'

import { List, Paper } from "@material-ui/core";
import TextField from '@material-ui/core/TextField'
import ListItem from '@material-ui/core/ListItem'
import Checkbox from '@material-ui/core/Checkbox'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import { DeleteOutlined } from '@material-ui/icons'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Box from '@material-ui/core/Box'

const TodoListItem = memo(props => (
  <ListItem divider={props.divider}>
    <Checkbox
      onClick={props.onCheckBoxToggle}
      checked={props.checked}
      disableRipple
    />
    <ListItemText primary={props.text} />
    <ListItemSecondaryAction>
      <IconButton aria-label="Delete Todo" onClick={props.onButtonClick}>
        <DeleteOutlined />
      </IconButton>
    </ListItemSecondaryAction>
  </ListItem>
));

const AddTodo = props => (
  <Box display="flex" flexDirection="row" alignItems="center" pt={2}>
    <Box flexGrow={1} pl={2}>
      <TextField
        placeholder="What're you going to do?"
        value={props.inputValue}
        onChange={props.onInputChange}
        onKeyPress={props.onInputKeyPress}
        fullWidth
        required
      />
    </Box>
    <Box>
      <IconButton
        color="secondary"
        onClick={props.onButtonClick}
      >
        <AddCircleIcon />
      </IconButton>
    </Box>
  </Box>
);


const TodoList = props => {
  return (
    <List>
      {props.items.map((todo, idx) => (
        <TodoListItem
          {...todo}
          key={`TodoItem.${idx}`}
          divider={idx !== props.items.length - 1}
          onButtonClick={() => props.onItemRemove(idx)}
          onCheckBoxToggle={() => props.onItemCheck(idx)}
        />
      ))}
    </List>
  )
};

const TodoApp = () => {
  const { inputValue, changeInput, clearInput, keyInput } = useInputValue()
  const { todos, addTodo, checkTodo, removeTodo } = useTodos()

  const clearInputAndAddTodo = _ => {
    clearInput();
    addTodo(inputValue);
  }
  return (
    <Paper className='todoApp'>
      <AddTodo
        inputValue={inputValue}
        onInputChange={changeInput}
        onButtonClick={clearInputAndAddTodo}
        onInputKeyPress={event => keyInput(event, clearInputAndAddTodo)}
      />
      <TodoList
        items={todos}
        onItemCheck={idx => checkTodo(idx)}
        onItemRemove={idx => removeTodo(idx)}
      />
    </Paper>
  )
}

export default TodoApp;
