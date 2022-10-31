import { Text } from "@nextui-org/react";

export const validateField = (field: string, value: any, rules: string[]) => {
  if (!value && rules.includes("required")) {
    return <Text>{`${field} is required`}</Text>;
  }
};
