import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

export default function StepSwitcher({
  handlePrev,
  handleNext,
  prevBtnTxt = "Prev",
  nextBtnTxt = "Next",
  currentStep,
  totalSteps,
}: {
  handlePrev: () => void;
  handleNext: () => void;
  prevBtnTxt?: ReactNode;
  nextBtnTxt: ReactNode;
  currentStep: number;
  totalSteps: number;
}) {
  return (
    <div className='flex gap-2 justify-between items-center'>
      <Button
        type='button'
        disabled={currentStep === 1}
        variant='outline'
        className='cursor-pointer'
        onClick={handlePrev}
      >
        {prevBtnTxt}
      </Button>
      <Button
        disabled={currentStep > totalSteps}
        variant='outline'
        className='cursor-pointer '
        type='button'
        onClick={handleNext}
      >
        {nextBtnTxt}
      </Button>
    </div>
  );
}
