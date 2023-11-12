import { useFormContext } from "../../FormContext/FormContext";

const FormCheckBox = ({ label, name, isDisabled = false }) => {
  const { errors, values, handleChange } = useFormContext();

  return (
    <div className={`input-group ${errors?.[name] ? "error" : ""}`}>
      <label className='check-box-label'>
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
