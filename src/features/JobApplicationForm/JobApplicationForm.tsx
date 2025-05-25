import { Button } from "@/components/ui/button";
import Step from "@/components/form/steps/Step";
import VibeForm, { VibeFormRefType } from "@/components/form/VibeForm";
import { z } from "zod";
import { StepError } from "@/context/StepTimelineContext";
import { useRef } from "react";
import { addressSchema, educationSchema, personalInfoSchema } from "./schema";
import StepArea from "@/provider/StepProvider";
import PersonalDetails from "./PersonalDetails";
import EducationDetails from "./EducationDetails";

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
  const submitBtnRef = useRef<HTMLButtonElement>(null);

  type formType = z.infer<typeof formSchema>;
  const formRef = useRef<VibeFormRefType<formType>>(null);

  function clickSubmit() {
    submitBtnRef.current?.click();
  }

  function validateStep(): StepError | undefined {
    const errors = formRef.current?.getErrors as
      | Record<string, { message: string }>
      | undefined;

    if (errors) {
      for (const key in errors) {
        if (key.length > 0) {
          return {
            hasError: true,
            message:
              key.length == 1 ? errors[key].message : "Fields are required",
          };
        }
      }
    }
    return undefined;
  }

  console.log(formRef.current?.getErrors);

  return (
    <VibeForm
      ref={formRef}
      schema={formSchema}
      initialValuse={formInitialValues}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      <StepArea>
        <Step validate={validateStep}>
          <PersonalDetails />
        </Step>
        <Step validate={validateStep}>
          <EducationDetails />
        </Step>
        <Step validate={validateStep}>Step Three </Step>
        <Step validate={validateStep}>Step Four </Step>
      </StepArea>
      <Button ref={submitBtnRef}>Submit</Button>
    </VibeForm>
  );
}
