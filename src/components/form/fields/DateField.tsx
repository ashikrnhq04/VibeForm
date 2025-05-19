import { format, getYear, setMonth, setYear } from "date-fns";
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
import { ReactNode, useState } from "react";
import { SelectField } from "./SelectField";

type propsType<T extends FieldValues> = {
  label?: string;
  name: Path<T>;
  placeholder?: string;
  startYear?: number;
  endYear?: number;
  required: boolean;
  icon?: ReactNode;
  className?: string;
  description?: string;
};

const arrayMonths = [
  { value: "January", text: "January" },
  { value: "February", text: "February" },
  { value: "March", text: "March" },
  { value: "April", text: "April" },
  { value: "May", text: "May" },
  { value: "June", text: "June" },
  { value: "July", text: "July" },
  { value: "August", text: "August" },
  { value: "September", text: "September" },
  { value: "October", text: "October" },
  { value: "November", text: "November" },
  { value: "December", text: "December" },
];

export function DateField<T extends FieldValues>(props: propsType<T>) {
  const {
    label,
    name,
    placeholder,
    startYear = getYear(new Date()) - 18,
    endYear = getYear(new Date()) - 32,
    required,
    description,
  } = props;
  const control = useFormContext();

  const [date, setDate] = useState<Date>(new Date());

  const [open, setOpen] = useState(false);

  const arrayYears = Array.from(
    { length: startYear - endYear + 1 },
    (_, i) => ({ value: `${startYear - i}`, text: `${startYear - i}` })
  );

  function handleMonthChange(month: string) {
    const clMonth = setMonth(
      date,
      arrayMonths.indexOf(
        arrayMonths.find((item) => item.value == month) ?? arrayMonths[0]
      )
    );
    setDate(clMonth);
  }

  function handleYearChange(year: string) {
    const clYear = setYear(date, parseInt(year));
    setDate(clYear);
  }

  function handleSelect(
    selectedDate: Date | undefined,
    onChange: (date: Date | undefined) => void
  ) {
    if (selectedDate) {
      onChange(selectedDate);
      setDate(selectedDate);
    }
    setOpen(false);
  }

  return (
    <FormField
      control={control.control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem className='flex flex-col w-full'>
            <FormLabel className={`capitalize ${!label ? "min-h-[13px]" : ""}`}>
              {label} {required && <span className='ml-0.5'>*</span>}
            </FormLabel>{" "}
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full pl-3 text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {!field.value
                      ? placeholder
                      : field.value && format(field.value, "PP")}

                    <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className='w-auto p-0' align='start'>
                <div className='flex gap-2 w-[250px] justify-between items-center p-2'>
                  <SelectField
                    placeholder='Month'
                    name='month'
                    onChange={handleMonthChange}
                    options={arrayMonths}
                  />
                  <SelectField
                    name='year'
                    placeholder='Year'
                    options={arrayYears}
                    onChange={handleYearChange}
                  />
                </div>
                <Calendar
                  mode='single'
                  selected={field.value}
                  onSelect={(date) => handleSelect(date, field.onChange)}
                  disabled={(date) =>
                    date > new Date() || date < new Date("1900-01-01")
                  }
                  month={date}
                  onMonthChange={setDate}
                />
              </PopoverContent>
            </Popover>
            <FormMessage className='text-left text-xs' />
            {description && (
              <FormDescription className='text-left'>
                {description}
              </FormDescription>
            )}
          </FormItem>
        );
      }}
    />
  );
}
