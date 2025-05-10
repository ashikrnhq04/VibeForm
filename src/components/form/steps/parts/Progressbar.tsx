import { Progress } from "@/components/ui/progress";

export default function Progressbar({
  currentStep,
  index,
}: {
  currentStep: number;
  index: number;
}) {
  return (
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
  );
}
