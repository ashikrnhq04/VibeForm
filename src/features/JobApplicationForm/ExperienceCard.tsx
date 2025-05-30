import { ExperienceType } from "./schema";
import { TextField } from "@/components/form/fields/TextField";
import { useFormContext } from "react-hook-form";
import { JSX, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { DateField } from "@/components/form/fields/DateField";
import TextAreaField from "@/components/form/fields/TextAreaField";
import CheckboxField from "@/components/form/fields/CheckboxField";
import { wordCount } from "@/lib/utils";

type Props = {
  index: number;
  onRemove: () => void;
};

export default function ExperienceCard({
  index,
  onRemove,
}: Props): JSX.Element {
  type formType = { experience: ExperienceType };

  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<formType>();

  const currentlyWork = watch(`experience.${index}.currentlyWorking`);
  const jobDescription = watch(`experience.${index}.jobDescription`);

  const limit = 500;
  const writtenWords = wordCount(jobDescription);

  useEffect(() => {
    if (currentlyWork) {
      setValue(`experience.${index}.endDate`, null);
    }
  }, [currentlyWork, index, setValue]);

  return (
    <>
      <div className='flex justify-between w-full items-center py-2 mb-4 border-b-black border-b-2'>
        <h2 className='font-bold'>Exam {index + 1}</h2>
        <Button
          size='icon'
          className='cursor-pointer rounded'
          type='button'
          onClick={onRemove}
        >
          <Trash2 />
        </Button>
      </div>
      <div className='flex gap-4 flex-col w-full'>
        <div className='w-full flex gap-4 items-start'>
          <TextField<formType>
            name={`experience.${index}.jobTitle`}
            label='Job Title'
            placeholder='Positon'
            required
            hasError={!!errors.experience?.[index]?.jobTitle}
          />
          <TextField<formType>
            name={`experience.${index}.company`}
            label='Company Name'
            placeholder='Company Name'
            required
            hasError={!!errors.experience?.[index]?.company}
          />
        </div>

        <div className='w-full flex gap-0.5 flex-col items-start'>
          <div className='w-full flex flex-1 justify-end'>
            <CheckboxField
              name={`experience.${index}.currentlyWorking`}
              label={
                <span className='font-normal text-xs'>
                  I'm currently working in this role.
                </span>
              }
            />
          </div>
          <div className='flex gap-4 items-start w-full'>
            <DateField<formType>
              name={`experience.${index}.startingDate`}
              label='Start Date'
              placeholder='Select starting date'
              required
            />

            <DateField<formType>
              name={`experience.${index}.endDate`}
              label='End Date'
              placeholder='Select end date'
              disabled={currentlyWork}
            />
          </div>
        </div>
        <div className='w-full flex gap-1 items-start flex-col '>
          <TextAreaField<formType>
            className='h-32'
            name={`experience.${index}.jobDescription`}
            label='Job Description'
            placeholder='Write Responsibilities'
          />
          <p className='text-right self-end text-slate-400'>
            {writtenWords ?? 0} / {limit}
          </p>
        </div>
      </div>
    </>
  );
}
