import React from 'react'
import './Sidebar.css'
import { SearchOutlined } from '@mui/icons-material';
import SidebarChat from './SidebarChat';
import SidebarHeader from './SidebarHeader';
const Sidebar = () => {
	return (
		<div className='sidebar'>
			<SidebarHeader/>
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