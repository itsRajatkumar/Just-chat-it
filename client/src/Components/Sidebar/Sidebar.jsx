import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import { SearchOutlined } from "@mui/icons-material";
import SidebarChat from "./SidebarChat";
import SidebarHeader from "./SidebarHeader";
import NewChatSearch from "./NewChatSearch";
import { useDispatch } from "react-redux";
import { addNewChat } from "../../Redux/Slices/chatSlice";
import { changeChat } from "../../Redux/Slices/selectedChat";
import pusher from "../../pusher";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
const Sidebar = () => {
  const dispatch = useDispatch();
  const [user, loading, error] = useAuthState(auth);
  const [searchInput, setSearchInput] = useState("");
  const [openSearch, setOpenSearch] = useState(0)
  useEffect(() => {
    const channel = pusher.subscribe(user.uid);

    channel.bind("new-chat", function (newMessage) {
      console.log(newMessage)
      dispatch(addNewChat(newMessage))
      dispatch(changeChat({ id: 0, chatId: newMessage._id }));
    })
  }, [])
  
  return (
    <>
      <div className={`sidebar ${openSearch===0?"":"header_search_new"}`}>
        <SidebarHeader setOpenSearch={setOpenSearch}/>
        <div className="sidebar__search">
          <div className="sidebar__searchContainer">
            <SearchOutlined />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              spellCheck="false"
              placeholder="Search"
            />
          </div>
        </div>
        <div className="sidebar__chats">
          <SidebarChat
            searchInput={searchInput}
            setSearchInput={setSearchInput}
          />
        </div>
      </div>
      <NewChatSearch setOpenSearch={setOpenSearch} openSearch={openSearch}/>
    </>
  );
};

export default Sidebar;
