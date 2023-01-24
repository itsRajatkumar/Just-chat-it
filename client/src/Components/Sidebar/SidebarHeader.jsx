import React from "react";
import ChatIcon from "@mui/icons-material/Chat";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import { Avatar, IconButton } from "@mui/material";
import AccountMenu from "../AcountPopup/AccountPopup";
import { useSelector } from "react-redux";

const SidebarHeader = ({setOpenSearch}) => {
  const user = useSelector((state) => state.user);
  return (
    <div className="sidebar__header ">
      <div className="sidebar__headerLeft">
        <Avatar src={user?.photoURL} />
      </div>
      <div className="sidebar__headerRight">
        <IconButton>
          <DonutLargeIcon />
        </IconButton>
        <IconButton onClick={()=>setOpenSearch(1)}>
          <ChatIcon/>
        </IconButton>
        <AccountMenu />
        {/* <IconButton>
            <MoreVertIcon />
        </IconButton> */}
      </div>
    </div>
  );
};

export default SidebarHeader;
