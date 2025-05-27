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
import { JSX, ReactNode } from "react";
import { FieldValues, Path, useFormContext } from "react-hook-form";

type Props<T extends FieldValues> = {
  name: Path<T>;
  type?: "text" | "email" | "number";
  label?: string;
  placeholder?: string;
  className?: string;
  desciption?: string;
  required?: boolean;
  icon?: ReactNode;
  autoComplete?: string;
  hasError?: boolean;
};

/**
 *
 * @param {Object} props - The props for the TextField component
 * @param props.name - Name of the field in the form
 * @param props.type - Type of the input field (default: "text") email | number | text
 * @param props.label - Label for the input field
 * @param props.placeholder - Placeholder text for the input field
 * @param props.className - Additional CSS classes for styling
 * @param props.desciption - Description text for the input field
 * @param props.required - Whether the field is required (default: false)
 * @param props.icon - Optional icon to display in the input field
 * @param props.autoComplete - Auto-complete attribute for the input field
 * @example
 * <TextField
 *   name="username"
 *   label="Username"
 *   placeholder="Enter your username"
 *   required
 *   icon={<UserIcon />}
 *   autoComplete="username"
 * />
 * @returns {JSX.Element} - The rendered TextField component
 * @description A customizable text input field component for forms, supporting various input types, labels, placeholders, and optional icons.
 * The component integrates with React Hook Form for form state management and validation.
 * It allows for flexible styling and can display additional information such as descriptions and validation messages.
 * The component is designed to be reusable and can be easily integrated into different forms within a React application.
 */

export function TextField<T extends FieldValues>({
  name,
  label,
  placeholder,
  type = "text",
  desciption,
  className,
  required,
  icon,
  autoComplete,
  hasError = false,
}: Props<T>): JSX.Element {
  const control = useFormContext<T>();

  return (
    <FormField
      control={control.control}
      name={name}
      render={({ field }) => (
        <FormItem className={`w-full ${cn(className)}`}>
          <div className='flex justify-start items-start flex-col space-y-2'>
            <FormLabel htmlFor={field.name} className={`capitalize`}>
              {label}
              {required && <span className='ml-0.5 text-red-500'>*</span>}
            </FormLabel>

            <FormControl>
              <div className='w-full relative flex items-center'>
                <Input
                  id={field.name}
                  type={type}
                  placeholder={placeholder}
                  {...field}
                  className={`${icon ? "pr-8" : ""} ${
                    hasError ? "border-red-500" : ""
                  }`}
                  autoComplete={autoComplete}
                />
                {icon && (
                  <span className='absolute right-3 text-accent-foreground'>
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
