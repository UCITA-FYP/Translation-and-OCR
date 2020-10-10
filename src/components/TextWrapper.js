import React from "react";

const TextWrapper = ({ text }) => {
  return <textarea id="text-to-translate" className="text-wrapper">{text}</textarea>;
};

export default TextWrapper;
