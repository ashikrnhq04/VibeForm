import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { FieldValues, Path, useFormContext } from "react-hook-form";

type textFieldPropsType<T extends FieldValues> = {
  name: Path<T>;
  type: "text" | "email" | "number";
  label?: string;
  placeholder?: string;
  className?: string;
};

export default function TextField<T extends FieldValues>({
  name,
  label,
  placeholder,
  type = "text",
  className,
}: textFieldPropsType<T>) {
  const control = useFormContext<T>();

  return (
    <FormField
      control={control.control}
      name={name}
      render={({ field }) => (
        <FormItem className={`w-full ${cn(className)}`}>
          <div className='flex justify-start items-start flex-col space-y-1'>
            <FormLabel className={`capitalize pt-2 min-h-[24px]`}>
              {label || <span className='invisible'>Placeholder</span>}
            </FormLabel>
            <FormControl>
              <Input type={type} placeholder={placeholder} {...field} />
            </FormControl>
            <FormMessage className='text-xs text-red-500' />
          </div>
        </FormItem>
      )}
    />
  );
}
