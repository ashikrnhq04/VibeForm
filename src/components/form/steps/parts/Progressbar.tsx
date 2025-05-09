export default function Progressbar({
  length,
  currentStep,
  index,
}: {
  length: number;
  currentStep: number;
  index: number;
}) {
  return (
    length !== index && (
      <div
        className={`flex-1 h-0.5 ${
          currentStep - 1 === index
            ? "bg-green-300"
            : index < currentStep - 1
            ? "bg-green-500"
            : "bg-slate-500"
        }`}></div>
    )
  );
}
