import { Plus } from "lucide-react";
import EducationCard from "./EducationCard";
import { JSX, useEffect } from "react";
import FieldsArray from "@/components/form/FieldsArray";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function EducationDetails(): JSX.Element {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Educational Information</CardTitle>
      </CardHeader>
      <CardContent>
        <FieldsArray name='education' limit={4}>
          {({ fields, append, remove, isLimitReached, limit }) => (
            <div className='flex items-center flex-col gap-2'>
              {fields.length === 0 ? (
                <div
                  className='flex-1 rounded-md h-[600px] w-full p-6 border-dashed border-2 items-center flex justify-center mb-12 cursor-pointer'
                  onClick={() => {
                    if (isLimitReached) return;
                    append({
                      group: "",
                      examination: "",
                      passing_year: "",
                      result: "",
                    });
                  }}
                >
                  <button
                    className='flex flex-col space-y-2 h-auto items-center p-4 bg-gray-100 rounded-2xl cursor-pointer'
                    type='button'
                  >
                    <Plus />
                    <span>Add Education Details</span>
                  </button>
                </div>
              ) : (
                <>
                  {fields.map((field, index) => (
                    <EducationCard
                      key={field.id}
                      index={index}
                      onRemove={() => remove(index)}
                    />
                  ))}
                  <Button
                    className='text-black bg-gray-100 hover:bg-gray-100 rounded-lg cursor-pointer'
                    type='button'
                    disabled={isLimitReached}
                    onClick={() => {
                      if (isLimitReached) return;
                      append({
                        group: "",
                        examination: "",
                        passing_year: "",
                        result: "",
                      });
                    }}
                  >
                    <Plus size={16} />
                    <span>Add More</span>
                  </Button>
                  {isLimitReached && (
                    <p className='text-center p-2'>
                      Can't add more than {limit}
                    </p>
                  )}
                </>
              )}
            </div>
          )}
        </FieldsArray>
        {errors?.education?.message && (
          <p className='text-center p-2 text-red-500'>
            {errors?.education?.message as string}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
