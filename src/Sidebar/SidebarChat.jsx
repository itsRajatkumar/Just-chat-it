import { Avatar } from '@mui/material'
import React from 'react'
import './SidebarChat.css'
const SidebarChat = () => {
  return (
    <div className='sidebarChat'>
        <Avatar/>
        <div className="sidebarChat__info">
            <h2>Name</h2>
            <p>info</p>
        </div>
    </div>
  )
}

export default SidebarChat