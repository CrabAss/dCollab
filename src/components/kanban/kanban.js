import React from 'react'
import TodoApp from './todoApp'
import AddListButton from './addListButton'
import {
  ADD_LIST,
  ADD_TODO,
  MODIFY_LIST_TITLE,
  MODIFY_TODO,
  REMOVE_LIST,
  REMOVE_TODO,
  TOGGLE_TODO
} from '../../actions/kanban'

import Box from '@material-ui/core/Box'
import * as shortId from 'shortid'
import { encodeToHex } from '../../util/util'
import { KANBAN_ACTION } from '../../const/messageType'

const ListWrapper = props => (
  <div className='listWrapper'>
    {props.children}
  </div>
)

const Kanban = props => {
  const addTodo = (listId, text) => {
    const newTodoId = shortId.generate()
    broadcastAction(ADD_TODO, listId, newTodoId, text)
  }
  const toggleTodo = (listId, todoId) => {
    broadcastAction(TOGGLE_TODO, listId, todoId, null)
  }
  const removeTodo = (listId, todoId) => {
    broadcastAction(REMOVE_TODO, listId, todoId, null)
  }
  const modifyTodo = (listId, todoId, text) => {
    broadcastAction(MODIFY_TODO, listId, todoId, text)
  }
  const addList = () => {
    const newListId = shortId.generate()
    broadcastAction(ADD_LIST, newListId, null, 'Untitled List')
  }
  const removeList = (listId) => {
    broadcastAction(REMOVE_LIST, listId, null, null)
  }
  const modifyListTitle = (listId, title) => {
    broadcastAction(MODIFY_LIST_TITLE, listId, null, title)
  }

  const broadcastAction = (type, listId, todoId, text) => {
    const msg = {
      id: shortId.generate(),
      type: KANBAN_ACTION,
      actionType: type,
      listId: listId,
      todoId: todoId,
      text: text,
      sender: props.username,
      date: new Date(),
    }

    const postData = {
      symKeyID: props.config.symKeyID,
      topic: props.config.topic,
      payload: encodeToHex(JSON.stringify(msg)),
      ttl: 60,
      powTarget: 1,
      powTime: 100
    }

    props.shh.post(postData)
  }

  return (
    <Box p={3} className='kanbanRoot'>
      {
        props.kanban.map(todoList => (
          <ListWrapper key={todoList.id}>
            <TodoApp
              items={todoList.items}
              title={todoList.title}

              addTodo={text => addTodo(todoList.id, text)}
              toggleTodo={(todoId) => toggleTodo(todoList.id, todoId)}
              removeTodo={(todoId) => removeTodo(todoList.id, todoId)}
              modifyTodo={(todoId, text) => modifyTodo(todoList.id, todoId, text)}

              showRemoveBtn={props.kanban.length > 1}
              removeList={() => removeList(todoList.id)}
              modifyListTitle={(title) => modifyListTitle(todoList.id, title)}
            />
          </ListWrapper>
        ))
      }
      <ListWrapper>
        <AddListButton onClick={() => addList()}/>
      </ListWrapper>
    </Box>
  )
}

export default Kanban