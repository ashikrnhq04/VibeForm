import React, { ReactElement, ReactNode } from "react";
import useStepIndicator, { childrenToArray } from "./stepindicator.hooks";
import StepSwitcher from "./StepSwitcher";
import { PaginationContent } from "@/components/ui/pagination";
import Indicator from "./parts/Indicator";
import Progressbar from "./parts/Progressbar";
import Step from "./Step";

export default function StepTimeline({
  children,
  submit,
}: {
  children: ReactNode;
  submit: () => void;
}) {
  const { currentStep, handleNext, handlePrev, stepErrors, totalSteps } =
    useStepIndicator(childrenToArray(children));

  const childrens = childrenToArray(children).filter(
    (child) => (child as ReactElement).type == Step
  );

  const curretnStepElement = childrens[currentStep - 1];

  const error = stepErrors;

  return (
    <div className='form-wrapper space-y-6'>
      <PaginationContent className='flex items-center space-x-2 w-full'>
        {childrens.length > 1 &&
          childrens.map((_, index) => {
            return (
              <React.Fragment key={index}>
                <Indicator
                  length={childrens.length}
                  index={index}
                  currentStep={currentStep}
                  hasError={error[currentStep]?.hasError}
                />
                {childrens.length - 1 !== index && (
                  <Progressbar currentStep={currentStep} index={index} />
                )}
              </React.Fragment>
            );
          })}
      </PaginationContent>

      {curretnStepElement}

      {childrens.length > 1 && (
        <StepSwitcher
          currentStep={currentStep}
          nextBtnTxt={"Next"}
          handlePrev={handlePrev}
          handleNext={() => handleNext(submit)}
          totalSteps={totalSteps}
        />
      )}
    </div>
  );
}
