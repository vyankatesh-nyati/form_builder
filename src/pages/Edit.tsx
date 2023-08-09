import React, { useState } from "react";
import TitleComponent from "../components/TitleComponent";
import QuestionEdit from "../components/QuestionEdit";
import { GrAddCircle } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { questionsActions } from "../store/questionSlice";
import QuestionModel from "../interfaces/QuestionModel";
import { serverUrl } from "../config/server";
import Loader from "../components/common/Loader";
import Response from "../components/Response";

const EditPage = () => {
  const dispatch = useDispatch();
  const questions: Array<QuestionModel> = useSelector(
    (state: any) => state.question.questions
  );
  const title = useSelector((state: any) => state.title.title);
  const [isLoading, setIsLoading] = useState(false);
  const [responseLink, setResponseLink] = useState("");
  // console.log(location);

  const addNewQuestion = () => {
    dispatch(questionsActions.addNewQuestion());
  };

  const onFormCreateHandler = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${serverUrl}/form/create-new-form`, {
        method: "POST",
        body: JSON.stringify({
          title: title,
          questions: questions,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.error) {
        throw Error(data.error);
      }

      if (data.id) {
        setResponseLink(`/form/${data.id}`);
        // setResponse(true);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <div className="pb-4 relative">
      {responseLink !== "" ? <Response link={responseLink} /> : null}
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <TitleComponent />
          {questions.map((question) => {
            return <QuestionEdit question={question} key={question.id} />;
          })}
          <div className="flex justify-center">
            <div className="flex items-center gap-4 justify-end text-2xl w-2/3">
              <GrAddCircle
                className="text-[#001C30] cursor-pointer"
                onClick={addNewQuestion}
              />
              <button
                className="text-base bg-[#176B87] p-1 px-4 rounded-md text-white mr-2"
                onClick={onFormCreateHandler}
              >
                Create Form
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default EditPage;
