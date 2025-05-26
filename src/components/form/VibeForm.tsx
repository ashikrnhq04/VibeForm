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

export type VibeFormRefType<T extends FieldValues> = {
  getValues: () => T;
  reset: (values?: Partial<T>) => void;
  setValue: (name: keyof T, value: T[keyof T]) => void;
  formState: FormState<T>;
  control: Control<T>;
  form: UseFormReturn<T>;
  getErrors: FormState<T>["errors"];
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
 * @returns A Form component that can be used to render the Form with the given schema and initial values
 * @example
 * <VibeForm
 *  schema={mySchema}
 * initialValuse={myInitialValues}
 * onSubmit={mySubmitHandler}
 * mode="onChange"
 * ref={formRef}
 * >
 * <StepArea submitBtnRef={submitBtnRef}>
 *   <Step>
 * <TextField name="firstName" label="First Name" />
 *   </Step>
 *   <Step>
 * <TextField name="lastName" label="Last Name" />
 *   </Step>
 * </VibeForm>
 * @description
 * The VibeForm component is a wrapper around the react-hook-form library that integrates Zod for schema validation.
 * It provides a convenient way to create forms with validation, default values, and submission handling.
 * The component uses the useForm hook from react-hook-form and the zodResolver for schema validation.
 * It allows you to define a form schema using Zod, set initial values, and handle form submission with a callback function.
 * The component also exposes methods to get form values, reset the form, set individual field values, and access form state and errors.
 * This component is useful for building forms in React applications with strong type safety and validation using Zod.
 * It simplifies form management by providing a consistent interface for handling form state, validation, and submission.
 * It is designed to be reusable and can be easily integrated into different parts of a React application.
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

  type formType = z.infer<typeof schema>;

  const form = useForm<formType>({
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
      getErrors: form.formState.errors,
    };
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>{children}</form>
    </Form>
  );
}
