import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
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
};

/**
 * SelectField component
 *
 * @param {Path<T>} name - The name of the field
 * @param {string} label - The label of the field
 * @param {string} placeholder - The placeholder of the field
 * @param {Array<{ value: string, text: string }>} options - The options of the field
 * @param {boolean} required - Whether the field is required
 * @param {string} className - The class name of the field
 *
 * @returns {ReactElement} - The select field component
 *
 * @example
 * ```tsx
 * <SelectField
 *  name="publishedStatus"
 *  label="Published Status"
 *  options={PublishedOptions}
 * />
 * ```
 */

export const SelectField = <T extends FieldValues>({
  name,
  label,
  placeholder,
  options,
  description,
  onChange,
  required = false,
  className,
  icon,
}: Props<T>) => {
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
            onValueChange={onChange || field.onChange}
            value={field.value}
          >
            <FormControl>
              <SelectTrigger className='w-full relative flex items-center pr-8'>
                <SelectValue placeholder={placeholder ?? "Select an item"} />
                {icon && (
                  <span className='absolute right-2 text-accent-foreground'>
                    {icon}
                  </span>
                )}
              </SelectTrigger>
            </FormControl>

            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.text}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage className='text-left text-xs text-red-500' />
          {description && <FormDescription>{description}</FormDescription>}
        </FormItem>
      )}
    />
  );
};

SelectField.displayName = "SelectField";
