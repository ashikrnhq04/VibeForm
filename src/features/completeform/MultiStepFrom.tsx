import StepProvider from "@/provider/StepProvider";
import Step from "../../components/form/steps/Step";

export default function MultiStepFrom() {
  return (
    <>
      <div>Multi Step From</div>
      <StepProvider>
        <Step validate={() => true}>Form Step 1</Step>
        <Step>Step 2 </Step>
        <Step>Form step 3</Step>

        <Step validate={() => true}>Form step 4</Step>
        <Step>Form step 5</Step>
        <Step>Form step 6</Step>
      </StepProvider>
    </>
  );
}
