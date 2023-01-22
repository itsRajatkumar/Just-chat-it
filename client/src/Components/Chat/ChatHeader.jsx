import React from 'react'
import { AttachFile, MoreVert, SearchOutlined } from '@mui/icons-material'
import { Avatar, IconButton } from '@mui/material'
import { useSelector } from "react-redux";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';

const ChatHeader = () => {
    const [user, loading, error] = useAuthState(auth);
    const selectedChat = useSelector((state) => state.selectedChat);
    const chats = useSelector((state) => state.chats);
  return (
    <div className="chat__header">
    <Avatar/>
    <div className="chat__headerInfo">
        <h3>{chats[selectedChat.value]?.is_group
                            ? chats[selectedChat.value]?.chat_Name
                            : user?.uid === chats[selectedChat.value]?.members[0]?.uid
                              ? chats[selectedChat.value]?.members[1]?.displayName
                              : chats[selectedChat.value]?.members[0]?.displayName}</h3>
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