import { useFormContext } from "../../FormContext/FormContext";

const FormCheckBox = ({ label, name, isDisabled = false }) => {
  const { errors, values, handleChange } = useFormContext();

  const errorClass = errors?.[name] ? "error" : "";
  const disabledClass = isDisabled ? "disabled" : "";

  return (
    <div className={`input-group ${errorClass}`}>
      <label className={`check-box-label ${disabledClass}`}>
        <input
          className='check-box-input'
          type='checkbox'
          name={name}
          checked={values[name]}
          onChange={handleChange}
          disabled={isDisabled}
        />
        {label}
      </label>
    </div>
  );
};

export default FormCheckBox;
