import { StepTimelineContext } from "@/context/StepTimelineContext";

import { ReactNode, RefObject, useState } from "react";
import StepTimeline from "@/components/form/steps/StepTimeline";
import { childrenToArray } from "@/components/form/steps/stepindicator.hooks";

import { type StepError } from "@/context/StepTimelineContext";

export default function StepArea({
  children,
  submitBtnRef,
}: {
  children: ReactNode;
  submitBtnRef: RefObject<HTMLButtonElement>;
}) {
  const [currentStep, setCurrentStep] = useState<number>(1);

  const [stepErrors, setStepErrors] = useState<Record<number, StepError>>({});

  const totalSteps = childrenToArray(children).length;

  /**
   * This component provides a context for managing the step timeline state,
   * including the current step, total steps, step errors, and a reference to the submit button.
   * It wraps the StepTimeline component, allowing child components to access the step state and methods.
   * It uses React's useState hook to manage the current step and step errors,
   * and provides a reference to the submit button for form submission.
   * It also ensures that the step errors are initialized as an empty object.
   * * @param {ReactNode} children - The child components to be rendered within the step timeline.
   * @param {RefObject<HTMLButtonElement>} submitBtnRef - A reference to the submit button element.
   * @returns {JSX.Element} A StepArea component that provides the step timeline context.
   * @example
   * <StepArea submitBtnRef={submitBtnRef}>
   *  <Step>
   *   <TextField name="firstName" label="First Name" />
   *  </Step>
   * <Step>
   *  <TextField name="lastName" label="Last Name" />
   * </Step>
   * </StepArea>
   * @description
   * The StepArea component is a wrapper around the StepTimeline component that provides a context for managing the step timeline state.
   * It allows child components to access the current step, total steps, step errors, and a reference to the submit button.
   * It uses React's useState hook to manage the current step and step errors,
   * and provides a reference to the submit button for form submission.
   * This component is useful for creating multi-step forms or wizards where the user can navigate through different steps.
   * It ensures that the step errors are initialized as an empty object,
   * allowing for dynamic error handling as the user progresses through the steps.
   * It also provides a way to manage the current step and total steps in a clean and efficient manner.
   * @see StepTimelineContext for more details on the context provided by this component.
   * @see StepTimeline for the component that renders the step timeline UI.
   * @see childrenToArray for a utility function that converts children to an array.
   * @see StepError for the type definition of step errors.
   * @see RefObject for the type definition of the submit button reference.
   */

  return (
    <StepTimelineContext
      value={{
        currentStep,
        setCurrentStep,
        totalSteps,
        stepErrors,
        setStepErrors,
        submitBtnRef,
      }}
    >
      <StepTimeline>{children}</StepTimeline>
    </StepTimelineContext>
  );
}

StepArea.displayName = "StepArea";
