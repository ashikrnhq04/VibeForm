import { ReactNode } from "react";
import {
  ArrayPath,
  FieldValues,
  Path,
  useFieldArray,
  UseFieldArrayReturn,
  useFormContext,
} from "react-hook-form";

interface ExtendedFieldArray<T extends FieldValues>
  extends UseFieldArrayReturn<T, ArrayPath<T>> {
  isLimitReached: boolean;
}

type Props<T extends FieldValues> = {
  children: (field: ExtendedFieldArray<T>) => ReactNode;
  name: ArrayPath<T>;
  limit?: number;
};

export default function FieldsArray<T extends FieldValues>({
  children,
  name,
  limit,
}: Props<T>) {
  const { control, unregister } = useFormContext<T>();

  const fieldArray = useFieldArray({
    control,
    name,
  });

  const remove = (index: number | number[] | undefined) => {
    fieldArray.remove(index);
    if (fieldArray.fields.length <= 1) {
      unregister(name as Path<T>);
    }
  };
  const isLimitReached = Boolean(limit && fieldArray.fields.length >= limit);

  return children({ ...fieldArray, remove, isLimitReached });
}

FieldsArray.displayName = "FieldsArray";
