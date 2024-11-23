import React from "react";

const BackwardArrow = () => {
  return (
    <svg
      className="w-4 h-4 rtl:rotate-180 text-gray-800 dark:text-white"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 14 10"
      style={{ height: "10px" }}
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M13 5H1m0 0 4 4M1 5l4-4"
      />
    </svg>
  );
};
export default BackwardArrow;
