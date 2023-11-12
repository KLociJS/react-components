import { useFormContext } from "../../FormContext/FormContext";
import DisplayError from "../DisplayError/DisplayError";

export const FormSelectInput = ({
  label,
  name,
  options,
  multiple = false,
  isDisabled = false,
}) => {
  const { values, handleChange, errors } = useFormContext();
  const disabled = isDisabled ? "disabled" : "";

  return (
    <div className={`input-group ${errors?.[name] ? "error" : ""}`}>
      <label className={`static-label ${disabled}`}>{label}</label>
      <select
        name={name}
        value={values[name]}
        onChange={handleChange}
        disabled={isDisabled}
        className='input-control select'
        multiple={multiple}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <DisplayError errors={errors[name]} />
    </div>
  );
};
