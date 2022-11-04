import { Text } from "@nextui-org/react";

export const validateField = (field: string, value: any, rules: string[]) => {
  if (!value && rules.includes("required")) {
    return <Text>{`${field} is required`}</Text>;
  }
};

export function InputOnlyNumber(e: React.KeyboardEvent) {
  const specialCharRegex = new RegExp('[0-9]');
  const pressedKey = String.fromCharCode(!e.charCode ? e.which : e.charCode);
  if (!specialCharRegex.test(pressedKey)) {
    e.preventDefault();
    return false;
  }
}
