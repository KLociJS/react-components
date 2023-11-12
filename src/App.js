import Form from "./Form/Form";
import {
  allowedRange,
  isEmail,
  regexTest,
  required,
} from "./Form/utils/validationRules";

function App() {
  const initialValues = {
    name: "",
    email: "",
    age: "",
    github: "",
    phone: "",
    search: "",
    gender: "",
    acceptToS: false,
  };

  const formValidations = {
    name: [required("Name")],
    email: [required("Email"), isEmail],
    age: [required("Age"), allowedRange(0, 120)],
    github: [
      required("Github url"),
      regexTest(
        /^(https?:\/\/)?(www\.)?github\.com\/.+$/,
        "Invalid github link"
      ),
    ],
    phone: [
      required("Phone"),
      regexTest(
        /^(\+36|06)[ -]?(20|30|31|70)[ -]?\d{3}[ -]?\d{4}$/,
        "Invalid phone number"
      ),
    ],
    gender: [required("Gender")],
    search: [required("Search")],
    acceptToS: [required()],
  };

  const onSubmit = (values) => {
    console.log("Form Submitted with values: ", values);
  };

  return (
    <Form
      formValidations={formValidations}
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      <Form.TextBasedFormInput label='Name' name='name' isDisabled={false} />
      <Form.TextBasedFormInput
        label='Email'
        name='email'
        type='email'
        isDisabled={false}
      />
      <Form.TextBasedFormInput
        label='Number'
        name='age'
        type='number'
        isDisabled={false}
      />
      <Form.TextBasedFormInput
        label='Url'
        name='github'
        type='url'
        isDisabled={false}
      />
      <Form.TextBasedFormInput
        label='Tel'
        name='phone'
        type='tel'
        isDisabled={false}
      />
      <Form.TextBasedFormInput
        label='Search'
        name='search'
        type='search'
        isDisabled={false}
      />
      <Form.FormSelectInput
        label='Select'
        name='gender'
        isDisabled={false}
        multiple={false}
        options={[
          { value: "", label: "--Select gender--" },
          { value: "male", label: "Male" },
          { value: "female", label: "Female" },
          { value: "other", label: "Other" },
        ]}
      />
      <Form.FormCheckBox
        label='Accept terms of service'
        name='acceptToS'
        isDisabled={false}
      />
      <Form.FormRadioInput
        label='Skill'
        name='skill'
        options={[
          { value: "beginner", label: "Beginner" },
          { value: "intermediate", label: "Intermediate" },
          { value: "advanced", label: "Advanced" },
        ]}
      />
      <Form.SubmitButton />
    </Form>
  );
}

export default App;

/* 

<input
        type='text'
        name='name'
        value={values.name}
        onChange={handleChange}
        placeholder='Name'
      />
      {errors.name && <div>{errors.name}</div>}

      <input
        // type='email'
        name='email'
        value={values.email}
        onChange={handleChange}
        placeholder='Email'
      />
      {errors.email && <div>{errors.email}</div>}

      <input
        type='password'
        name='password'
        value={values.password}
        onChange={handleChange}
        placeholder='Password'
      />
      {errors.password && <div>{errors.password}</div>}

      <input
        type='checkbox'
        name='agreeToTerms'
        checked={values.agreeToTerms}
        onChange={handleChange}
      />
      <label>Agree to terms</label>
      {errors.agreeToTerms && <div>{errors.agreeToTerms}</div>}

      <div>
        <input
          type='radio'
          name='gender'
          value='female'
          checked={values.gender === "female"}
          onChange={handleChange}
        />{" "}
        Female
        <input
          type='radio'
          name='gender'
          value='male'
          checked={values.gender === "male"}
          onChange={handleChange}
        />{" "}
        Male
      </div>
      {errors.gender && <div>{errors.gender}</div>}

      <select
        multiple
        name='interests'
        value={values.interests}
        onChange={handleChange}
      >
        <option value='sports'>Sports</option>
        <option value='music'>Music</option>
        <option value='movies'>Movies</option>
      </select>
      {errors.interests && <div>{errors.interests}</div>}

      <button type='submit'>Submit</button>

*/
