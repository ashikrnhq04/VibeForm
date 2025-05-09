import { createContext, Dispatch, SetStateAction, useContext } from "react";

export type StepError = {
  hasError: boolean;
  message?: string;
};

export type StepTimelineContextType = {
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;
  totalSteps: number;
  stepErrors?: Record<number, StepError>;
  setStepErrors?: (errors: Record<number, StepError>) => void;
};

export const StepTimelineContext =
  createContext<StepTimelineContextType | null>(null);

export const useStepTimelineContext = (): StepTimelineContextType => {
  const context = useContext(StepTimelineContext);

  if (!context) {
    throw new Error("This form can't be used out of context");
  }

  return context;
};
