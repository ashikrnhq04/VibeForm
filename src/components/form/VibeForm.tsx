import StepProvider from "@/provider/StepProvider";
import React, { type ReactNode } from "react";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";

type fromPropsType<TSchema extends ZodType> = {
  schema: TSchema;
  children: ReactNode;
};

export default function VibeForm({ children }: { children: ReactNode }) {
  const form = useForm();
  return (
    <Form {...form}>
      <StepProvider>{children}</StepProvider>
    </Form>
  );
}
