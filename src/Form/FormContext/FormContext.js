import { createContext, useContext } from "react";

const FormContext = createContext();

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error(
      "Form components must be rendered as a child of Form component."
    );
  }
  return context;
};

export const FormContextProvider = ({ children, value }) => (
  <FormContext.Provider value={value}>{children}</FormContext.Provider>
);
