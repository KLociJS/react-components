import "./Assets/Form.css";
import AutoCompleteFormInput from "./Components/AutoCompleteFormInput/AutoCompleteFormInput";
import DisplayError from "./Components/DisplayError/DisplayError";
import SubmitButton from "./Components/FormButton/SubmitButton";
import FormCheckBox from "./Components/FormCheckBox/FormCheckBox";
import FormDateInput from "./Components/FormDateInput";
import FormRadioInput from "./Components/FormRadioInput/FormRadioInput";
import { FormSelectInput } from "./Components/FormSelect/FormSelectInput";
import FormTextArea from "./Components/FormTextArea/FormTextArea";
import RetryIndicator from "./Components/RetryIndicator/RetryIndicator";
import TextBasedFormInput from "./Components/TextBasedFormInput/TextBasedFormInput";
import { FormContextProvider } from "./FormContext/FormContext";
import useForm from "./hooks/useForm";

export default function Form({
  formFields,
  onSubmit,
  isDisabled,
  isRetrying,
  fetchError,
}) {
  const initialValues = formFields.reduce(
    (acc, field) => ({
      ...acc,
      [field.name]: field.initialValue,
    }),
    {}
  );

  const formValidations = formFields.reduce(
    (acc, field) => ({
      ...acc,
      [field.name]: field.validations,
    }),
    {}
  );

  const { values, errors, handleChange, handleSubmit } = useForm(
    initialValues,
    onSubmit,
    formValidations
  );

  return (
    <form className='form-container' noValidate onSubmit={handleSubmit}>
      <FormContextProvider
        value={{ values, errors, handleChange, handleSubmit }}
      >
        {formFields.map((field) => renderInputComponent(field))}
        <SubmitButton show={isDisabled} />
        <RetryIndicator show={isRetrying} />
        <DisplayError errors={fetchError} alignment='center' />
      </FormContextProvider>
    </form>
  );
}

const allowedFormInputType = [
  "autocompleteText",
  "text",
  "email",
  "number",
  "url",
  "tel",
  "search",
  "select",
  "checkbox",
  "radio",
  "textarea",
  "date",
];

const renderInputComponent = (field) => {
  switch (field.type) {
    case "text":
    case "email":
    case "number":
    case "url":
    case "tel":
    case "search":
      return <TextBasedFormInput {...field} key={field.name} />;
    case "autocompleteText":
      return <AutoCompleteFormInput {...field} type='text' key={field.name} />;
    case "select":
      return <FormSelectInput {...field} key={field.name} />;
    case "checkbox":
      return <FormCheckBox {...field} key={field.name} />;
    case "radio":
      return <FormRadioInput {...field} key={field.name} />;
    case "textarea":
      return <FormTextArea {...field} key={field.name} />;
    case "date":
      return <FormDateInput {...field} key={field.name} />;
    default:
      throw new Error(
        `Invalid input type, allowed types: ${allowedFormInputType.join(", ")}`
      );
  }
};
