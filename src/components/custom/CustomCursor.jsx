import React, { useState } from "react";

const CustomCursor = ({ cursorPos, text }) => {
  return (
    <div
      className="absolute hidden md:flex w-20 h-20 p-2 pt-5 bg-[#5344fbcf] rounded-full 
  pointer-events-none z-10 text-white text-center leading-4 text-sm items-center justify-center font-bold"
      style={{
        top: `${cursorPos.y}px`,
        left: `${cursorPos.x}px`,
        transform: "translate(-50%, -50%)",
      }}
    >
      {text}
      <br />➝
    </div>
  );
};

export default CustomCursor;
