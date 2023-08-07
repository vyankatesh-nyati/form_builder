import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { questionsActions } from "../../store/questionSlice";
import QuestionModel from "../../interfaces/QuestionModel";
import { Radio } from "antd";

const ComprehensiveQuestionType = ({
  question,
}: {
  question: QuestionModel;
}) => {
  const comprehensionRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  const comprehensionChangeHandler = () => {
    if (comprehensionRef.current) {
      const com = comprehensionRef.current.innerText;
      dispatch(
        questionsActions.comprehensionSetComprehension({
          id: question.id,
          sentence: com,
        })
      );
    }
  };

  const addNewComprehensionQuestion = () => {
    dispatch(
      questionsActions.comprehensionAddNewQuestion({
        id: question.id,
      })
    );
  };

  const questionChange = (q: string, index: number) => {
    dispatch(
      questionsActions.comprehensionChangeQuestion({
        id: question.id,
        index: index,
        question: q,
      })
    );
  };

  const onSaveAnswer = (answer: string, index: number) => {
    dispatch(
      questionsActions.comprehensionOnSaveAnswer({
        id: question.id,
        index: index,
        answer: answer,
      })
    );
  };

  const onChangeOption = (
    option: string,
    questionIndex: number,
    optionIndex: number
  ) => {
    dispatch(
      questionsActions.comprehensionOnChangeOption({
        id: question.id,
        option: option,
        optionIndex: optionIndex,
        questionIndex: questionIndex,
      })
    );
  };

  return (
    <>
      <div>
        <p className="mt-4">Enter a comprehension : </p>
        <p
          role="textbox"
          contentEditable
          className="w-3/4 mt-2 p-2 focus:outline-none border-2 border-x-gray-400 focus:border-[#176B87] rounded-md"
          ref={comprehensionRef}
          onInput={comprehensionChangeHandler}
        ></p>
      </div>
      <p className="mt-4">MCQ questions : </p>
      <div className="my-4">
        {question.comprehnesionQuestions.map((question, index) => {
          return (
            <div className="border-b-2 border-t-2 p-4">
              <input
                placeholder="Enter your question ..."
                type="text"
                className="w-3/4 mt-2 p-1 focus:outline-none border-2 border-x-gray-400 focus:border-[#176B87] rounded-md"
                onChange={(event) => {
                  questionChange(event.target.value, index);
                }}
                defaultValue={question.question}
              />
              <p className="mt-4">Options : </p>
              <Radio.Group
                className="flex flex-col m-4 my-2 gap-2"
                value={question.answer}
                onChange={(event) => {
                  onSaveAnswer(event.target.value, index);
                }}
              >
                {question.options.map((op, i) => {
                  return (
                    <Radio value={op}>
                      <input
                        type="text"
                        className="focus:outline-none border-b-2 border-x-gray-400 text-base pb-1 w-full focus:border-[#176B87]"
                        placeholder="Enter option..."
                        defaultValue={op}
                        onChange={(e) => {
                          onChangeOption(e.target.value, index, i);
                        }}
                      />
                    </Radio>
                  );
                })}
              </Radio.Group>
            </div>
          );
        })}
      </div>
      <button
        className="mt-4 px-4 py-1 bg-[#176B87] text-white rounded-md"
        onClick={addNewComprehensionQuestion}
      >
        Add MCQ
      </button>
    </>
  );
};

export default ComprehensiveQuestionType;
