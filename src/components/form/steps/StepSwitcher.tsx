import { Button } from "@/components/ui/button";
import { useStepTimelineContext } from "@/context/StepTimelineContext";
import { ReactNode } from "react";

export default function StepSwitcher({
  handlePrev,
  handleNext,
  prevBtnTxt = "Prev",
  nextBtnTxt = "Next",
  currentStep,
}: {
  handlePrev: () => void;
  handleNext: () => void;
  prevBtnTxt?: ReactNode;
  nextBtnTxt: ReactNode;
  currentStep: number;
}) {
  return (
    <div className='flex gap-2 justify-between items-center'>
      <Button
        disabled={currentStep === 1}
        variant='outline'
        className='cursor-pointer'
        onClick={handlePrev}>
        {prevBtnTxt}
      </Button>
      <Button
        variant='outline'
        className='cursor-pointer '
        onClick={handleNext}>
        {nextBtnTxt}
      </Button>
    </div>
  );
}
