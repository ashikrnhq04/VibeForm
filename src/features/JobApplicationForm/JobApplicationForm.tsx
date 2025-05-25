import Step from "@/components/form/steps/Step";
import VibeForm, { VibeFormRefType } from "@/components/form/VibeForm";
import { z } from "zod";
import { useRef } from "react";
import {
  addressSchema,
  educationSchema,
  firstStepFields,
  personalInfoSchema,
  secondStepFields,
} from "./schema";
import StepArea from "@/provider/StepProvider";
import PersonalDetails from "./PersonalDetails";
import EducationDetails from "./EducationDetails";
import { useTriggerForm } from "@/components/form/hooks/useTriggerForm";

const formSchema = z.object({
  personalInfo: personalInfoSchema,
  present_address: addressSchema,
  permanent_address: addressSchema,
  education: educationSchema,
});

const formInitialValues = {
  personalInfo: {
    firstName: "",
    lastName: "",
    fatherName: "",
    motherName: "",
    email: "",
    dob: new Date(),
    phone: "",
    NID: "",
    gender: "",
    customGender: "",
  },
  present_address: {
    address: "",
    city: "",
    division: "",
    country: "",
  },
  permanent_address: {
    address: "",
    city: "",
    division: "",
    country: "",
  },
  education: [],
};

export default function JobApplicationForm() {
  type formType = z.infer<typeof formSchema>;

  const formRef = useRef<VibeFormRefType<formType>>(null);

  const triggerForm = useTriggerForm<formType>();

  const submitBtnRef = useRef();

  function validateStep(data: string[] | string) {
    return triggerForm(formRef.current?.form, data as []);
  }

  return (
    <VibeForm
      ref={formRef}
      schema={formSchema}
      initialValuse={formInitialValues}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      <StepArea submitBtnRef={submitBtnRef}>
        <Step validate={() => validateStep(firstStepFields)}>
          <PersonalDetails />
        </Step>
        <Step validate={() => validateStep(secondStepFields)}>
          <EducationDetails />
        </Step>
        <Step>Step Three </Step>
        <Step>Step Four </Step>
      </StepArea>
      <button type='submit' ref={submitBtnRef} hidden>
        Submit
      </button>
    </VibeForm>
  );
}
