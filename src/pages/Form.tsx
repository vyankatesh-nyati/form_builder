import React from "react";
import { useParams } from "react-router";
import { formData } from "../Data/FormData";
import QuestionType from "../enums/QuestionType";
import FormCategory from "../components/CategoryQuestion/FormCategory";
import FormCloze from "../components/ClozeQuestion/FormCloze";
import FormComprehensive from "../components/ComprehensiveQuestion/FormComprehensive";

const Form: React.FC = () => {
  // const params = useParams();

  return (
    <div className="bg-white min-h-screen flex justify-center items-start">
      <div className="w-2/3 bg-[#DAFFFB] p-4 rounded-lg m-8">
        <h1 className="text-center text-2xl font-semibold">{formData.title}</h1>
        <div>
          {formData.questions.map((question, index) => {
            if (question.type === QuestionType.Categorize)
              return (
                <FormCategory
                  question={question}
                  index={index}
                  key={question.id}
                />
              );

            if (question.type === QuestionType.Cloze)
              return (
                <FormCloze
                  question={question}
                  index={index}
                  key={question.id}
                />
              );

            return (
              <FormComprehensive
                question={question}
                index={index}
                key={question.id}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Form;
