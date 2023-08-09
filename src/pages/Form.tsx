import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import QuestionType from "../enums/QuestionType";
import FormCategory from "../components/CategoryQuestion/FormCategory";
import FormCloze from "../components/ClozeQuestion/FormCloze";
import FormComprehensive from "../components/ComprehensiveQuestion/FormComprehensive";
import { serverUrl } from "../config/server";
import Loader from "../components/common/Loader";
import QuestionModel from "../interfaces/QuestionModel";
import Error from "../components/common/Error";
import { useDispatch } from "react-redux";
import { formResponseActions } from "../store/formResponseSlice";
import { useSelector } from "react-redux";

const Form: React.FC = () => {
  const params = useParams();
  const formId = params.id;
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<{
    _id: string;
    title: string;
    questions: Array<QuestionModel>;
  }>();
  const dispatch = useDispatch();
  const answers = useSelector((state: any) => state.formResponse);
  // console.log(answers);
  const navigate = useNavigate();

  const fetchFormData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${serverUrl}/form/${formId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.error) {
        throw Error(data.error);
      }
      setFormData(data);
    } catch (error: any) {
      console.log(error);
      if (error.message) {
        setError(error.message.toString());
      }
    }
    setIsLoading(false);
  }, [formId]);

  useEffect(() => {
    fetchFormData();
    if (formId) {
      dispatch(
        formResponseActions.setFormId({
          id: formId,
        })
      );
    }
  }, [fetchFormData, dispatch, formId]);

  const onFormSubmitHandler = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${serverUrl}/response/add-response`, {
        method: "POST",
        body: JSON.stringify(answers),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.error) {
        throw Error(data.error);
      }
      navigate("/submit", {
        replace: true,
      });
    } catch (error: any) {
      console.log(error);
      setError(error.message.toString());
    }
    setIsLoading(false);
  };

  if (formData == null) {
    return <Loader />;
  }
  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-center mb-4">
      {error !== "" && <Error error={error} />}
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-2/3 bg-[#DAFFFB] p-4 rounded-lg m-8">
          <h1 className="text-center text-2xl font-semibold">
            {formData.title}
          </h1>
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
      )}
      {/* <div className="w-2/3 flex justify-center"> */}
      <button
        className="text-base bg-[#176B87] p-1 px-4 rounded-md text-white mr-2 self-center"
        onClick={onFormSubmitHandler}
      >
        Submit
      </button>
      {/* </div> */}
    </div>
  );
};

export default Form;
