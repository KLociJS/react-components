import { useFormContext } from "../../FormContext/FormContext";
import DisplayError from "../DisplayError/DisplayError";

const FormRadioInput = ({ label, name, options, isDisabled = false }) => {
  const { values, handleChange, errors } = useFormContext();

  const errorClass = errors?.[name] ? "error" : "";
  const disabledClass = isDisabled ? "disabled" : "";

  return (
    <>
      <div
        className={`input-group radio-container ${errorClass} ${disabledClass}`}
      >
        <label className={`radio-input-label ${disabledClass}`}>{label}</label>
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
            <label
              htmlFor={`${name}-${option.value}`}
              className={`radio-option-label ${disabledClass}`}
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
      <DisplayError errors={errors[name]} />
    </>
  );
};

export default FormRadioInput;
