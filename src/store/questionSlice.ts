import { createSlice } from "@reduxjs/toolkit";
import QuestionType from "../enums/QuestionType";
import { uid } from "uid";
import QuestionModel from "../interfaces/QuestionModel";

const initialState: {
  questions: Array<QuestionModel>;
} = {
  questions: [],
};

const questionSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    addNewQuestion(state) {
      state.questions.push({
        id: uid(),
        type: QuestionType.Categorize,
        question: "",
        categories: [
          {
            id: uid(),
            name: "category",
          },
        ],
        items: [],
      });
    },
    setCategory(state, action) {
      const index: number = state.questions.findIndex(
        (element) => element.id === action.payload.id
      );
      if (index !== -1) {
        state.questions[index].categories = action.payload.categories;
      }
    },
    setItem(state, action) {
      const index: number = state.questions.findIndex(
        (element) => element.id === action.payload.id
      );
      if (index !== -1) {
        state.questions[index].items = action.payload.items;
      }
    },
    changeCategoryName(
      state,
      action: {
        type: string;
        payload: {
          id: string;
          index: number;
          categoryName: string;
        };
      }
    ) {
      const index: number = state.questions.findIndex(
        (element) => element.id === action.payload.id
      );
      if (index !== -1) {
        state.questions[index].categories[action.payload.index].name =
          action.payload.categoryName;
      }
    },
    addNewCategory(state, action: { type: string; payload: { id: string } }) {
      const index: number = state.questions.findIndex(
        (element) => element.id === action.payload.id
      );
      if (index !== -1) {
        state.questions[index].categories.push({
          id: uid(),
          name: "category",
        });
      }
    },
    changeItemValues(
      state,
      action: {
        type: string;
        payload: { id: string; item: string; index: number; category: string };
      }
    ) {
      const index: number = state.questions.findIndex(
        (element) => element.id === action.payload.id
      );
      if (index !== -1) {
        state.questions[index].items[action.payload.index].name =
          action.payload.item;
        state.questions[index].items[action.payload.index].category =
          action.payload.category;
      }
    },
    addNewItem(
      state,
      action: { type: string; payload: { id: string; category: string } }
    ) {
      const index: number = state.questions.findIndex(
        (element) => element.id === action.payload.id
      );
      if (index !== -1) {
        state.questions[index].items.push({
          id: uid(),
          name: "item",
          category: action.payload.category,
        });
      }
    },
    questionChange(
      state,
      action: { type: string; payload: { id: string; question: string } }
    ) {
      const index: number = state.questions.findIndex(
        (element) => element.id === action.payload.id
      );
      if (index !== -1) {
        state.questions[index].question = action.payload.question;
      }
    },
    questionState(
      state,
      action: { type: string; payload: { id: string; state: string } }
    ) {
      const index: number = state.questions.findIndex(
        (element) => element.id === action.payload.id
      );
      if (index !== -1) {
        state.questions[index].type = action.payload.state;
      }
    },
  },
});

export const questionsActions = questionSlice.actions;
export default questionSlice.reducer;
