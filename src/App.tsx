import { z } from "zod";
import "./App.css";
import Step from "./components/form/steps/Step";
import VibeForm, { VibeFormRefType } from "./components/form/VibeForm";
import { TextField } from "./components/form/fields/TextField";
import { useRef } from "react";
import StepProvider from "./provider/StepProvider";
import { Button } from "./components/ui/button";
import { DateField } from "./components/form/fields/DateField";
import { SelectField } from "./components/form/fields/SelectField";
import {
  Mail,
  Shapes,
  Signal,
  SquareUserRound,
  UserCog,
  UserRound,
  UserRoundPlus,
  UsersRound,
} from "lucide-react";

const formSchema = z.object({
  firstName: z.string().nonempty({ message: "First name can't be empty" }),
  lastName: z.string().nonempty({ message: "Last name can't be empty" }),
  fatherName: z.string().nonempty({ message: "Father's name can't be empty" }),
  motherName: z.string().nonempty({ message: "Mother's name can't be empty" }),
  email: z.string().email({ message: "Email is invalid." }).trim(),
  phone: z.coerce.string().regex(/^(?:\+88)?(01[3-9])(\d){8}$/, {
    message: "Provide a valid BD mobile number",
  }),
  dob: z.preprocess(
    (val) => {
      return val instanceof Date ? val : new Date(val as string);
    },
    z.date().refine(
      (dob) => {
        const age = calculateAge(dob);

        const today = new Date();

        const daysInMonth = new Date(
          today.getFullYear(),
          today.getMonth(),
          0
        ).getDate();

        //check eligibility by age between 18 and 32
        const isEligible =
          age.years >= 18 &&
          age.years <= 31 &&
          age.months < 12 &&
          age.days <= daysInMonth;

        return isEligible;
      },
      {
        message: "Age must be between 18 and 32",
      }
    )
  ),
  NID: z.coerce.string().regex(/^(\d{10}|\d{17})$/, {
    message: "NID number must be in 10 or 17 digits format",
  }),
  gender: z.string({
    message: "Select your gender",
  }),
  present_address: z.object({
    co: z.string().nonempty({ message: "C/O can't be empty" }),
    adress: z.string().nonempty({ message: "C/O can't be empty" }),
    city: z.string().nonempty({ message: "C/O can't be empty" }),
    division: z.string().nonempty({ message: "C/O can't be empty" }),
    country: z.string().nonempty({ message: "C/O can't be empty" }),
  }),
  parmanent_address: z.object({
    co: z.string().nonempty({ message: "C/O can't be empty" }),
    adress: z.string().nonempty({ message: "C/O can't be empty" }),
    city: z.string().nonempty({ message: "C/O can't be empty" }),
    division: z.string().nonempty({ message: "C/O can't be empty" }),
    country: z.string().nonempty({ message: "C/O can't be empty" }),
  }),
  same_as_preset: z.boolean(),
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
                  required
                  icon={<UserRound size={18} />}
                />
                <TextField
                  label=''
                  type='text'
                  placeholder='Last Name'
                  name='lastName'
                  required
                  icon={<UsersRound size={18} />}
                />
              </div>

              <TextField
                label="Father's Name"
                type='text'
                placeholder="Father's Name"
                name='fatherName'
                required
                icon={<UserCog size={18} />}
              />
              <TextField
                label="Mother's Name"
                type='text'
                placeholder="Mother's Name"
                name='motherName'
                required
                icon={<UserRoundPlus size={18} />}
              />

              <TextField
                label='Mobile No.'
                type='text'
                placeholder='Contact Number'
                name='phone'
                required
                icon={<Signal size={18} />}
              />
              <TextField
                label='Email'
                type='email'
                placeholder='Email Address'
                name='email'
                required
                icon={<Mail size={18} />}
              />
              <div className='flex gap-4 items-start'>
                <DateField
                  label='Date of Birth'
                  name='dob'
                  placeholder='Pick a date'
                  required
                  description='Date of birth will be used to calculate age'
                />
                <TextField
                  label='National ID'
                  type='text'
                  placeholder='NID number'
                  name='NID'
                  className='mt-1'
                  icon={<SquareUserRound size={18} />}
                  required
                />
              </div>
              <SelectField
                name='gender'
                label='Gender'
                placeholder='Select your gender'
                options={[
                  { value: "male", text: "Male" },
                  { value: "female", text: "Female" },
                  { value: "other", text: "Other" },
                ]}
                required
                icon={<Shapes size={18} />}
              />
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

function calculateAge(dob: Date) {
  const today = new Date();

  let years = today.getFullYear() - dob.getFullYear();
  let months = today.getMonth() - dob.getMonth();
  let days = today.getDate() - dob.getDate();

  //adjust month in case of negative days value
  if (days < 0) {
    months--;
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += prevMonth.getDate();
  }

  //adjust year in case of negative months value
  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months, days };
}
