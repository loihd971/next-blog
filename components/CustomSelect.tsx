import { useTheme } from "@nextui-org/react";
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
  const { theme }: any = useTheme();
  return (
    <select
      style={{
        border: `2px solid ${theme.colors.border.value}`,
        color: `${theme.colors.gray700.value}`,
      }}
      defaultValue={defaultValue}
      className={`custom-select ${className}`}
      {...rest}
      onChange={(e) => onChange(e.target.value)}
    >
      {option?.map((k: any, index: any) => (
        <option key={index} value={k.value}>
          {k.value}
        </option>
      ))}
    </select>
  );
}
