import React from "react";
import QuestionModel from "../../interfaces/QuestionModel";
import { Radio } from "antd";
import { useDispatch } from "react-redux";
import { formResponseActions } from "../../store/formResponseSlice";

interface props {
  question: QuestionModel;
  index: number;
}

const FormComprehensive: React.FC<props> = ({ question, index }) => {
  const dispatch = useDispatch();

  const onValueSelect = (value: string, subQuestionId: string) => {
    dispatch(
      formResponseActions.comprehensiveSaveValue({
        id: question.id,
        questionId: subQuestionId,
        value: value,
      })
    );
  };

  return (
    <div className="bg-white m-8 rounded-md p-4">
      <p className="">Question {index + 1} :</p>
      <p className="py-4 px-2 text-justify">{question.comprehension}</p>
      <div>
        {question.comprehnesionQuestions.map((ques, i) => {
          return (
            <div key={ques.id} className="py-2">
              <div className="flex">
                <p>
                  Question {index + 1}.{i + 1} :
                </p>
                <p className="pl-2">{ques.question}</p>
              </div>
              <Radio.Group
                className="flex flex-col px-6 py-2 gap-2"
                onChange={(e) => {
                  onValueSelect(e.target.value, ques.id);
                }}
              >
                {ques.options.map((op) => {
                  return (
                    <Radio value={op} key={op}>
                      {op}
                    </Radio>
                  );
                })}
              </Radio.Group>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FormComprehensive;
