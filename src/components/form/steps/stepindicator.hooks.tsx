import {
  type StepError,
  useStepTimelineContext,
} from "@/context/StepTimelineContext";

import { Props } from "./Step";

import { Children, isValidElement, ReactElement, ReactNode } from "react";

export default function useStepIndicator(children: ReactNode[]) {
  const {
    currentStep,
    setCurrentStep,
    totalSteps,
    stepErrors,
    setStepErrors,
    submitBtnRef,
  } = useStepTimelineContext();

  const steps = childrenToArray(children);

  type onCompleteType = () => void | Promise<void>;

  async function handleNext(onComplete?: onCompleteType): Promise<void> {
    //check step validity
    const error = await validateStep(steps, currentStep);

    //update state with error
    if (error?.hasError) {
      setStepErrors({ [currentStep]: error });
      return;
    }

    //clear error state
    setStepErrors({ [currentStep]: { hasError: false } });

    //return of onComplete function if any
    if (currentStep === totalSteps && onComplete) {
      return await onComplete();
    }

    //update step state
    setCurrentStep((currentStep) =>
      currentStep < totalSteps ? currentStep + 1 : currentStep
    );
  }

  function handlePrev(): void {
    setCurrentStep((current: number) => (current > 1 ? current - 1 : current));
  }

  return {
    currentStep,
    totalSteps,
    handleNext,
    handlePrev,
    stepErrors,
    setStepErrors,
    steps,
    submitBtnRef,
  };
}

export function childrenToArray(children: ReactNode): ReactNode[] {
  return Children.toArray(children).filter((child) => isValidElement(child));
}

const validateStep = async (
  steps: ReactNode[],
  step: number
): Promise<StepError> => {
  const currentChild = steps[step - 1] as ReactElement<Props>;
  if (currentChild.props.validate) {
    return (await currentChild.props.validate()) ?? { hasError: false };
  }
  return { hasError: false };
};
