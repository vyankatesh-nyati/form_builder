import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center absolute top-0 left-0 w-screen">
      <div className="h-[90vh] bg-[rgb(111,111,111,0.9)] blur-3xl"></div>
      <span className="loader"></span>
    </div>
  );
};

export default Loader;
