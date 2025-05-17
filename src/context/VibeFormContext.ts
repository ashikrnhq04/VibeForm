import { createContext, useContext } from "react";
import { Control, FieldValues } from "react-hook-form";

export type VibeFormContextType<TFormValues extends FieldValues = any> = {
  control: Control<TFormValues>;
};

export const vibeFormContext = createContext<null | VibeFormContextType>(null);

export function useVibeFormContext<TFormValues extends FieldValues = any>() {
  const context = useContext(vibeFormContext);

  if (!context) {
    throw new Error("The form can't be used out of context");
  }

  return context as VibeFormContextType<TFormValues>;
}
