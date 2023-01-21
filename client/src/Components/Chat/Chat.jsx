import React, { useState } from 'react'
import './Chat.css'
import ChatBody from './ChatBody'
import ChatFooter from './ChatFooter'
import ChatHeader from './ChatHeader'
const Chat = () => {
    const [input, setInput] = useState('')
    const d = new Date()
    const time = d.toLocaleTimeString()


  return (
    <div className='chat'>
        <ChatHeader/>
        <ChatBody/>
        <ChatFooter/>
    </div>
  )
}

export default Chat