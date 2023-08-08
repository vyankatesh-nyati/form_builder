import React from "react";
import { useParams } from "react-router";

const Form: React.FC = () => {
  const params = useParams();

  return <div>Form {params.id}</div>;
};

export default Form;
