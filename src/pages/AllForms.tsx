import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../config/server";

const AllForms: React.FC = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formReponses, setFormResponses] = useState([]);

  const fetchFormResponseData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${serverUrl}/response/fetch-reponses`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.error) {
        throw Error(data.error);
      }
      setFormResponses(data.data);
    } catch (error: any) {
      console.log(error);
      if (error.message) {
        setError(error.message.toString());
      }
    }
    setIsLoading(false);
  }, []);

  console.log(formReponses);
  useEffect(() => {
    fetchFormResponseData();
  }, [fetchFormResponseData]);

  return (
    <div className="flex items-center justify-center gap-4 py-4">
      {formReponses.map((res: any) => {
        return (
          <div key={res._id} className="bg-white w-2/3 p-4">
            <p>Form Id: {res.formId}</p>
            {res.responses.map((fr: any) => {
              return (
                <div key={fr._id}>
                  <p>{fr}</p>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default AllForms;
