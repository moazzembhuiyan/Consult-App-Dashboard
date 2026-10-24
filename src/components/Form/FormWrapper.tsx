"use client";

import { Form } from "antd";
import { useEffect } from "react";
import {
  FormProvider,
  useForm,
  type FieldValues,
  type DefaultValues,
  type Resolver,
  type SubmitHandler,
} from "react-hook-form";
import type { ReactNode } from "react";

type FormWrapperProps<
  TFieldValues extends FieldValues,
> = {
  onSubmit?: SubmitHandler<TFieldValues>;
  children: ReactNode;
  defaultValues?: DefaultValues<TFieldValues>;
  resolver?: Resolver<any, any>;
};

export default function FormWrapper<TFieldValues extends FieldValues = FieldValues>({
  onSubmit,
  children,
  defaultValues,
  resolver,
}: FormWrapperProps<TFieldValues>) {
  const methods = useForm<TFieldValues>({ defaultValues, resolver });

  useEffect(() => {
    if (defaultValues) {
      // Set default values after form is mounted
      methods.reset(defaultValues);
    }
  }, [defaultValues, methods]);

  const handleSubmit: SubmitHandler<TFieldValues> = (data) => {
    onSubmit?.(data);
    methods.reset();
  };

  return (
    <FormProvider {...methods}>
      <Form layout="vertical" onFinish={methods.handleSubmit(handleSubmit)}>
        {children}
      </Form>
    </FormProvider>
  );
}
