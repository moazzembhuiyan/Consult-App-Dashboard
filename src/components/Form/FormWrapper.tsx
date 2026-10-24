"use client";

import { Form } from "antd";
import { useEffect } from "react";
import {
  FormProvider,
  useForm,
  type FieldValues,
  type Resolver,
} from "react-hook-form";
import type { ReactNode } from "react";

type FormWrapperProps = {
  onSubmit?: (data: FieldValues) => void;
  children: ReactNode;
  defaultValues?: FieldValues;
  resolver?: Resolver<FieldValues>;
};

export default function FormWrapper({
  onSubmit,
  children,
  defaultValues,
  resolver,
}: FormWrapperProps) {
  const methods = useForm<FieldValues>({ defaultValues, resolver });

  useEffect(() => {
    if (defaultValues) {
      // Set default values after form is mounted
      methods.reset(defaultValues);
    }
  }, [defaultValues, methods]);

  const handleSubmit = (data: FieldValues) => {
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
