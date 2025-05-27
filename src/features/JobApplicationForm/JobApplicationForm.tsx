import Step from "@/components/form/steps/Step";
import VibeForm, { VibeFormRefType } from "@/components/form/VibeForm";
import { z } from "zod";
import { useRef } from "react";
import {
  addressSchema,
  consentSchema,
  educationSchema,
  experienceSchema,
  firstStepFields,
  formInitialValues,
  personalInfoSchema,
  secondStepFields,
  thirdStepFields,
} from "./schema";
import StepArea from "@/provider/StepProvider";
import PersonalDetails from "./PersonalDetails";
import EducationDetails from "./EducationDetails";
import { useTriggerForm } from "@/components/form/hooks/useTriggerForm";
import ExperienceDetails from "./ExperienceDetails";
import SubmissionPreview from "./Preview";

const formSchema = z.object({
  personalInfo: personalInfoSchema,
  present_address: addressSchema,
  permanent_address: addressSchema,
  education: educationSchema,
  experience: experienceSchema,
  consent: consentSchema,
});

export default function JobApplicationForm() {
  type formType = z.infer<typeof formSchema>;

  const formRef = useRef<VibeFormRefType<formType>>(null);

  const triggerForm = useTriggerForm<formType>();

  const submitBtnRef = useRef<HTMLButtonElement>(
    null
  ) as React.RefObject<HTMLButtonElement>;

  function validateStep<T extends readonly string[] | string>(data: T) {
    return triggerForm(formRef.current?.form, data as []);
  }

  return (
    <VibeForm
      ref={formRef}
      schema={formSchema}
      initialValuse={formInitialValues}
      onSubmit={(values) => {
        alert(JSON.stringify(values));
        setTimeout(() => window.location.reload(), 1000);
      }}
      mode='onChange'
    >
      <StepArea submitBtnRef={submitBtnRef}>
        <Step validate={() => validateStep(firstStepFields)}>
          <PersonalDetails />
        </Step>
        <Step validate={() => validateStep(secondStepFields)}>
          <EducationDetails />
        </Step>
        <Step validate={() => validateStep(thirdStepFields)}>
          <ExperienceDetails />
        </Step>
        <Step>
          <SubmissionPreview />
        </Step>
      </StepArea>
      <button type='submit' ref={submitBtnRef} hidden>
        Submit
      </button>
    </VibeForm>
  );
}
