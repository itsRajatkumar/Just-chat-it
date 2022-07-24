import React from 'react'
import ChatIcon from '@mui/icons-material/Chat';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import './Sidebar.css'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Avatar, IconButton } from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';
import SidebarChat from './SidebarChat';
const Sidebar = () => {
	return (
		<div className='sidebar'>
			<div className="sidebar__header">
				<div className="sidebar__headerLeft">
					<Avatar src='./sdhd' />
				</div>
				<div className="sidebar__headerRight">
					<IconButton>
						<DonutLargeIcon />
					</IconButton>
					<IconButton>
						<ChatIcon />
					</IconButton>
					<IconButton>
						<MoreVertIcon />
					</IconButton>
				</div>
			</div>
			<div className="sidebar__search">
				<div className="sidebar__searchContainer">
					<SearchOutlined/>
					<input type="text" spellCheck='false' placeholder='Search or New Chat '/>
				</div>
			</div>
			<div className="sidebar__chats">
				<SidebarChat/>
			</div>
		</div>
	)
}

export default Sidebar