import React from "react";
import { useFormContext } from "../FormContext/FormContext";
import DisplayError from "./DisplayError/DisplayError";

export default function FormDateInput({ label, name, isDisabled = false }) {
  const { values, errors, handleChange } = useFormContext();
  const hasError = errors?.[name] ? "error" : "";
  const disabled = isDisabled ? "disabled" : "";

  return (
    <div className={`input-group ${hasError}`}>
      <label className={`static-label ${disabled}`}>{label}</label>
      <input
        type='date'
        name={name}
        value={values[name]}
        className='input-control'
        onChange={handleChange}
        disabled={isDisabled}
      />
      <DisplayError errors={errors[name]} />
    </div>
  );
}
