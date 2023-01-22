import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './Slices/chatSlice';
import messageSlice from './Slices/messageSlice';
import selectedChatSlice from './Slices/selectedChat';
import userSlice from './Slices/userSlice';

export default configureStore({
  reducer: {
    chats:chatReducer,
    messages:messageSlice,
    selectedChat:selectedChatSlice,
    user:userSlice
  },
});