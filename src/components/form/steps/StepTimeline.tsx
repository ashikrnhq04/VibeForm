import React, { ReactNode, Children } from "react";
import useStepIndicator, { getSteps } from "./stepindicator.hooks";
import SwitchStep from "./SwitchStep";
import Progressbar from "./parts/Progressbar";
import Indicator from "./parts/Indicator";

export default function StepIndicator({ children }: { children: ReactNode }) {
  const { currentStep, setCurrentStep, handleNext, handlePrev } =
    useStepIndicator(getSteps(children));

  const childrens = getSteps(children);

  const curretnStepElement = childrens[currentStep - 1];

  return (
    <>
      <div className='flex items-center space-x-2'>
        {childrens.map((child, index) => (
          <React.Fragment key={index}>
            <Indicator currentStep={currentStep} index={index} />
            <Progressbar
              length={childrens.length - 1}
              index={index}
              currentStep={currentStep}
            />
          </React.Fragment>
        ))}
      </div>
      <div className='timeline'>{curretnStepElement}</div>
      <SwitchStep handlePrev={handlePrev} handleNext={handleNext} />
    </>
  );
}
