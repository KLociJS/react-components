import "./Assets/Form.css";
import SubmitButton from "./Components/FormButton/SubmitButton";
import FormCheckBox from "./Components/FormCheckBox/FormCheckBox";
import FormRadioInput from "./Components/FormRadioInput/FormRadioInput";
import { FormSelectInput } from "./Components/FormSelect/FormSelectInput";
import TextBasedFormInput from "./Components/TextBasedFormInput/TextBasedFormInput";
import { FormContextProvider } from "./FormContext/FormContext";
import useForm from "./hooks/useForm";

export default function Form({
  children,
  formValidations,
  initialValues,
  onSubmit,
}) {
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
        {children}
      </FormContextProvider>
    </form>
  );
}

Form.TextBasedFormInput = TextBasedFormInput;
Form.FormSelectInput = FormSelectInput;
Form.FormCheckBox = FormCheckBox;
Form.SubmitButton = SubmitButton;
Form.FormRadioInput = FormRadioInput;
