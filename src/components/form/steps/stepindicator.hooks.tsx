import { useStepTimelineContext } from "@/context/StepTimelineContext";

import React, {
  Children,
  isValidElement,
  ReactElement,
  ReactNode,
} from "react";
import Step from "./Step";

export default function useStepIndicator(children: ReactNode[]) {
  type StepProps = {
    validate?: () => boolean;
  };

  const { currentStep, setCurrentStep, totalSteps, stepErrors, setStepErrors } =
    useStepTimelineContext();

  const curretnStepElement = getSteps(children)[
    currentStep - 1
  ] as ReactElement<StepProps>;

  function handleNext(): void {
    setCurrentStep((current: number) => {
      if (current < totalSteps) {
        if (curretnStepElement.props.validate) {
          if (curretnStepElement.props.validate()) {
            return current + 1;
          }
        } else {
          return current + 1;
        }
      }
      return current;
    });
  }

  function handlePrev(): void {
    setCurrentStep((current: number) => (current > 1 ? current - 1 : current));
  }

  return {
    currentStep,
    setCurrentStep,
    totalSteps,
    handleNext,
    handlePrev,
    stepErrors,
    setStepErrors,
  };
}

export function getSteps(children: ReactNode): ReactNode[] {
  return Children.toArray(children).filter(
    (child) => isValidElement(child) && child.type == Step
  );
}
