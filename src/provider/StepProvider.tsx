import { StepTimelineContext } from "@/context/StepTimelineContext";

import { ReactNode, useState } from "react";
import StepTimeline from "@/components/form/steps/StepTimeline";
import { childrenToArray } from "@/components/form/steps/stepindicator.hooks";

import { type StepError } from "@/context/StepTimelineContext";

export default function StepProvider({
  children,
  submit,
}: {
  children: ReactNode;
  submit: () => void;
}) {
  const [currentStep, setCurrentStep] = useState<number>(1);

  const [stepErrors, setStepErrors] = useState<Record<number, StepError>>({});

  const totalSteps = childrenToArray(children).length;

  return (
    <StepTimelineContext
      value={{
        currentStep,
        setCurrentStep,
        totalSteps,
        stepErrors,
        setStepErrors,
      }}
    >
      <StepTimeline submit={submit}>{children}</StepTimeline>
    </StepTimelineContext>
  );
}
