import { useStepTimelineContext } from "@/context/StepTimelineContext";
import StepperProvider from "@/provider/StepProvider";
import { ReactNode } from "react";

export default function Step({
  children,
  validate,
}: {
  children: ReactNode;
  validate?: () => boolean;
}) {
  const { currentStep, setCurrentStep, setStepErrors } =
    useStepTimelineContext();

  return <div className={`form-page-${currentStep}`}>{children}</div>;
}
