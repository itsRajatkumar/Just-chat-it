import { CircularProgress } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import pusher from "../../pusher";
import { addOlderMessage, addtoChatid } from "../../Redux/Slices/messageSlice";
import { updateLastChat } from "../../Redux/Slices/chatSlice";
import axios from "axios";

const ChatBody = ({ data, uid, Resultloading }) => {
  const scrollRef = useRef();
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.messages);
  const selectedChat = useSelector((state) => state.selectedChat);
  const loginuser = useSelector((state) => state.user);
  const messagesEndRef = useRef(null);
  const [loadingOld, setLoadingOld] = useState(false);
  const fetchMesages = async (page) => {
    setLoadingOld(true);
    axios
      .get(
        `${process.env.REACT_APP_SERVER_API}/message/${selectedChat.chatId}?page=${page}`
      )
      .then((response) => {
        const resp = response.data;
        dispatch(
          addOlderMessage({
            chatId: selectedChat.chatId,
            messages: resp.data,
          })
        );
        // setMessage(products.data);
        setLoadingOld(false);
      });
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  };

  const onScroll = () => {
    const scroll = scrollRef.current.scrollTop;
    if (scroll === 0) {
      if (
        parseInt(
          messages[messages.findIndex((i) => i.chatId === selectedChat.chatId)]
            ?.messages.length % 100
        ) === 0
      ) {
        fetchMesages(
          parseInt(
            messages[
              messages.findIndex((i) => i.chatId === selectedChat.chatId)
            ]?.messages.length / 100
          ) + 1
        );
      }
      console.log(
        parseInt(
          messages[messages.findIndex((i) => i.chatId === selectedChat.chatId)]
            ?.messages.length
        )
      );
    }
  };

  useEffect(() => {
    const channel = pusher.subscribe(selectedChat.chatId);

    channel.bind("new-message", function (newMessage) {
      if (newMessage?.from !== loginuser?.uid) {
        dispatch(
          addtoChatid({ chatId: selectedChat?.chatId, data: newMessage })
        );
        dispatch(
          updateLastChat({
            chatId: selectedChat?.chatId,
            last_message: newMessage?.message,
            last_message_from: newMessage?.fromName,
          })
        );
      }
    });
    if(!loadingOld){
      scrollToBottom();
    }
  }, [
    Resultloading,
    messages[messages.findIndex((i) => i?.chatId === selectedChat?.chatId)]
      ?.messages,
  ]);

  const Showdate = (date) => {
    const d = new Date(date);
    return d.toLocaleTimeString();
  };
  return (
    <div ref={scrollRef} onScroll={onScroll} className="chat__body">
      {loadingOld && <div className="spiner_oldmsg">
        <CircularProgress /></div>}
      {!Resultloading &&
        messages[
          messages.findIndex((i) => i.chatId === selectedChat.chatId)
        ]?.messages?.map((item, index) => {
          return (
            <p
              key={index}
              className={`chat__message ${
                item.from === uid ? "chat__receiver" : ""
              }`}
            >
              <span className="chat__name">{item?.fromName}</span>
              {item?.message}
              <span className="chat__timestamp">
                {Showdate(item?.createdAt)}
              </span>
            </p>
          );
        })}
      {Resultloading && (
        <div className="chat_spinner">
          <CircularProgress />
        </div>
      )}
      <div ref={messagesEndRef}></div>
    </div>
  );
};

export default ChatBody;
