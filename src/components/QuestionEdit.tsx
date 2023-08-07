import { useState } from "react";
import QuestionType from "../enums/QuestionType";
import Select from "react-select";
import CategoryTypeQuestion from "./CategoryQuestion/CategoryTypeQuestion";
import QuestionModel from "../interfaces/QuestionModel";
import { useDispatch } from "react-redux";
import { questionsActions } from "../store/questionSlice";
import ClozeTypeQuestion from "./ClozeQuestion/ClozeTypeQuestion";
import ComprehensiveQuestionType from "./ComprehensiveQuestion/ComprehensiveQuestionType";
import { MdDelete } from "react-icons/md";

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
      <div className="w-2/3 bg-white rounded-xl pb-4 relative">
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
          {questionState === QuestionType.Cloze && (
            <ClozeTypeQuestion question={question} />
          )}
          {questionState === QuestionType.Comprehensive && (
            <ComprehensiveQuestionType question={question} />
          )}
        </div>
        <div
          className="absolute right-4 bottom-4 text-xl text-red-500 p-1 rounded-[50%] cursor-pointer"
          onClick={() => {
            dispatch(questionsActions.removeQuestion({ id: question.id }));
          }}
        >
          <MdDelete />
        </div>
      </div>
    </div>
  );
};

export default QuestionEdit;
