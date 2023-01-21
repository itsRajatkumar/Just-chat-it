import React from 'react'
import { AttachFile, MoreVert, SearchOutlined } from '@mui/icons-material'
import { Avatar, IconButton } from '@mui/material'
const ChatHeader = () => {
  return (
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
  )
}

export default ChatHeader