import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { FieldValues, Path, useFormContext } from "react-hook-form";
import { useState } from "react";

type propsType<T extends FieldValues> = {
  label?: string;
  name: Path<T>;
};

export default function DateField<T extends FieldValues>(props: propsType<T>) {
  const { label, name } = props;
  const control = useFormContext();

  const [date, setDate] = useState<Date>();

  const [open, setOpen] = useState(false);
  return (
    <FormField
      control={control.control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem className='flex flex-col'>
            <FormLabel>Date of birth</FormLabel>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[240px] pl-3 text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {date ? format(date, "PPP") : <span>{label}</span>}
                    <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className='w-auto p-0' align='start'>
                <Calendar
                  mode='single'
                  selected={field.value}
                  onSelect={(newValue) => {
                    if (newValue) {
                      calculateAge(newValue);
                    }
                    field.onChange(newValue);
                    setDate(newValue);
                    setOpen(false);
                  }}
                  disabled={(date) =>
                    date > new Date() || date < new Date("1900-01-01")
                  }
                  startMonth={new Date(0, 1990)}
                />
              </PopoverContent>
            </Popover>
            <FormDescription className='text-left'>
              Your date of birth is used to calculate your age.
            </FormDescription>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}

function calculateAge(date: Date) {
  const selectedDate = new Date(date);

  const dobYear = selectedDate.getFullYear();
  const dobMonth = selectedDate.getMonth() + 1;
  const dobDate = selectedDate.getDate();

  console.log(dobYear, dobMonth, dobDate);
}
