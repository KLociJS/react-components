import React, { useState } from "react";
import { useFormContext } from "../../FormContext/FormContext";
import DisplayError from "../DisplayError/DisplayError";
import "../Input.css";
import CharacterCounter from "./CharacterCounter";
import "./FormTextArea.css";

export default function FormTextArea({
  label,
  name,
  isDisabled = false,
  min,
  max,
}) {
  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const { values, errors, handleChange } = useFormContext();

  const activeClass = isFocused || values[name] ? "active" : "";
  const disabledClass = isDisabled ? "disabled" : "";
  const errorClass = errors?.[name] ? "error" : "";

  return (
    <div className={`input-group text-area-group ${errorClass}`}>
      <label className={`animated-label ${activeClass} ${disabledClass}`}>
        {label}
      </label>
      <textarea
        disabled={isDisabled}
        name={name}
        value={values[name]}
        className='input-control text-area'
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        autoComplete='off'
      />
      <CharacterCounter
        currentValue={values[name].length}
        min={min}
        max={max}
      />
      <DisplayError errors={errors[name]} />
    </div>
  );
}
