import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import { SearchOutlined } from "@mui/icons-material";
import SidebarChat from "./SidebarChat";
import SidebarHeader from "./SidebarHeader";
import NewChatSearch from "./NewChatSearch";
import { useDispatch, useSelector } from "react-redux";
import { addNewChat } from "../../Redux/Slices/chatSlice";
import { changeChat } from "../../Redux/Slices/selectedChat";
import pusher from "../../pusher";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { ToastEmmitor } from "../../Utills/OpenToast";
const Sidebar = () => {
  const dispatch = useDispatch();
  const selectedChat = useSelector((state) => state.selectedChat);
  const [user, loading, error] = useAuthState(auth);
  const [searchInput, setSearchInput] = useState("");
  const [openSearch, setOpenSearch] = useState(0)
  useEffect(() => {
    const channel = pusher.subscribe(user.uid);

    channel.bind("new-chat", function (newChat) {
      dispatch(addNewChat(newChat))
      dispatch(changeChat({ id: (selectedChat.value+1), chatId: selectedChat.chatId }));
      ToastEmmitor("info","new Chat")
      // console.log(newMessage.members[newMessage.members.length-1].uid)
      // if(newMessage.members[newMessage.members.length-1].uid === user.uid){
      // }
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
