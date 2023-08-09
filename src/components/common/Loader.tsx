import React from "react";

const Loader = () => {
  return (
    <div className="min-h-screen flex justify-center items-center absolute top-0 left-0 w-screen">
      <div className="h-[90vh] w-[100vw] bg-[rgb(111,111,111,0.9)] blur-3xl"></div>
      <span className="loader"></span>
    </div>
  );
};

export default Loader;
