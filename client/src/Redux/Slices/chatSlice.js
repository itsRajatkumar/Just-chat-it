import { createSlice } from "@reduxjs/toolkit";

const initialState = [];
export const chatSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    addAllChats: (state, action) => {
      if (state.length === 0) {
        state.push(...action.payload);
      }
    },
    updateLastChat: (state, action) => {
      const index = state.findIndex((i) => i._id === action.payload.chatId);
      const data = state;
      var d = new Date();
      data[index].updatedAt = d.toISOString();
      data[index].last_message = action.payload.last_message;
      data[index].last_message_from = action.payload.last_message_from;
      state = data.sort((b, a) =>
        a.updatedAt > b.updatedAt ? 1 : b.updatedAt > a.updatedAt ? -1 : 0
      );
    },
    ClearChats: () => initialState,
  },
});

// this is for dispatch
export const { addAllChats, updateLastChat, ClearChats } = chatSlice.actions;

// this is for configureStore
export default chatSlice.reducer;
