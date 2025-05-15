import "./App.css";
import Step from "./components/form/steps/Step";
import VibeForm from "./components/form/VibeForm";
import MultiStepFrom from "./features/completeform/MultiStepFrom";
import FormContextProvider from "./provider/FormContextProvider";

function App() {
  return (
    <>
      <FormContextProvider>
        <VibeForm>
          <Step>Step One </Step>
          <Step>Step Two </Step>
          <Step>Step Three </Step>
          <Step>Step Four </Step>
        </VibeForm>
      </FormContextProvider>
    </>
  );
}

export default App;
