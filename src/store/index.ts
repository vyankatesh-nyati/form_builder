import { configureStore } from "@reduxjs/toolkit";
import titleReducer from "./titleSlice";
import questionReducer from "./questionSlice";
import formResponseReducer from "./formResponseSlice";

const store = configureStore({
  reducer: {
    title: titleReducer,
    question: questionReducer,
    formResponse: formResponseReducer,
  },
});

export default store;
