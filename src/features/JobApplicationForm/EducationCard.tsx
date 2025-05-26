import { EducationType } from "./schema";
import { TextField } from "@/components/form/fields/TextField";
import SelectField from "@/components/form/fields/SelectField";
import { useFormContext } from "react-hook-form";
import { JSX } from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

const ageCap = 32;
const arrayYears = Array.from({ length: ageCap }, (_, i) => ({
  text: `${new Date().getFullYear() - 1 - i}`,
  value: `${new Date().getFullYear() - 1 - i}`,
}));

type Props = {
  index: number;
  onRemove: () => void;
};

export default function EducationCard({ index, onRemove }: Props): JSX.Element {
  type formType = { education: EducationType };

  const { watch } = useFormContext<formType>();

  const result = watch(`education.${index}.result`);

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
          <SelectField<formType>
            name={`education.${index}.examination`}
            label='Exam'
            options={[
              { text: "SSC", value: "ssc" },
              { text: "HSC", value: "hsc" },
              { text: "Graduation", value: "graduation" },
              { text: "Post Graduation", value: "post_graduation" },
            ]}
            placeholder='Select Exam'
          />
          <SelectField<formType>
            name={`education.${index}.group`}
            label='Group'
            options={[
              { text: "Science", value: "science" },
              { text: "Business", value: "business" },
              { text: "Arts", value: "arts" },
            ]}
            placeholder='Select Group'
          />
        </div>
        <div className='w-full flex gap-4 items-start'>
          <SelectField<formType>
            name={`education.${index}.passing_year`}
            label='Passing Year'
            options={arrayYears}
            placeholder='Select Passing Year'
          />
          <SelectField<formType>
            name={`education.${index}.result`}
            label='Result (Division/GPA)'
            options={[
              { text: "First", value: "first" },
              { text: "Second", value: "second" },
              { text: "Third", value: "third" },
              { text: "GPA", value: "gpa" },
            ]}
            placeholder='Select Result'
          />
        </div>
        <div className='w-full flex gap-4 items-start'>
          {result == "gpa" && (
            <SelectField<formType>
              name={`education.${index}.gpa_scale`}
              label='GPA Scale'
              options={[
                { text: "Out of 4", value: "4" },
                { text: "Out of 5", value: "5" },
              ]}
              placeholder='Select GPA Scale'
            />
          )}
          {result == "gpa" && (
            <TextField<formType>
              name={`education.${index}.gpa_point`}
              label='GPA'
              placeholder='Specify GPA'
            />
          )}
        </div>
      </div>
    </>
  );
}
