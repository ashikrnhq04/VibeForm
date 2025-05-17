import { FormContext } from "@/context/VibeFormContext";
import { ReactNode, useState } from "react";

type FormContextChildren = {
  children: ReactNode;
};

export default function FormContextProvider({ children }: FormContextChildren) {
  const [context, setContext] = useState({});
  return <FormContext value={context}>{children}</FormContext>;
}
