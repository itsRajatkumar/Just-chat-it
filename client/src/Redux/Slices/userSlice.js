import { createSlice } from "@reduxjs/toolkit";

const initialState ={}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    LoginUser: (state, action) => {
      state.uid = action.payload?.uid
      state.name = action.payload?.name
      state.email = action.payload?.email
      state.photoURL = action.payload?.photoURL
    },
    LogoutUser: () => initialState,
  },
});

// this is for dispatch
export const { LoginUser, LogoutUser } = userSlice.actions;

// this is for configureStore
export default userSlice.reducer;
