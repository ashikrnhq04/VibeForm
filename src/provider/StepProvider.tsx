import { StepTimelineContext } from "@/context/StepTimelineContext";

import { ReactNode, useState } from "react";
import StepTimeline from "@/components/form/steps/StepTimeline";
import { getSteps } from "@/components/form/steps/stepindicator.hooks";

export default function StepProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState<number>(1);

  const totalSteps = getSteps(children).length;

  return (
    <StepTimelineContext value={{ currentStep, setCurrentStep, totalSteps }}>
      <StepTimeline>{children}</StepTimeline>
    </StepTimelineContext>
  );
}
