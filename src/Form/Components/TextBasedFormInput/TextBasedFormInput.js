import { useState } from "react";
import { useFormContext } from "../../FormContext/FormContext";
import validateInputType from "../../utils/ValidateInputType";
import DisplayError from "../DisplayError/DisplayError";
import "./Input.css";

const TextBasedFormInput = ({
  label,
  name,
  type = "text",
  isDisabled = false,
}) => {
  const allowedTypes = ["text", "email", "number", "url", "tel", "search"];
  validateInputType(type, allowedTypes);

  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const { values, errors, handleChange } = useFormContext();

  const isActive = isFocused || values[name] ? "active" : "";
  const disabled = isDisabled ? "disabled" : "";

  return (
    <div className={`input-group ${errors?.[name] ? "error" : ""}`}>
      <label className={`animated-label ${isActive} ${disabled}`}>
        {label}
      </label>
      <input
        disabled={isDisabled}
        name={name}
        type={type}
        value={values[name]}
        className='input-control'
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        autoComplete='off'
      />
      <DisplayError errors={errors[name]} />
    </div>
  );
};

export default TextBasedFormInput;
