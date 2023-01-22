import React, { useEffect, useState } from "react";
import "./Chat.css";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";
import ChatHeader from "./ChatHeader";
import axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { addAllMessages } from "../../Redux/Slices/messageSlice";

const Chat = () => {
  const dispatch = useDispatch();
  const selectedChat = useSelector((state) => state.selectedChat);
  const messages = useSelector((state) => state.messages);
  const value = selectedChat.value
  const [user, loading, error] = useAuthState(auth);
  // const [message, setMessage] = useState([]);
  const [Resultloading, setResultLoading] = useState(false);
  // console.log(message);
  const fetchMesages = async () => {
    setResultLoading(true);
    axios
      .get(
        `${
          process.env.REACT_APP_SERVER_API
        }/message/${selectedChat.chatId}?page=${1}`
      )
      .then((response) => {
        const products = response.data;
        dispatch(
          addAllMessages({
            chatId: selectedChat.chatId,
            messages: products.data,
          })
        );
        // setMessage(products.data);
        setResultLoading(false);
      });
  };
  useEffect(() => {
    if (loading) {
      return;
    }
    if(value !== -1){
      if( messages.findIndex(i => i.chatId === selectedChat.chatId)===-1){
        fetchMesages()
      }
    }
  }, [user, loading,value]);
  return (
    <div className="chat">
      <ChatHeader />
      <ChatBody uid={user?.uid} Resultloading={Resultloading} />
      <ChatFooter />
    </div>
  );
};

export default Chat;
