import {
  type StepError,
  useStepTimelineContext,
} from "@/context/StepTimelineContext";
import { ReactNode } from "react";

export type StepProps = {
  children: ReactNode;
  validate?: () => StepError | Promise<StepError>;
};

export default function Step({ children, validate }: StepProps) {
  const { currentStep, setCurrentStep, setStepErrors, stepErrors } =
    useStepTimelineContext();

  const error = stepErrors?.[currentStep];

  return (
    <div className={`form-page-${currentStep}`}>
      {error?.hasError && (
        <p className='text-center text-red-500'>{error.message}</p>
      )}
      {children}
    </div>
  );
}
