import { AttachFile, InsertEmoticon, Mic, MoreVert, SearchOutlined } from '@mui/icons-material'
import { Avatar, IconButton } from '@mui/material'
import React, { useState } from 'react'
import './Chat.css'
const Chat = () => {
    const [input, setInput] = useState('')

  return (
    <div className='chat'>
        <div className="chat__header">
            <Avatar/>
            <div className="chat__headerInfo">
                <h3>Rajat</h3>
                <p>last seen</p>
            </div>
            <div className="chat__headerRight">
                <IconButton>
                    <SearchOutlined/>
                </IconButton>
                <IconButton>
                    <AttachFile/>
                </IconButton>
                <IconButton>
                    <MoreVert/>
                </IconButton>
            </div>
        </div>
        <div className="chat__body">
            <p className='chat__message'>
                <span className='chat__name'>Rajat</span>
                This is a message
                <span className="chat__timestamp">
                    {new Date().toUTCString()}
                </span>
            </p>
            <p className='chat__message chat__receiver'>
                <span className='chat__name'>Rajat</span>
                This is a message
                <span className="chat__timestamp">
                    {new Date().toUTCString()}
                </span>
            </p>
            <p className='chat__message'>
                <span className='chat__name'>Rajat</span>
                This is a message
                <span className="chat__timestamp">
                    {new Date().toUTCString()}
                </span>
            </p>
        </div>
        <div className="chat__footer">
            <InsertEmoticon/>
            <form >
                <input
                    value={input}
                    onChange = {(e) => setInput(e.target.value)}
                    placeholder= "Type your message"
                    type='text'
                />
                <button 
                type='submit'>
                    Send
                </button>
            </form>
            <Mic/>
        </div>
    </div>
  )
}

export default Chat