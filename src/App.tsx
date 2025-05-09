import "./App.css";
import MultiStepFrom from "./features/completeform/MultiStepFrom";
import FormContextProvider from "./provider/FormContextProvider";

function App() {
  return (
    <>
      <FormContextProvider>
        <MultiStepFrom />
      </FormContextProvider>
    </>
  );
}

export default App;
