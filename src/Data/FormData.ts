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
    {
      id: "3e6423c1036",
      type: "Cloze",
      question: "",
      categories: [
        {
          id: "e6423c10369",
          name: "category",
        },
      ],
      items: [],
      wordsArray: [
        {
          word: "How",
          isShow: true,
        },
        {
          word: "are",
          isShow: false,
        },
        {
          word: "you",
          isShow: false,
        },
        {
          word: "?",
          isShow: true,
        },
      ],
      options: [
        {
          isExist: true,
          name: "are",
          id: "6423c103694",
        },
        {
          name: "Hello ",
          isExist: false,
          id: "23c1036948b",
        },
        {
          isExist: true,
          name: "you",
          id: "423c1036948",
        },
      ],
      comprehension: "",
      comprehnesionQuestions: [],
    },
  ],
};
