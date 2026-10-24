"use client";

import { Form, Input } from "antd";
import type { CSSProperties, ReactNode } from "react";
import { Controller, type FieldValues } from "react-hook-form";

type UOtpInputProps = {
  type?: string;
  name: string;
  label?: ReactNode;
  size?: "small" | "middle" | "large";
  placeholder?: string;
  defaultValue?: string;
  disabled?: boolean;
  labelStyles?: CSSProperties;
  className?: string;
  suffix?: ReactNode;
  style?: CSSProperties;
  max?: number;
  required?: boolean;
};

const UOtpInput = ({
  type,
  name,
  label,
  size,
  placeholder,
  defaultValue,
  disabled = false,
  labelStyles = {},
  className,
  suffix,
  style,
  max,
  required,
}: UOtpInputProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item
          className="otp-input !w-full"
          label={
            Object.keys(labelStyles)?.length > 0 ? (
              <label style={labelStyles}>{label}</label>
            ) : (
              label
            )
          }
          validateStatus={error ? "error" : ""}
          help={error ? error.message : ""}
        >
          <Input.OTP size="large" {...field} />
        </Form.Item>
      )}
    />
  );
};

export default UOtpInput;
