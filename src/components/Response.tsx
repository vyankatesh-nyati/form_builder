import React from "react";
import { useNavigate } from "react-router-dom";

interface props {
  link: string;
}

const Response: React.FC<props> = ({ link }) => {
  const navigate = useNavigate();
  const location = window.location.origin;

  const onCLickHandler = () => {
    navigate(link, {
      replace: true,
    });
  };

  return (
    <div className="absolute top-0 left-0 z-auto">
      <div className="h-[90vh] w-[100vw] bg-[rgb(111,111,111,0.9)] blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-300 px-8 py-4 rounded-md flex gap-4 flex-col">
        <p>Form Created</p>
        <p>
          {location}
          {link}
        </p>
        <button
          className="text-base bg-[#176B87] p-1 px-4 rounded-md text-white mr-2 self-end"
          onClick={onCLickHandler}
        >
          Open
        </button>
      </div>
    </div>
  );
};

export default Response;
