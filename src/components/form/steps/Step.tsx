import {
  type StepError,
  useStepTimelineContext,
} from "@/context/StepTimelineContext";
import { ReactNode } from "react";

export type Props = {
  children: ReactNode;
  validate?: () => StepError | Promise<StepError> | undefined;
};

/**
 *
 * @param props - The Props for the Step component.
 * @param props.validation - An optional validation function that returns a StepError or undefined.
 * @param props.children - The content to be displayed within the step.
 *
 * @returns A JSX element representing the step.
 * @description
 * The Step component is used to render a single step in a multi-step form. Anything that is passed as children will be rendered within the step.
 * It displays the children content and handles any validation errors for the current step.
 * It uses the `useStepTimelineContext` to access the current step and any errors associated with it.
 * It also provides a way to display error messages if the step has any validation errors.
 * @example
 * <Step>
 *  <TextField name="firstName" label="First Name" />
 * </Step>
 * @see useStepTimelineContext for accessing the step timeline context.
 * @see StepError for the type definition of step errors.
 *
 */

export default function Step({ children }: Props) {
  const { currentStep, stepErrors } = useStepTimelineContext();

  const error = stepErrors?.[currentStep];

  return (
    <div className={`form-page-${currentStep} space-y-4`}>
      {children}
      {error?.hasError && (
        <p className='text-center text-red-500 p-4 bg-red-100/50'>
          {error.message}
        </p>
      )}
    </div>
  );
}
