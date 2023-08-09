import React from "react";

interface props {
  error: string;
}

const Error: React.FC<props> = ({ error }) => {
  return (
    <div className="bg-red-600 px-2 text-white w-screen">
      <p className="m-2">{error}</p>
    </div>
  );
};

export default Error;
