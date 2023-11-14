import { useCallback, useState } from "react";
import Form from "./Form/Form";
import deBouncer from "./Form/utils/debounce";
import {
  allowedRange,
  isEmail,
  maxLength,
  minLength,
  regexTest,
  required,
} from "./Form/utils/validationRules";

function App() {
  const [isDisabled, setIsDisabled] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  const debounceAutocomplete = deBouncer((value) => {
    console.count(value);
  }, 300);

  const memoizedAutocomplete = useCallback(
    (value) => debounceAutocomplete(value),
    [debounceAutocomplete]
  );

  const formFieldsConfig = [
    {
      type: "text",
      name: "name",
      label: "Name",
      initialValue: "Loci",
      validations: [required("Name")],
      isDisabled: isDisabled,
      autoComplete: memoizedAutocomplete,
    },
    {
      type: "date",
      name: "date",
      label: "Date",
      initialValue: "2023-11-13",
      validations: [required("Date")],
      isDisabled: isDisabled,
    },
    {
      type: "textarea",
      name: "description",
      label: "Description",
      min: 100,
      max: 400,
      initialValue:
        "lore ipsum lore ipsum lore ipsum lore ipsum lore ipsum lore ipsum lore ipsum lore ipsum lore ipsum lore ipsum lore ipsum lore ipsum lore ipsum lore ipsum lore ipsum lore ipsum lore ipsum lore ipsum lore ipsum",
      validations: [required("Description"), minLength(100), maxLength(400)],
      isDisabled: isDisabled,
    },
    {
      type: "email",
      name: "email",
      label: "Email",
      initialValue: "lk@gmail.com",
      validations: [required("Email"), isEmail],
      isDisabled: isDisabled,
    },
    {
      type: "number",
      name: "age",
      label: "Age",
      initialValue: "30",
      validations: [required("Age"), allowedRange(0, 120)],
      isDisabled: isDisabled,
    },
    {
      type: "url",
      name: "github",
      label: "Url",
      initialValue: "https://www.github.com/KLociJS",
      validations: [
        required("Github url"),
        regexTest(
          /^(https?:\/\/)?(www\.)?github\.com\/.+$/,
          "Invalid github link"
        ),
      ],
      isDisabled: isDisabled,
    },
    {
      type: "tel",
      name: "phone",
      label: "Tel",
      initialValue: "06308889999",
      validations: [
        required("Phone"),
        regexTest(
          /^(\+36|06)[ -]?(20|30|31|70)[ -]?\d{3}[ -]?\d{4}$/,
          "Invalid phone number"
        ),
      ],
      isDisabled: isDisabled,
    },
    {
      type: "search",
      name: "search",
      label: "Search",
      initialValue: "use google lol",
      validations: [required("Search")],
      isDisabled: isDisabled,
    },
    {
      type: "select",
      name: "gender",
      label: "Select",
      initialValue: "male",
      validations: [required("Gender")],
      options: [
        { value: "", label: "--Select gender--" },
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
        { value: "other", label: "Other" },
      ],
      isDisabled: isDisabled,
      multiple: false,
    },
    {
      type: "checkbox",
      name: "acceptToS",
      label: "Accept terms of service",
      initialValue: true,
      validations: [required()],
      isDisabled: isDisabled,
    },
    {
      type: "radio",
      name: "skill",
      label: "Skill",
      initialValue: "beginner",
      validations: [required("Skill")],
      options: [
        { value: "beginner", label: "Beginner" },
        { value: "intermediate", label: "Intermediate" },
        { value: "advanced", label: "Advanced" },
      ],
      isDisabled: isDisabled,
    },
  ];

  const onSubmit = (values) => {
    setIsDisabled(true);
    setIsRetrying(true);
    setFetchError(null);
    setTimeout(() => {
      setIsDisabled(false);
      setIsRetrying(false);
      setFetchError(["Server error, try again later."]);
    }, 5000);
    console.log("Form Submitted with values: ", values);
  };

  return (
    <Form
      formFields={formFieldsConfig}
      onSubmit={onSubmit}
      isDisabled={isDisabled}
      isRetrying={isRetrying}
      fetchError={fetchError}
    />
  );
}

export default App;
