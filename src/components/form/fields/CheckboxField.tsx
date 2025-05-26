import { Checkbox } from "@/components/ui/checkbox";
import {
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";

import { ReactElement } from "react";
import { FieldValues, Path, useFormContext } from "react-hook-form";

type Props<T extends FieldValues> = {
  name: Path<T>;
  label?: string | ReactElement;
  description?: string;
  onChecked?: () => void;
  className?: string;
};

export default function CheckboxField<T extends FieldValues>(props: Props<T>) {
  const control = useFormContext();

  const { name, label, description, onChecked, className } = props;

  return (
    <>
      <FormField
        control={control.control}
        name={name}
        render={({ field }) => (
          <FormItem className={cn("flex flex-col items-start", className)}>
            <FormLabel className='cursor-pointer'>
              <FormControl>
                <Checkbox
                  className='cursor-pointer'
                  checked={field.value}
                  onCheckedChange={onChecked ?? field.onChange}
                />
              </FormControl>
              {label}
            </FormLabel>
            <FormMessage />
            {description && <FormDescription>{description}</FormDescription>}
          </FormItem>
        )}
      />
    </>
  );
}
