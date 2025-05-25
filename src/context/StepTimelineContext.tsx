import {
  createContext,
  Dispatch,
  Ref,
  RefObject,
  SetStateAction,
  useContext,
} from "react";

export type StepError = {
  hasError: boolean;
  message?: string;
};

export type StepTimelineContextType = {
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;
  totalSteps: number;
  stepErrors: Record<number, StepError>;
  setStepErrors: (errors: Record<number, StepError>) => void;
  submitBtnRef: RefObject<HTMLButtonElement>;
};

export const StepTimelineContext =
  createContext<StepTimelineContextType | null>(null);

export const useStepTimelineContext = (): StepTimelineContextType => {
  const context = useContext(StepTimelineContext);

  if (!context) {
    throw new Error("This step timeline can't be used out of context");
  }

  return context;
};
