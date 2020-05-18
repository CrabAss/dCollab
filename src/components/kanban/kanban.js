import React from 'react'
import TodoApp from './todoApp'
import AddListButton from './addListButton'
import Box from '@material-ui/core/Box'

const ListWrapper = props => (
  <div className='listWrapper'>
    {props.children}
  </div>
)

const Kanban = props => (
  <Box p={3} className='kanbanRoot'>
    {
      props.kanban.map(todoList => (
        <ListWrapper key={todoList.id}>
          <TodoApp
            items={todoList.items}
            title={todoList.title}

            addTodo={text => props.addTodo(todoList.id, text)}
            toggleTodo={(todoId) => props.toggleTodo(todoList.id, todoId)}
            removeTodo={(todoId) => props.removeTodo(todoList.id, todoId)}
            modifyTodo={(todoId, text) => props.modifyTodo(todoList.id, todoId, text)}

            showRemoveBtn={props.kanban.length > 1}
            removeList={() => props.removeList(todoList.id)}
            modifyListTitle={(title) => props.modifyListTitle(todoList.id, title)}
          />
        </ListWrapper>
      ))
    }
    <ListWrapper>
      <AddListButton onClick={() => props.addList()}/>
    </ListWrapper>
  </Box>
)

export default Kanban