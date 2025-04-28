import React from "react";
import error404 from "../assets/404.gif";
import BackToHomeBtn from "../components/BackToHome";

const ErrorPage = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-6 min-h-screen">
      <BackToHomeBtn />
      <img src={error404} alt="image" />
    </div>
  );
};

export default ErrorPage;
