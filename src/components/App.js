import React from 'react'

import TopBar from './topBar'
import MainPanel from '../containers/mainPanel'
import { decodeFromHex, encodeToHex } from '../util/util'

class App extends React.Component {
  componentDidMount () {
    if (this.props.config.isConfigured) {
      console.log('State restored from localStorage')
      let filter = {
        topics: [this.props.config.symKey.substring(0, 10)],
        symKeyID: this.props.config.symKeyID,
      }

      this.props.shh.subscribe('messages', filter, (error, message, subscription) => {
        let newMessageObj = decodeFromHex(message.payload)
        // console.log(newMessageObj)
        if (newMessageObj.id === '0') {
          this.props.setSubscriptionID(subscription.id)
          if (newMessageObj.sender !== this.props.config.username) {
            console.log(newMessageObj.sender + ' joined this group!')
          }
        } else {
          this.props.newMessage(newMessageObj)
        }
      })
      this.sendHelloSignal()
    }
  }

  sendHelloSignal = () => this.sendSignal('0')

  sendSignal = (id) => {
    // console.log('Sent signal: ' + id)
    const msg = {
      id: id,
      sender: this.props.config.username,
    };

    const postData = {
      symKeyID: this.props.config.symKeyID,
      topic: this.props.config.topic,
      payload: encodeToHex(JSON.stringify(msg)),
      ttl: 60,
      powTarget: 1,
      powTime: 100
    };

    this.props.shh.post(postData);
  }


  render () {
    return (
      <div className='app'>
        <TopBar/>
        <MainPanel/>
      </div>
    )
  }
}

export default App;
