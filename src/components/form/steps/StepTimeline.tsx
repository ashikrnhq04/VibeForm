import React, { ReactNode, Children } from "react";
import useStepIndicator, { getSteps } from "./stepindicator.hooks";
import SwitchStep from "./SwitchStep";
import { PaginationContent, PaginationItem } from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { TiTick } from "react-icons/ti";
import { Progress } from "@/components/ui/progress";

export default function StepIndicator({ children }: { children: ReactNode }) {
  const { currentStep, setCurrentStep, handleNext, handlePrev } =
    useStepIndicator(getSteps(children));

  const childrens = getSteps(children);

  const curretnStepElement = childrens[currentStep - 1];

  return (
    <>
      <PaginationContent className='flex items-center space-x-2 w-full'>
        {childrens.length > 1 &&
          childrens.map((_, index) => (
            <React.Fragment key={index}>
              <PaginationItem>
                <Button
                  size='icon'
                  variant={index + 1 < currentStep ? "default" : "outline"}
                  className={`${
                    index + 1 < currentStep
                      ? "bg-blue-500 text-white"
                      : "bg-background"
                  }`}>
                  {index + 1 < currentStep ? <TiTick /> : index + 1}
                </Button>
              </PaginationItem>

              {childrens.length - 1 !== index && (
                <Progress
                  data-state='loading'
                  className={`flex-1 h-0.5 ${
                    currentStep - 1 === index
                      ? "bg-blue-300"
                      : index < currentStep - 1
                      ? "bg-blue-500"
                      : "bg-slate-300"
                  }  rounded-md`}
                />
              )}
            </React.Fragment>
          ))}
      </PaginationContent>

      <div className='timeline'>{curretnStepElement}</div>

      {childrens.length > 1 && (
        <SwitchStep handlePrev={handlePrev} handleNext={handleNext} />
      )}
    </>
  );
}
