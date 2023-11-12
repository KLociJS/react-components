import { useState } from "react";
import validateForm from "../utils/validateForm";

// Get the input value based on its input type
const getInputValueByType = (target, values) => {
  switch (target.type) {
    case "checkbox":
      return target.checked;
    case "select-multiple":
      return Array.from(target.options)
        .filter((option) => option.selected)
        .map((option) => option.value);
    case "radio":
      return target.checked ? target.value : values[target.name];

    default:
      return target.value;
  }
};

function useForm(initialValues, onSubmit, formValidations) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name } = event.target;

    let updatedValue = getInputValueByType(event.target, values);

    setValues({ ...values, [name]: updatedValue });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = (event) => {
    console.log("values: ", values);
    event.preventDefault();
    if (formValidations) {
      const validationErrors = validateForm(values, formValidations);
      setErrors(validationErrors);
      if (Object.keys(validationErrors).length > 0) return;
    }
    onSubmit(values);
  };

  return { values, errors, handleChange, handleSubmit };
}

export default useForm;
