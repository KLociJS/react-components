export const required = (name) => (value) =>
  value ? "" : `${name} field is required`;

export const isEmail = (value) =>
  /\S+@\S+\.\S+/.test(value) ? "" : "Email is invalid";

export const minLength = (length) => (value) =>
  value.length >= length ? "" : `Must be at least ${length} characters long`;

export const maxLength = (length) => (value) =>
  value.length <= length ? "" : `Must be maximum ${length} characters long`;

export const isChecked = (value) => (value ? "" : "This field must be checked");

export const allowedRange =
  (min = 0, max = 0) =>
  (value) =>
    value >= min && value <= max
      ? ""
      : `Value has to be between ${min} and ${max}`;

export const regexTest = (regex, errorMsg) => (value) => {
  return regex.test(value) ? "" : errorMsg;
};
