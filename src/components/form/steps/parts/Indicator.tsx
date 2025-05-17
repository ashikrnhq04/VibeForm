import { PaginationItem } from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { TiTick } from "react-icons/ti";
import { useStepTimelineContext } from "@/context/StepTimelineContext";

export default function Indicator({
  index,
  currentStep,
  hasError,
  length,
}: {
  index: number;
  currentStep: number;
  hasError: boolean;
  length: number;
}) {
  const isCompleted = index + 1 < currentStep;

  const { setCurrentStep } = useStepTimelineContext();

  //indicator color
  const bgColor = isCompleted ? "bg-blue-500" : "bg-background";

  //indicator color on error
  const errorColor =
    hasError && index + 1 === currentStep ? "border-red-500 text-red-500" : "";

  return (
    length !== index && (
      <PaginationItem>
        <Button
          onClick={() =>
            setCurrentStep((current) => (isCompleted ? index + 1 : current))
          }
          size='icon'
          variant={isCompleted ? "default" : "outline"}
          className={` ${isCompleted ? "cursor-pointer" : ""} ${
            bgColor + " " + errorColor
          }`}
        >
          {isCompleted ? <TiTick /> : index + 1}
        </Button>
      </PaginationItem>
    )
  );
}
