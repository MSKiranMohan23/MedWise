import React from "react";

const ForwardArrow = () => {
  return (
    <svg
      className="rtl:rotate-180 ms-2 !p-1"
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
        d="M1 5h12m0 0L9 1m4 4L9 9"
      />
    </svg>
  );
};
export default ForwardArrow;
