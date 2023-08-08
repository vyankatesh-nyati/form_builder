import React from "react";
import QuestionModel from "../../interfaces/QuestionModel";

interface props {
  question: QuestionModel;
  index: number;
}

const FormComprehensive: React.FC<props> = ({ question }) => {
  return <div>FormComprehensive</div>;
};

export default FormComprehensive;
