import React from "react";
import QuestionModel from "../../interfaces/QuestionModel";

interface props {
    question: QuestionModel;
    index : number;
  }
  

const FormCloze: React.FC<props> = ({ question }) => {
  return <div>FormCloze</div>;
};

export default FormCloze;
