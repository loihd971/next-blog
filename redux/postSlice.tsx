import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
});

export const {} = postSlice.actions;

export default postSlice.reducer;
