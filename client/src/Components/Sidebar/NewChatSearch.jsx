import React, { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { SearchOutlined } from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { changeChat } from "../../Redux/Slices/selectedChat";
import { async } from "@firebase/util";
import axios from "axios";
import pusher from "../../pusher";

const NewChatSearch = ({ setOpenSearch, openSearch }) => {
  const dispatch = useDispatch();
  const [newSearchInput, setNewSearchInput] = useState("");
  const [Users, setUsers] = useState([]);
  const loginuser = useSelector((state) => state.user);
  const chats = useSelector((state) => state.chats);
  console.log(loginuser);
  const fetchUserName = async () => {
    try {
      let allUsers = [];
      const q = query(collection(db, "users"), orderBy("name"));
      const doc = await getDocs(q);
      const datas = doc.docs.map((item) => {
        if (loginuser.uid === item.data().uid) {
        } else {
          allUsers.push(item.data());
        }
      });
      setUsers([...allUsers]);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };
  const handleNewChat = (clicked_user) => {
    let is_found = false;
    chats.map((item, index) => {
      if (!item.is_group) {
        item.members.map(async (member) => {
          if (member.uid === clicked_user.uid) {
            is_found = true;
            dispatch(changeChat({ id: index, chatId: item._id }));
            setOpenSearch(0);
          } 
        });
      }
    });
    if(!is_found){
      axios
        .post(`https://8000-itsrajatkuma-justchatit-7ne62q3cvdt.ws-us83.gitpod.io/chat/create-new`, {
        // .post(`${process.env.REACT_APP_SERVER_API}/chat/create-new`, {
          members :[
            {
              uid:clicked_user?.uid,
              displayName:clicked_user.name,
              userImage:clicked_user.photoURL
            },
            {
              uid:loginuser?.uid,
              displayName:loginuser.name,
              userImage:loginuser.photoURL
            }
          ],
          is_group: false
        })
        .then((res) => {
          console.log(res)
          setOpenSearch(0);
        });

      console.log("create new");
    }
  };
  useEffect(() => {
    fetchUserName();
  }, [loginuser]);
  return (
    <>
      <div className={`sidebar ${openSearch === 1 ? "" : "header_search_new"}`}>
        <div className="sidebar__header">
          <IconButton onClick={() => setOpenSearch(0)}>
            <ArrowBackIcon />
          </IconButton>
        </div>
        <div className="sidebar__search">
          <div className="sidebar__searchContainer">
            <SearchOutlined />
            <input
              type="text"
              value={newSearchInput}
              onChange={(e) => setNewSearchInput(e.target.value)}
              spellCheck="false"
              placeholder="Search"
            />
          </div>
        </div>
        <div className="sidebar__chats">
          {Users.map((item, index) => {
            return (
              <div
                key={index}
                onClick={() => handleNewChat(item)}
                className="sidebarChatSearch"
              >
                <Avatar src={""} />
                <div className="sidebarChat__info_search">
                  <h2>{item?.name}</h2>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default NewChatSearch;
