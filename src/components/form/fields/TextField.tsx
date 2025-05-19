import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { FieldValues, Path, useFormContext } from "react-hook-form";

type textFieldPropsType<T extends FieldValues> = {
  name: Path<T>;
  type: "text" | "email" | "number";
  label?: string;
  placeholder?: string;
  className?: string;
  desciption?: string;
  required?: boolean;
  icon?: ReactNode;
};

export function TextField<T extends FieldValues>({
  name,
  label,
  placeholder,
  type = "text",
  desciption,
  className,
  required,
  icon,
}: textFieldPropsType<T>) {
  const control = useFormContext<T>();

  return (
    <FormField
      control={control.control}
      name={name}
      render={({ field }) => (
        <FormItem className={`w-full ${cn(className)}`}>
          <div className='flex justify-start items-start flex-col space-y-1'>
            <FormLabel
              className={`capitalize ${
                !label && !required ? "min-h-[13px]" : ""
              }`}
            >
              {label}
              {required && <span className='ml-0.5 text-red-500'>*</span>}
            </FormLabel>

            <FormControl>
              <div className='w-full relative flex items-center'>
                <Input
                  type={type}
                  placeholder={placeholder}
                  {...field}
                  className={`${icon ? "pr-8" : ""}`}
                />
                {icon && (
                  <span className='absolute right-1 text-accent-foreground'>
                    {icon}
                  </span>
                )}
              </div>
            </FormControl>

            <FormMessage className='text-xs text-red-500' />
            {desciption && <FormDescription>{desciption}</FormDescription>}
          </div>
        </FormItem>
      )}
    />
  );
}
