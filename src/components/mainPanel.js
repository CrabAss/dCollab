import React from 'react'
import SplitPane from 'react-split-pane'

import Kanban from '../containers/kanban'
import ChatPanel from '../containers/chatPanel'
import '../css/resizer.css'

const MainPanel = (props) => {
  if (props.isConfigured) {
    return (
      <SplitPane
        split="vertical"
        defaultSize={400}
        minSize={300}
        primary="second"
        className='unibox'
        style={{ flex: '0 1 auto' }}
      >
        <Kanban/>
        <ChatPanel/>
      </SplitPane>
    )
  }
  return <div />;
}

export default MainPanel