import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { ReactElement } from "react";
import { FieldValues, Path, useFormContext } from "react-hook-form";

type Props<T extends FieldValues> = {
  name: Path<T>;
  options: { label: string; value: string }[];
  label?: string;
  description?: string;
  onChange?: () => void;
  required?: boolean;
  className?: string;
};

/**
 *
 * @param {Object}props - Props for the RadioField component
 * @param props.name - The name of the field in the form
 * @param props.options - Array of options for the radio buttons, each with a label and value
 * @param props.label - The label for the radio field
 * @param props.description - A description for the radio field
 * @param props.onChange - Optional onChange handler for the radio group
 * @param props.required - Whether the field is required
 * @param props.className - Additional CSS classes for styling the radio group
 * @example
 * <RadioField
 *   name="gender"
 *   options={[
 *     { label: "Male", value: "male" },
 *     { label: "Female", value: "female" },
 *   ]}
 * />
 * @description
 * The RadioField component is a customizable radio button input field for forms.
 * It integrates with React Hook Form for form state management and validation.
 * The component allows users to select one option from a set of radio buttons, with support for labels, descriptions, and required validation.
 * It can also display validation messages and is designed to be reusable across different forms within a React application.
 * The component is styled using Tailwind CSS and can be customized with additional class names.
 * It provides a user-friendly interface for selecting options, making it suitable for various use cases.
 * @returns {JSX.Element} - The radio field component
 */

export default function RadioField<T extends FieldValues>(
  props: Props<T>
): ReactElement {
  const { name, label, description, onChange, options, required, className } =
    props;
  const control = useFormContext();

  return (
    <FormField
      control={control.control}
      name={name}
      render={({ field }) => (
        <FormItem className='space-y-3'>
          {label && (
            <FormLabel>
              {label} {required && <span className='text-red-500'>*</span>}
            </FormLabel>
          )}
          <FormControl>
            <RadioGroup
              onValueChange={onChange || field.onChange}
              defaultValue={field.value}
              className={cn("flex", className)}
            >
              {options.map((item) => (
                <FormItem
                  key={item.label}
                  className='flex items-center space-x-0 space-y-0'
                >
                  <FormLabel
                    className='font-normal cursor-pointer'
                    htmlFor={item.value}
                  >
                    <FormControl>
                      <RadioGroupItem id={item.value} value={item.value} />
                    </FormControl>
                    {item.label}
                  </FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage className='text-xs text-left' />
          {description && <FormDescription>{description}</FormDescription>}
        </FormItem>
      )}
    />
  );
}
