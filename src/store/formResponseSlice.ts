import { createSlice } from "@reduxjs/toolkit";

interface formResponse {
  formId: string;
  answers: Array<answerModel>;
}

interface answerModel {
  questionId: string;
  solution: Array<any>;
}

const initialState: formResponse = {
  formId: "",
  answers: [],
};

const formResponseSlice = createSlice({
  name: "form-response",
  initialState: initialState,
  reducers: {
    setFormId(
      state,
      action: {
        type: string;
        payload: {
          id: string;
        };
      }
    ) {
      state.formId = action.payload.id;
    },
    categorySetAnswer(
      state,
      action: {
        type: string;
        payload: {
          id: string;
          newAnswer: any;
        };
      }
    ) {
      const index: number = state.answers.findIndex(
        (element) => element.questionId === action.payload.id
      );
      if (index !== -1) {
        state.answers[index].solution = action.payload.newAnswer;
      } else {
        state.answers.push({
          questionId: action.payload.id,
          solution: action.payload.newAnswer,
        });
      }
    },
    categoryAddCategoryToAnswer(
      state,
      action: {
        type: string;
        payload: {
          id: string;
          category: string;
          categoryId: string;
        };
      }
    ) {
      const index: number = state.answers.findIndex(
        (element) => element.questionId === action.payload.id
      );
      if (index !== -1) {
        const isExists = state.answers[index].solution.findIndex(
          (s) => s.categoryId === action.payload.categoryId
        );
        if (isExists === -1) {
          state.answers[index].solution.push({
            categoryId: action.payload.categoryId,
            categoryName: action.payload.category,
            categoryItems: [],
          });
        }
      } else {
        state.answers.push({
          questionId: action.payload.id,
          solution: [
            {
              categoryId: action.payload.categoryId,
              categoryName: action.payload.category,
              categoryItems: [],
            },
          ],
        });
      }
    },
    categoryAddItemToCategory(
      state,
      action: {
        type: string;
        payload: {
          id: string;
          item: {
            id: string;
            category: string;
            name: string;
          };
          categoryId: string;
        };
      }
    ) {
      const index: number = state.answers.findIndex(
        (element) => element.questionId === action.payload.id
      );
      if (index !== -1) {
        const i = state.answers[index].solution.findIndex(
          (s) => s.categoryId === action.payload.categoryId
        );
        if (i !== -1) {
          state.answers[index].solution[i].categoryItems.push(
            action.payload.item
          );
        }
      }
    },
    clozeAddAnswer(
      state,
      action: {
        type: string;
        payload: {
          id: string;
          option: string;
        };
      }
    ) {
      const index: number = state.answers.findIndex(
        (element) => element.questionId === action.payload.id
      );
      if (index !== -1) {
        state.answers[index].solution.push(action.payload.option);
      } else {
        state.answers.push({
          questionId: action.payload.id,
          solution: [action.payload.option],
        });
      }
    },
    comprehensiveSaveValue(
      state,
      action: {
        type: string;
        payload: {
          id: string;
          value: string;
          questionId: string;
        };
      }
    ) {
      const index: number = state.answers.findIndex(
        (element) => element.questionId === action.payload.id
      );
      if (index !== -1) {
        const i = state.answers[index].solution.findIndex(
          (ans) => ans.subQuestionId === action.payload.questionId
        );
        if (i !== -1) {
          state.answers[index].solution[i].answer = action.payload.value;
        } else {
          state.answers[index].solution.push({
            subQuestionId: action.payload.questionId,
            answer: action.payload.value,
          });
        }
      } else {
        state.answers.push({
          questionId: action.payload.id,
          solution: [
            {
              subQuestionId: action.payload.questionId,
              answer: action.payload.value,
            },
          ],
        });
      }
    },
  },
});

export const formResponseActions = formResponseSlice.actions;
export default formResponseSlice.reducer;
