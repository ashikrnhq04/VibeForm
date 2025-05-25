import {
  type StepError,
  useStepTimelineContext,
} from "@/context/StepTimelineContext";
import { ReactNode } from "react";

export type StepProps = {
  children: ReactNode;
  validate?: () => StepError | Promise<StepError> | undefined;
};

export default function Step({ children }: StepProps) {
  const { currentStep, stepErrors, setStepErrors } = useStepTimelineContext();

  const error = stepErrors?.[currentStep];

  return (
    <div className={`form-page-${currentStep} space-y-4`}>
      {error?.hasError && (
        <p className='text-center text-red-500'>{error.message}</p>
      )}
      {children}
      {error?.hasError && (
        <p className='text-center text-red-500'>{error.message}</p>
      )}
    </div>
  );
}
