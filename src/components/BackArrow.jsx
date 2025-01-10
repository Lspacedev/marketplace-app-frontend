import React from "react";
import { FaArrowLeft } from "react-icons/fa6";

function BackArrow({ handleNavigate }) {
  return (
    <div className="back" onClick={handleNavigate}>
      <FaArrowLeft />
    </div>
  );
}

export default BackArrow;
