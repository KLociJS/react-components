import React from "react";
import "./Spinner.css";

const Spinner = ({ show }) => {
  const display = show ? "show" : "";
  return <div className={`spinner ${display}`}></div>;
};

export default Spinner;
