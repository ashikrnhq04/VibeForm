import { TiTick } from "react-icons/ti";

export default function Indicator({
  currentStep,
  index,
}: {
  currentStep: number;
  index: number;
}) {
  return (
    <div
      className={`flex items-center justify-center w-10 h-10 rounded-md  text-white ${
        currentStep === index + 1
          ? "bg-green-400"
          : index < currentStep - 1
          ? "bg-green-500"
          : "bg-slate-500"
      }`}>
      {index < currentStep - 1 ? <TiTick size={28} /> : index + 1}
    </div>
  );
}
