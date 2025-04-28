import React from "react";
import { Link } from "react-router";
import { FaArrowLeft } from "react-icons/fa";

const BackToHomeBtn = () => {
  return (
    <Link
      to={"/"}
      className="flex items-center gap-2 text-2xl text-[#374151] font-rancho font-semibold"
    >
      <FaArrowLeft />
      Back to home
    </Link>
  );
};

export default BackToHomeBtn;