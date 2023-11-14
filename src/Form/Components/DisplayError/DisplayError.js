import React from "react";
import "./DisplayError.css";

const DisplayError = ({ errors, alignment = "left" }) => {
  if (!errors) return null;

  return errors.map((error) => (
    <p key={error} className={`error-msg ${alignment}`}>
      {error}
    </p>
  ));
};

export default DisplayError;
