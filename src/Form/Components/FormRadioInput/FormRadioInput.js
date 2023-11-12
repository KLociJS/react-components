import { useFormContext } from "../../FormContext/FormContext";
import DisplayError from "../DisplayError/DisplayError";

const FormRadioInput = ({ label, name, options, isDisabled = false }) => {
  const { values, handleChange, errors } = useFormContext();

  return (
    <div className={`input-group ${errors?.[name] ? "error" : ""}`}>
      <label className={`static-label ${isDisabled ? "disabled" : ""}`}>
        {label}
      </label>
      {options.map((option) => (
        <div key={option.value} className='radio-option'>
          <input
            type='radio'
            id={`${name}-${option.value}`}
            name={name}
            value={option.value}
            checked={values[name] === option.value}
            onChange={handleChange}
            disabled={isDisabled}
          />
          <label htmlFor={`${name}-${option.value}`}>{option.label}</label>
        </div>
      ))}
      <DisplayError errors={errors[name]} />
    </div>
  );
};

export default FormRadioInput;
