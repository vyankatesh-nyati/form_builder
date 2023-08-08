import QuestionType from "../enums/QuestionType";
import QuestionModel from "../interfaces/QuestionModel";

interface FormModel {
  title: string;
  questions: Array<QuestionModel>;
}

export const formData: FormModel = {
  title: "Testing FOrm",
  questions: [
    {
      id: "1",
      type: QuestionType.Categorize,
      categories: [
        {
          id: "c1",
          name: "Category 1",
        },
        {
          id: "c2",
          name: "Category 2",
        },
      ],
      items: [
        {
          id: "i1",
          category: "Category 1",
          name: "item 1",
        },
        {
          id: "i2",
          category: "Category 2",
          name: "item 2",
        },
        {
          id: "i3",
          category: "Category 1",
          name: "item 3",
        },
      ],
      comprehension: "",
      comprehnesionQuestions: [],
      options: [],
      question: "",
      wordsArray: [],
    },
  ],
};
