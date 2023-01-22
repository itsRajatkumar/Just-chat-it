import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: -1,
  chatId: "",
};
export const selectedChatSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    changeChat: (state, action) => {
      state.value = action.payload.id;
      state.chatId = action.payload.chatId;
    },
    clearSelectedChat: () => initialState,
  },
});

// this is for dispatch
export const { changeChat,clearSelectedChat } = selectedChatSlice.actions;

// this is for configureStore
export default selectedChatSlice.reducer;
