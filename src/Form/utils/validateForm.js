const validateForm = (values, validations) => {
  let errors = {};

  for (const field in validations) {
    let value = values[field];
    let validationsForField = validations[field];

    for (let validation of validationsForField) {
      const error = validation(value);
      if (error) {
        errors[field] = errors?.[field] ? [...errors[field], error] : [error];
        errors = { ...errors };
      }
    }
  }
  return errors;
};

export default validateForm;
