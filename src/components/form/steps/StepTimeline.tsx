import React, { ReactNode } from "react";
import useStepIndicator, { childrenToArray } from "./stepindicator.hooks";
import StepSwitcher from "./StepSwitcher";
import { PaginationContent } from "@/components/ui/pagination";
import Indicator from "./parts/Indicator";
import Progressbar from "./parts/Progressbar";

export default function StepIndicator({ children }: { children: ReactNode }) {
  const { currentStep, handleNext, handlePrev, stepErrors } = useStepIndicator(
    childrenToArray(children)
  );

  const childrens = childrenToArray(children);

  const curretnStepElement = childrens[currentStep - 1];

  const error = stepErrors;

  console.log(currentStep);
  return (
    <>
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

      <div className='timeline'>{curretnStepElement}</div>

      {childrens.length > 1 && (
        <StepSwitcher
          currentStep={currentStep}
          nextBtnTxt={currentStep === childrens.length ? "Submit" : "Next"}
          handlePrev={handlePrev}
          handleNext={() => handleNext(() => alert("I'm complete"))}
        />
      )}
    </>
  );
}
