import React, { useState } from 'react'
import { InsertEmoticon, Mic } from '@mui/icons-material'
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import { addtoChatid } from '../../Redux/Slices/messageSlice';
import { updateLastChat } from '../../Redux/Slices/chatSlice';

const ChatFooter = () => {
  const dispatch = useDispatch()
    const [user, loading, error] = useAuthState(auth);
    const selectedChat = useSelector((state) => state.selectedChat);
    const loginuser = useSelector((state) => state.user);
    const [input, setInput] = useState('')
    const handleSubmit = (e)=>{
        e.preventDefault()
        if(input == "")return
        axios.post(`${process.env.REACT_APP_SERVER_API}/message/create-new`, { 
                message: input,
                chat_id: selectedChat.chatId,
                from:loginuser?.uid,
                fromName:loginuser?.name
         })
        .then(res => {
          dispatch(addtoChatid({chatId:selectedChat.chatId,data:res?.data?.data}))
          dispatch(updateLastChat({chatId:selectedChat.chatId,last_message:res?.data?.data?.message,last_message_from:res?.data?.data?.fromName}))
          setInput("")
        })

    }
  return (
    <div className="chat__footer">
            <InsertEmoticon/>
            <form onSubmit={handleSubmit} >
                <input
                    value={input}
                    onChange = {(e) => setInput(e.target.value)}
                    placeholder= "Type your message"
                    type='text'
                />
                <button 
                type='submit'>
                    Send
                </button>
            </form>
            <Mic/>
        </div>
  )
}

export default ChatFooter