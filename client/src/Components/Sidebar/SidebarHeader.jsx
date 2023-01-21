import React from 'react'
import ChatIcon from '@mui/icons-material/Chat';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import { Avatar, IconButton } from '@mui/material';
import AccountMenu from '../AcountPopup/AccountPopup';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";

const SidebarHeader = () => {
    const [user, loading, error] = useAuthState(auth);
  return (
    <div className="sidebar__header">
    <div className="sidebar__headerLeft">
        <Avatar src={user?.photoURL} />
    </div>
    <div className="sidebar__headerRight">
        <IconButton>
            <DonutLargeIcon />
        </IconButton>
        <IconButton>
            <ChatIcon />
        </IconButton>
        <AccountMenu/>
        {/* <IconButton>
            <MoreVertIcon />
        </IconButton> */}
    </div>
</div>
  )
}

export default SidebarHeader