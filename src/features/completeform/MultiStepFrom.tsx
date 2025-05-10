import StepProvider from "@/provider/StepProvider";
import Step from "../../components/form/steps/Step";

export default function MultiStepFrom() {
  return (
    <>
      <div>Multi Step From</div>
      <StepProvider>
        <Step>Form Step 1</Step>
        <Step>Step 2 </Step>
        <Step>Form step 3</Step>
        <Step
          validate={() => ({
            hasError: true,
            message: "Fix the error to continue ",
          })}>
          Form step 4
        </Step>
        <Step>Form step 5</Step>
        <Step>Form step 6</Step>
      </StepProvider>
    </>
  );
}
