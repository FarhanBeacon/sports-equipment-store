import React from "react";
import { DotLoader } from "react-spinners";

const LoadingPage = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <DotLoader size={100} />
    </div>
  );
};

export default LoadingPage;
