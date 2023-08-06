import React from "react";
import TitleComponent from "../components/TitleComponent";
import Navbar from "../components/common/Navbar";
import QuestionEdit from "../components/QuestionEdit";
import { GrAddCircle } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { questionsActions } from "../store/questionSlice";
import QuestionModel from "../interfaces/QuestionModel";

const EditPage = () => {
  const dispatch = useDispatch();
  const questions: Array<QuestionModel> = useSelector(
    (state: any) => state.question.questions
  );

  const addNewQuestion = () => {
    dispatch(questionsActions.addNewQuestion());
  };

  return (
    <div className="bg-[#DAFFFB] pb-4">
      <Navbar />
      <TitleComponent />
      {questions.map((question) => {
        return <QuestionEdit question={question} key={question.id} />;
      })}
      <div className="flex items-center justify-center text-2xl">
        <GrAddCircle
          className="text-[#001C30] cursor-pointer"
          onClick={addNewQuestion}
        />
      </div>
    </div>
  );
};

export default EditPage;
