import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "Untitled Form",
};

const titleSlice = createSlice({
  name: "title",
  initialState: initialState,
  reducers: {
    changeTitle(state, action) {
      state.title = action.payload.title;
    },
  },
});

export const titleActions = titleSlice.actions;
export default titleSlice.reducer;
