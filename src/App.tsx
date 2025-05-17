import { z } from "zod";
import "./App.css";
import Step from "./components/form/steps/Step";
import VibeForm, { VibeFormRefType } from "./components/form/VibeForm";
import TextField from "./components/form/fields/TextField";
import { useRef } from "react";
import StepProvider from "./provider/StepProvider";
import { Button } from "./components/ui/button";
import DateField from "./components/form/fields/DateField";

const formSchema = z.object({
  firstName: z.string().min(1, { message: "Name field can't be blank." }),
  lastName: z.string().min(1, { message: "Name field can't be blank." }),
  fatherName: z.string().min(1, { message: "Name field can't be blank." }),
  motherName: z.string().min(1, { message: "Name field can't be blank." }),
  email: z.coerce.string().email({ message: "Email is invalid." }),
  dob: z.date({ message: "Date is required" }),
  phone: z.coerce.string().regex(/^(?:\+88)?(01[3-9])(\d){8}$/, {
    message: "Provide a valid BD mobile number",
  }),
});

const formInitialValues = {
  firstName: "",
  lastName: "",
  fatherName: "",
  motherName: "",
  email: "",
  dob: new Date(),
  phone: "",
};

function App() {
  const submitBtnRef = useRef<HTMLButtonElement>(null);

  const formRef = useRef<VibeFormRefType<z.infer<typeof formSchema>>>(null);

  function clickSubmit() {
    submitBtnRef.current?.click();
  }

  return (
    <main className='flex justify-center align-middle'>
      <div className='w-xl'>
        <VibeForm
          ref={formRef}
          schema={formSchema}
          initialValuse={formInitialValues}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          <StepProvider submit={clickSubmit}>
            <Step>
              <div className='flex gap-4'>
                <TextField
                  label='Name'
                  type='text'
                  placeholder='First Name'
                  name='firstName'
                />
                <TextField
                  label=''
                  type='text'
                  placeholder='Last Name'
                  name='lastName'
                />
              </div>

              <TextField
                label="Father's Name"
                type='text'
                placeholder="Father's Name"
                name='fatherName'
              />
              <TextField
                label="Mother's Name"
                type='text'
                placeholder="Mother's Name"
                name='motherName'
              />

              <TextField
                label='Mobile No.'
                type='text'
                placeholder='Contact Number'
                name='phone'
              />
              <TextField
                label='Email'
                type='email'
                placeholder='Email Address'
                name='email'
              />
              <DateField label='Date of Birth' name='dob' />
            </Step>
            <Step>Step Two </Step>
            <Step>Step Three </Step>
            <Step>Step Four </Step>
          </StepProvider>
          <Button ref={submitBtnRef}>Submit</Button>
        </VibeForm>
      </div>
    </main>
  );
}

export default App;
