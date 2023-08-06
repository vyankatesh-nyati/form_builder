import { useState } from "react";
import QuestionType from "../enums/QuestionType";
import Select from "react-select";
import CategoryTypeQuestion from "./CategoryQuestion/CategoryTypeQuestion";
import QuestionModel from "../interfaces/QuestionModel";
import { useDispatch } from "react-redux";
import { questionsActions } from "../store/questionSlice";

const QuestionEdit = ({ question }: { question: QuestionModel }) => {
  const [questionState, setQuestionState] = useState<string>(question.type);
  const dispatch = useDispatch();
  const questionType: Array<{ value: string; label: string }> = [
    {
      value: QuestionType.Categorize,
      label: QuestionType.Categorize,
    },
    {
      value: QuestionType.Cloze,
      label: QuestionType.Cloze,
    },
    {
      value: QuestionType.Comprehensive,
      label: QuestionType.Comprehensive,
    },
  ];

  return (
    <div className="flex justify-center w-full p-4">
      <div className="w-2/3 bg-white rounded-xl pb-4">
        <div className="p-4">
          <div className="flex justify-between">
            <p className="mb-4">Question : </p>
            <Select
              options={questionType}
              className="w-2/6"
              placeholder={question.type}
              onChange={(newValue) => {
                if (newValue != null) {
                  setQuestionState(newValue.value);
                  dispatch(
                    questionsActions.questionState({
                      id: question.id,
                      state: newValue.value,
                    })
                  );
                }
              }}
            />
          </div>
          {questionState === QuestionType.Categorize && (
            <CategoryTypeQuestion question={question} />
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionEdit;
