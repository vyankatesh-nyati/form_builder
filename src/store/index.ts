import { configureStore } from "@reduxjs/toolkit";
import titleReducer from "./titleSlice";

const store = configureStore({
  reducer: {
    title: titleReducer,
  },
});

export default store;
