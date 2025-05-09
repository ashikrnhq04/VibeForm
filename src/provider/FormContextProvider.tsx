import { FormContext } from "@/context/FormContext";
import { ReactNode } from "react";

type FormContextChildren = {
  children: ReactNode;
};

export default function FormContextProvider({ children }: FormContextChildren) {
  return <FormContext value={null}>{children}</FormContext>;
}
