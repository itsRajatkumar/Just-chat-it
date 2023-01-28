import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addAllMessages: (state, action) => {
      state.push({
        chatId: action.payload.chatId,
        messages: [...action.payload.messages],
      });
    },
    addtoChatid: (state, action) => {
      const index=  state.findIndex(i => i.chatId === action.payload.chatId)
      if(state[index].messages.findIndex(i => i._id === action.payload.data._id) ===-1){
        state[index].messages.push(action.payload.data)
      }
    },
    addOlderMessage: (state, action) => {
      const index=  state.findIndex(i => i.chatId === action.payload.chatId)
      state[index].messages = [...action.payload.messages, ...state[index].messages]
    },
    clearMessages: () => initialState,
  },
});

// this is for dispatch
export const { addAllMessages,addtoChatid ,clearMessages,addOlderMessage} = messageSlice.actions;

// this is for configureStore
export default messageSlice.reducer;
