import { createContext, useContext } from "react";

export const FormContext = createContext(null);

function useFormContext() {
  const context = useContext(FormContext);

  if (!context) {
    throw new Error("The form can't be used out of context");
  }

  return context;
}
