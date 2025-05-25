import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { JSX } from "react";
import { FieldValues, useFormContext, Path } from "react-hook-form";

type Props<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  placeholder?: string;
  description?: string;
  className?: string;
  required?: boolean;
  autoComplete?: string;
};

/**
 *
 * @param {Object} props - Props for the TextAreaField component
 * @param props.name - The name of the field in the form
 * @param props.label - The label for the text area
 * @param props.placeholder - The placeholder text for the text area
 * @param props.description - A description for the text area
 * @param props.className - Additional CSS classes for styling
 * @param props.required - Whether the field is required
 * @param props.autoComplete - The auto-complete attribute for the text area
 * @example
 * <TextAreaField
 *   name="comments"
 *   label="Comments"
 *  placeholder="Enter your comments here"
 *  description="Please provide your feedback"
 *  required
 *  autoComplete="address-line1"
 *  className="my-custom-class"
 * icon={<SomeIcon />} // Optional icon to display in the text area
 * />
 * @description
 * The TextAreaField component is a customizable text area input field for forms.
 * It integrates with React Hook Form for form state management and validation.
 * The component allows users to enter multi-line text input, with support for labels, placeholders, and descriptions.
 * It can also display validation messages and is designed to be reusable across different forms within a React application.
 * The component is styled using Tailwind CSS and can be customized with additional class names.
 * @returns {JSX.Element} - The text area field component
 */

export default function TextAreaField<T extends FieldValues>(
  props: Props<T>
): JSX.Element {
  const control = useFormContext();

  const {
    name,
    label,
    placeholder,
    description,
    className,
    required,
    autoComplete,
  } = props;
  return (
    <FormField
      control={control.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("w-full", className)}>
          <FormLabel className={`capitalize`}>
            {label}
            {required && <span className='ml-0.5 text-red-500'>*</span>}
          </FormLabel>
          <FormControl>
            <Textarea
              {...field}
              className={cn(className)}
              placeholder={placeholder}
              autoComplete={autoComplete}
            ></Textarea>
          </FormControl>
          <FormMessage className='text-left text-xs' />
          {description && <FormDescription>{description}</FormDescription>}
        </FormItem>
      )}
    />
  );
}
