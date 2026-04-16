import React from "react";
import { useForm, DefaultValues, FieldValues, SubmitHandler } from "react-hook-form";
import { motion } from "framer-motion";

export interface FormProps<T extends FieldValues> {
  onSubmit: SubmitHandler<T>;
  defaultValues?: DefaultValues<T>;
  children: (methods: ReturnType<typeof useForm<T>>) => React.ReactNode;
  className?: string;
}

export const Form = <T extends FieldValues>({
  onSubmit,
  defaultValues,
  children,
  className = "",
}: FormProps<T>) => {
  const methods = useForm<T>({ defaultValues });

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onSubmit={methods.handleSubmit(onSubmit)}
      className={`flex flex-col gap-4 ${className}`}
    >
      {children(methods)}
    </motion.form>
  );
};
