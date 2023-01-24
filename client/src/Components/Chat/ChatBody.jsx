import { CircularProgress } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import pusher from "../../pusher";
import { addtoChatid } from "../../Redux/Slices/messageSlice";
import { updateLastChat } from "../../Redux/Slices/chatSlice";

const ChatBody = ({ data, uid, Resultloading }) => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.messages);
  const selectedChat = useSelector((state) => state.selectedChat);
  const loginuser = useSelector((state) => state.user);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  };

  useEffect(() => {
    const channel = pusher.subscribe(selectedChat.chatId);

    channel.bind("new-message", function (newMessage) {
      console.log(newMessage);
      if (newMessage.from !== loginuser.uid) {
        console.log(newMessage.fromName);
        dispatch(
          addtoChatid({ chatId: selectedChat.chatId, data: newMessage })
        );
        dispatch(
          updateLastChat({
            chatId: selectedChat.chatId,
            last_message: newMessage?.message,
            last_message_from: newMessage?.fromName,
          })
        );
      }
    });
    scrollToBottom();
  }, [
    Resultloading,
    messages[messages.findIndex((i) => i.chatId === selectedChat.chatId)]
      ?.messages,
  ]);

  const Showdate = (date) => {
    const d = new Date(date);
    return d.toLocaleTimeString();
  };
  return (
    <div className="chat__body">
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
