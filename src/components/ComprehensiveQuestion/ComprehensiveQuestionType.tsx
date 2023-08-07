import React, { useRef, useState } from "react";

const ComprehensiveQuestionType = () => {
  const [comprehension, setComprehension] = useState("");
  const comprehensionRef = useRef<HTMLInputElement>(null);

  const comprehensionChangeHandler = () => {
    if (comprehensionRef.current) {
      const com = comprehensionRef.current.innerText;
      setComprehension(com);
    }
  };

  return (
    <>
      <div>
        <p className="mt-4">Enter a comprehension : </p>
        <p
          role="textbox"
          contentEditable
          className="w-3/4 mt-2 p-2 focus:outline-none border-2 border-x-gray-400 focus:border-[#176B87] rounded-md"
          ref={comprehensionRef}
          onInput={comprehensionChangeHandler}
        ></p>
      </div>
      <button className="mt-4 px-4 py-1 bg-[#176B87] text-white rounded-md">
        Add MCQ
      </button>
    </>
  );
};

export default ComprehensiveQuestionType;
