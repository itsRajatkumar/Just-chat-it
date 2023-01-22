import { Avatar, Button, Tooltip } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addAllChats } from "../../Redux/Slices/chatSlice";
import { changeChat } from "../../Redux/Slices/selectedChat";
import "./SidebarChat.css";
import axios from "axios";

const SidebarChat = () => {
  const dispatch = useDispatch();
  const chats = useSelector((state) => state.chats);
  const [user, loading, error] = useAuthState(auth);

  const fetchChats = async () => {
    axios
      .get(process.env.REACT_APP_SERVER_API + "/chat/" + user.uid)
      .then((response) => {
        const products = response.data;
        dispatch(addAllChats(products.data));
      });
  };

  const handleChangeChat = ({ id, chatId }) => {
    dispatch(changeChat({ id: id, chatId: chatId }));
  };

  useEffect(() => {
    if (loading) {
      return;
    }
    fetchChats();
  }, [user, loading]);

  return (
    <>
      {chats?.map((item, index) => {
        return (
          <div
            key={index}
            onClick={() => handleChangeChat({ id: index, chatId: item._id })}
            className="sidebarChat"
          >
            <Avatar
              src={
                item?.is_group
                  ? item?.group_img
                  : user?.uid === item.members[0]?.uid
                  ? item.members[1]?.userImage
                  : item.members[0]?.userImage
              }
            />
            <div className="sidebarChat__info">
              <h2>
                {item?.is_group
                  ? item?.chat_Name
                  : user?.uid === item.members[0]?.uid
                  ? item.members[1]?.displayName
                  : item.members[0]?.displayName}
              </h2>
              <Tooltip title={item?.last_message}>
                <Button
                  style={{
                    textTransform: "none",
                    background: "none",
                    margin: "0px",
                    minWidth: "0",
                    color:"#8696a0"
                  }}
                  sx={{ m: 1, padding: 0, margin: 0 }}
                  size="small"
                  variant="text"
                >
                  { item?.last_message_from?.split(" ")[0]+ ": " + (item?.last_message.length > 20
                    ? item?.last_message.slice(0, 20) + "..."
                    : item?.last_message)}
                </Button>
              </Tooltip>
              {/* {item?.last_message.length > 20
                  ? item?.last_message.slice(0, 20) + "..."
                  : item?.last_message} */}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default SidebarChat;
