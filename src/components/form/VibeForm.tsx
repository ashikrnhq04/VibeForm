import { ReactNode, Ref, useImperativeHandle } from "react";
import { Form } from "../ui/form";
import {
  Control,
  DefaultValues,
  FieldValues,
  FormState,
  Path,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import StepProvider from "@/provider/StepProvider";

export type VibeFormRefType<T extends FieldValues> = {
  getValues: () => T;
  reset: (values?: Partial<T>) => void;
  setValue: (name: keyof T, value: T[keyof T]) => void;
  formState: FormState<T>;
  control: Control<T>;
  form: UseFormReturn<T>;
};

export type fromPropsType<TSchema extends ZodType> = {
  schema: TSchema;
  initialValuse: Partial<z.infer<TSchema>>;
  onSubmit: SubmitHandler<z.infer<TSchema>>;
  children: ReactNode;
  mode?: "onChange" | "onBlur" | "onSubmit" | "all";
  ref: Ref<VibeFormRefType<z.infer<TSchema>>>;
};

/**
 *
 * @param schema The Zod schema for the Form
 * @param initialValues Initial values for the Form
 * @param onSubmit The submit handler to be used in the hook Form
 * @param children Childrens to be render within the Form boundery
 * @param mode Mode of the Form documented in react-hook-form. Default onChange
 * @param ref The ref value for the Form
 */

export default function VibeForm<TSchema extends ZodType>(
  props: fromPropsType<TSchema>
) {
  const {
    mode = "onChange",
    schema,
    onSubmit,
    initialValuse,
    children,
    ref,
  } = props;

  const form = useForm<z.infer<TSchema>>({
    resolver: zodResolver(schema),
    defaultValues: initialValuse as DefaultValues<TSchema>,
    mode,
  });

  useImperativeHandle(ref, () => {
    type TFormValues = z.infer<TSchema>;

    return {
      getValues: form.getValues,
      reset: (values?: Partial<TFormValues>) =>
        form.reset(values as TFormValues),
      setValue: (
        name: keyof TFormValues,
        value: TFormValues[keyof TFormValues]
      ) => form.setValue(name as Path<TFormValues>, value),
      formState: form.formState,
      control: form.control,
      form: form,
    };
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>{children}</form>
    </Form>
  );
}
