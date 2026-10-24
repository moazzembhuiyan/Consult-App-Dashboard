import { DatePicker, Form } from "antd";
import type { DatePickerProps } from "antd";
import dayjs from "dayjs";
import type { CSSProperties, ReactNode } from "react";
import { Controller, type FieldValues } from "react-hook-form";

type UDatePickerProps = {
  name: string;
  label?: ReactNode;
  size?: DatePickerProps["size"];
  placeholder?: DatePickerProps["placeholder"];
  labelStyles?: CSSProperties;
  format?: string;
  showTime?: boolean | DatePickerProps["showTime"];
  picker?: DatePickerProps["picker"];
  style?: CSSProperties;
};

const UDatePicker = ({
  name,
  label,
  size,
  placeholder,
  labelStyles = {},
  format,
  showTime = false,
  picker,
  style,
}: UDatePickerProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item
          label={
            Object.keys(labelStyles)?.length > 0 ? (
              <label style={labelStyles}>{label}</label>
            ) : (
              label && label
            )
          }
          validateStatus={error ? "error" : ""}
          help={error ? error.message : ""}
        >
          <DatePicker
            {...field}
            showTime={showTime}
            id={name}
            picker={picker}
            size={size}
            placeholder={placeholder}
            format={format}
            onChange={(date) => {
              field.onChange(date ? dayjs(date).format(format) : null);
            }}
            value={field.value ? dayjs(field.value) : null}
            style={style ? style : { height: "35px", width: "100%" }}
          />
        </Form.Item>
      )}
    />
  );
};

export default UDatePicker;
