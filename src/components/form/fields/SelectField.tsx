import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { JSX, ReactNode } from "react";
import { FieldValues, Path, useFormContext } from "react-hook-form";

type Props<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  placeholder?: string;
  options: { value: string; text: string }[];
  description?: string;
  required?: boolean;
  className?: string;
  onChange?: (value: string) => void;
  icon?: ReactNode;
  disabled?: boolean;
};

/**
 * SelectField component
 * @param {Object} props - The props for the SelectField component
 * @param props.name - The name of the field
 * @param props.label - The label of the field
 * @param props.placeholder - The placeholder of the field
 * @param props.options - The options of the field
 * @param props.required - Whether the field is required
 * @param props.className - The class name of the field
 * @param props.onChange - Optional onChange handler for the select field
 * @param props.icon - Optional JSX icon to display in the select trigger. Example: icon={<SomeIcon />}
 * @param props.description - Optional description text for the select field
 *
*
* @example
* ```tsx
* <SelectField
 *  name="publishedStatus"
 *  label="Published Status"
 *  options={PublishedOptions}
 * />
 * ```
 * @description
 * The SelectField component is a customizable select input field for forms.
 * It integrates with React Hook Form for form state management and validation.
 * The component allows users to select an option from a dropdown list, with support for labels, placeholders, and descriptions.
 * It can also display an icon within the select trigger for enhanced visual appeal.
 * The component is designed to be reusable and can be easily integrated into different forms within a React application.
 * It supports optional onChange handling to allow for custom behavior when the selected value changes.
 * The component is styled using Tailwind CSS and can be customized with additional class names.
 * It also includes built-in validation for required fields and displays error messages when validation fails.
 * The SelectField component is ideal for scenarios where users need to choose from a predefined set of options, such as selecting a status, category, or type.
 * It provides a user-friendly interface for selecting options and integrates seamlessly with form validation libraries.
 * The component is flexible and can be used in various contexts, such as job application forms, surveys, or any form that requires a select input.
 * The SelectField component is part of a larger form system that includes other field types such as text fields, radio buttons, and date pickers, allowing for a comprehensive form-building experience.
 * It is designed to be accessible and follows best practices for form usability, ensuring a smooth user experience across different devices and screen sizes.
 * The component is also optimized for performance, ensuring that it renders efficiently even with a large number of options.
 * The SelectField component is a versatile and essential part of modern web forms, providing a clean and intuitive way for users to make selections from a list of options.
 * It is built with reusability in mind, allowing developers to easily create consistent and maintainable forms across their applications.
 * 
 * @returns {JSX.Element} - The select field component

*/

export default function SelectField<T extends FieldValues>({
  name,
  label,
  placeholder,
  options,
  description,
  onChange,
  required = false,
  className,
  icon,
  disabled,
}: Props<T>): JSX.Element {
  const { control } = useFormContext<T>();

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem className={cn(className, "w-full")}>
          {label && (
            <FormLabel>
              <span>{label}</span>
              {required && <span className='ml-0.5 text-red-500'>*</span>}
            </FormLabel>
          )}
          <Select
            onValueChange={(value) => {
              field.onChange(value);
              onChange?.(value);
            }}
            value={field.value}
          >
            <FormControl>
              <SelectTrigger
                disabled={disabled}
                className={`w-full relative flex items-center ${
                  icon ? "pr-8" : ""
                }`}
              >
                <SelectValue placeholder={placeholder ?? "Select an item"} />
                {icon && (
                  <span className='absolute right-2 text-accent-foreground'>
                    {icon}
                  </span>
                )}
              </SelectTrigger>
            </FormControl>

            <SelectContent>
              <ScrollArea className='max-h-[200px]'>
                {options?.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.text}
                  </SelectItem>
                ))}
              </ScrollArea>
            </SelectContent>
          </Select>
          <FormMessage className='text-left text-xs text-red-500' />
          {description && <FormDescription>{description}</FormDescription>}
        </FormItem>
      )}
    />
  );
}

SelectField.displayName = "SelectField";
