import { Form, Input } from "antd";
import React from "react";
import type { CSSProperties, ReactNode } from "react";
import { Controller, type FieldValues } from "react-hook-form";
const { TextArea } = Input;

type UTextAreaProps = {
  name: string;
  label?: ReactNode;
  labelStyles?: CSSProperties;
  placeholder?: string;
  maxLength?: number;
  minRows?: number;
  style?: CSSProperties;
};

export default function UTextArea({
  name,
  label,
  labelStyles = {},
  placeholder,
  maxLength,
  minRows = 5,
  style,
}: UTextAreaProps) {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item
          label={
            Object.keys(labelStyles)?.length > 0 ? (
              <label htmlFor={name} style={labelStyles}>
                {label}
              </label>
            ) : (
              label
            )
          }
          validateStatus={error ? "error" : ""}
          help={error ? error.message : ""}
        >
          <TextArea
            {...field}
            id={name}
            placeholder={placeholder}
            maxLength={maxLength}
            style={style}
            showCount={true}
            autoSize={{
              minRows: minRows,
            }}
          />
        </Form.Item>
      )}
    />
  );
}
