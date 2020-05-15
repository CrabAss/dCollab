import SplitPane from 'react-split-pane'
import KanbanPanel from './kanban/kanbanPanel'
import ChatPanel from '../containers/chat'
import React from 'react'
import '../css/resizer.css'

const MainPanel = (props) => {
  if (props.isConfigured) {
    return (
      <SplitPane split="vertical" defaultSize={400} minSize={300} primary="second" className='unibox'>
        <KanbanPanel />
        <ChatPanel />
      </SplitPane>
    )
  }
  return <div />;
}

export default MainPanel