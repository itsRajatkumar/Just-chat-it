import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './Slices/chatSlice';
import messageSlice from './Slices/messageSlice';
import OpenPopupSlice  from './Slices/OpenToastSlice';
import selectedChatSlice from './Slices/selectedChat';
import userSlice from './Slices/userSlice';

const store = configureStore({
  reducer: {
    chats:chatReducer,
    messages:messageSlice,
    selectedChat:selectedChatSlice,
    user:userSlice,
    toast:OpenPopupSlice
  },
});

export default store