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
        wordsArray: [],
        options: [],
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
        state.questions[index].categories?.push({
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

    //  Cloze questions functions
    clozeSetWordsArray(
      state,
      action: {
        type: string;
        payload: {
          id: string;
          wordsArray: Array<{ word: string; isShow: boolean }>;
        };
      }
    ) {
      const index: number = state.questions.findIndex(
        (element) => element.id === action.payload.id
      );
      if (index !== -1) {
        state.questions[index].wordsArray = action.payload.wordsArray;
      }
    },
    clozeSetOptionsArray(
      state,
      action: {
        type: string;
        payload: {
          id: string;
          optionsArray: Array<{ isExist: boolean; name: string; id: string }>;
        };
      }
    ) {
      const index: number = state.questions.findIndex(
        (element) => element.id === action.payload.id
      );
      if (index !== -1) {
        state.questions[index].options = action.payload.optionsArray;
      }
    },
    clozeAddNewOption(
      state,
      action: {
        type: string;
        payload: {
          id: string;
        };
      }
    ) {
      const index: number = state.questions.findIndex(
        (element) => element.id === action.payload.id
      );
      if (index !== -1) {
        state.questions[index].options.push({
          name: "option",
          isExist: false,
          id: uid(),
        });
      }
    },
    clozeOptionNameChange(
      state,
      action: {
        type: string;
        payload: {
          id: string;
          index: number;
          optionName: string;
        };
      }
    ) {
      const i: number = state.questions.findIndex(
        (element) => element.id === action.payload.id
      );
      if (i !== -1) {
        state.questions[i].options[action.payload.index].name =
          action.payload.optionName;
      }
    },
  },
});

export const questionsActions = questionSlice.actions;
export default questionSlice.reducer;
