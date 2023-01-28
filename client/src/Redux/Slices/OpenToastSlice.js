import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
  type:"success",
  message:""
};
export const OpenToastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    openToast: (state, action) =>action.payload,
    CloseToast: (state, action) => {
      state.open = false
    },
  },
});

// this is for dispatch
export const { openToast,CloseToast } = OpenToastSlice.actions;

// this is for configureStore
export default OpenToastSlice.reducer;
