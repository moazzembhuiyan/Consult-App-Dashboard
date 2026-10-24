"use client";

import { Form, Input } from "antd";
import type { CSSProperties, ReactNode } from "react";
import {
  Controller,
  type FieldValues,
  type RegisterOptions,
} from "react-hook-form";

type UInputProps = {
  type?: string;
  rules?: RegisterOptions<FieldValues>;
  name: string;
  label?: ReactNode;
  size?: "small" | "middle" | "large";
  placeholder?: string;
  defaultValue?: string | number;
  disabled?: boolean;
  labelStyles?: CSSProperties;
  className?: string;
  suffix?: ReactNode;
  style?: CSSProperties;
  max?: number;
  min?: number;
  step?: number;
  required?: boolean;
};

const UInput = ({
  type,
  rules,
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
  min,
  required,
}: UInputProps) => {
  return (
    <Controller
      name={name}
      rules={rules} // ✅ rules must go here
      render={({ field, fieldState: { error } }) => (
        <Form.Item
          label={
            Object.keys(labelStyles)?.length > 0 ? (
              <label style={labelStyles}>{label}</label>
            ) : (
              label
            )
          }
          validateStatus={error ? "error" : ""}
          help={error ? error.message : ""}
          required={required}
        >
          {type === "password" ? (
            <Input.Password
              {...field}
              type={type}
              id={name}
              size={size}
              placeholder={placeholder}
              className={`h-9 ${className}`}
              disabled={disabled}
            />
          ) : (
            <Input
              {...field}
              type={type}
              id={name}
              size={size}
              placeholder={placeholder}
              disabled={disabled}
              className={`h-9 ${className}`}
              suffix={suffix}
              style={style}
              max={max}
              min={min}
              // optional: prevent typing negative numbers for number inputs
              onKeyDown={(e) => {
                if (type === "number" && (e.key === "-" || e.key === "e")) {
                  e.preventDefault();
                }
              }}
            />
          )}
        </Form.Item>
      )}
    />
  );
};

export default UInput;
