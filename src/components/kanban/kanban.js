import React from 'react'
import TodoApp from '../../containers/kanban'
import AddListButton from './addListButton'
import Box from '@material-ui/core/Box'

const ListWrapper = props => (
  <div className='listWrapper'>
    {props.children}
  </div>
)

const Kanban = props => (
  <Box p={3} className='kanbanRoot'>
    <ListWrapper>
      <TodoApp/>
    </ListWrapper>
    <ListWrapper>
      <AddListButton/>
    </ListWrapper>
  </Box>
)

export default Kanban