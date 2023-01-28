import { Avatar, Button, Skeleton, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addAllChats } from "../../Redux/Slices/chatSlice";
import { changeChat } from "../../Redux/Slices/selectedChat";
import "./SidebarChat.css";
import axios from "axios";

const SidebarChat = ({ searchInput, setSearchInput }) => {
  const tempArray = [1, 2, 3, 4, 5, 6, 7];
  const dispatch = useDispatch();
  const chats = useSelector((state) => state.chats);
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const fetchChats = async () => {
    setLoading(true);
    axios
      .get(process.env.REACT_APP_SERVER_API + "/chat/" + user?.uid)
      .then((response) => {
        const products = response.data;
        dispatch(addAllChats(products.data));
      });
    setLoading(false);
  };

  const handleChangeChat = ({ id, chatId }) => {
    dispatch(changeChat({ id: id, chatId: chatId }));
    setSearchInput("");
  };

  useEffect(() => {
    if (!user.uid) {
      return;
    }
    fetchChats();
  }, [user]);

  return (
    <>
      {!loading &&
        chats?.map((item, index) => {
          if (
            (item?.is_group
              ? item?.chat_Name
              : user?.uid === item.members[0]?.uid
              ? item.members[1]?.displayName
              : item.members[0]?.displayName
            )
              .toLowerCase()
              .includes(searchInput.toLowerCase())
          )
            return (
              <div
                key={index}
                onClick={() =>
                  handleChangeChat({ id: index, chatId: item._id })
                }
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
                        color: "#8696a0",
                      }}
                      sx={{ m: 1, padding: 0, margin: 0 }}
                      size="small"
                      variant="text"
                    >
                      {item?.last_message_from?.split(" ")[0] +
                        ": " +
                        (item?.last_message.length > 20
                          ? item?.last_message.slice(0, 20) + "..."
                          : item?.last_message)}
                    </Button>
                  </Tooltip>
                </div>
              </div>
            );
        })}
      {loading &&
        tempArray.map((item, index) => (
          <div className="sidebarChat_skeleton">
            <Skeleton
              animation="wave"
              variant="circular"
              width={50}
              height={40}
            />
            <div className="sidebarChat__info_skeleton">
              <Skeleton
                animation="wave"
                height={10}
                width="80%"
                style={{ marginBottom: 6 }}
              />
              <Skeleton animation="wave" height={10} width="80%" />
            </div>
          </div>
        ))}
    </>
  );
};

export default SidebarChat;
