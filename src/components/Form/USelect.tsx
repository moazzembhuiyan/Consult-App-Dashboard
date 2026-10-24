import { Select } from "antd";
import { Form } from "antd";
import type { CSSProperties, ReactNode } from "react";
import type { SelectProps } from "antd";
import { Controller, type FieldValues } from "react-hook-form";

type USelectProps = {
  name: string;
  label?: ReactNode;
  placeholder?: string;
  options?: SelectProps["options"];
  size?: SelectProps["size"];
  defaultValue?: SelectProps["defaultValue"];
  showSearch?: boolean;
  mode?: SelectProps["mode"];
  filterOption?: SelectProps["filterOption"];
  style?: CSSProperties;
  labelStyles?: CSSProperties;
};

const USelect = ({
  name,
  label,
  placeholder,
  options,
  size,
  defaultValue,
  showSearch,
  mode,
  filterOption,
  style,
  labelStyles = {},
}: USelectProps) => {
  return (
    <Controller
      name={name}
      render={({
        field: { onChange, value: fieldValue },
        fieldState: { error },
      }) => (
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
        >
          <Select
            mode={mode}
            filterOption={filterOption}
            showSearch={showSearch}
            value={fieldValue || defaultValue}
            size={size}
            options={options}
            onChange={onChange}
            placeholder={placeholder}
            style={{ ...style, height: style?.height || "35px" }}
          />
        </Form.Item>
      )}
    />
  );
};

export default USelect;
