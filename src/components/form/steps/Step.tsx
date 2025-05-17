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
  const { currentStep, stepErrors } = useStepTimelineContext();

  const error = stepErrors?.[currentStep];

  return (
    <div className={`form-page-${currentStep} space-y-4`}>
      {error?.hasError && (
        <p className='text-center text-red-500'>{error.message}</p>
      )}
      {children}
    </div>
  );
}
