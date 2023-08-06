import { configureStore } from "@reduxjs/toolkit";
import titleReducer from "./titleSlice";
import questionReducer from "./questionSlice";

const store = configureStore({
  reducer: {
    title: titleReducer,
    question: questionReducer,
  },
});

export default store;
