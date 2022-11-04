import React from "react";

interface SelectOption {
  value: string;
  label: string;
  id?: string;
}

type Props = {
  option: SelectOption[];
  onChange: (value: string | any) => void;
};

export default function CustomSelect({
  option = [],
  onChange,
  className,
  defaultValue,
  ...rest
}: Props | any) {
  return (
    <select
    defaultValue={defaultValue}
      className={`custom-select ${className}`}
      {...rest}
      onChange={(e) => onChange(e.target.value.replace("+", ""))}
    >
      {option?.map((k: any, _: any) => (
        <option key={k.value} value={k.value}>
          {k.value}
        </option>
      ))}
    </select>
  );
}
