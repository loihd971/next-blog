import { Input, styled, useTheme } from "@nextui-org/react";
import CustomSelect from "@/components/CustomSelect";
import { PHONE_CODE } from "@/utils/phoneCode";
import { useCallback, useEffect, useState } from "react";
import { InputOnlyNumber } from "@/utils/validateField";

export const StyledContactInput = styled(Input, {
  marginBottom: "12px",
  width: "350px !important",
});

type Props = {};

const CustomPhoneInput = ({
  defaultSelectValue,
  defaultInputValue,
  onChange,
  name,
  ...rest
}: Props | any) => {
  const [isHover, setIsHover] = useState(false);
  const [selectedOption, setSelectedOption] = useState("+84");
  const [inputValue, setInputValue] = useState<any>(undefined);
  const { theme }: any = useTheme();
  const { border, gray900 } = theme?.colors;

  return (
    <div
      className="custom-phone-wrapper"
      style={{ border: `2px solid ${isHover ? gray900.value : border.value}` }}
    >
      <CustomSelect
        defaultValue={defaultSelectValue}
        className="custom-phone-select"
        onChange={(e: any) => setSelectedOption(e)}
        option={PHONE_CODE}
      />
      <Input
        initialValue={defaultInputValue}
        type="number"
        maxLength={10}
        value={inputValue}
        // onKeyDown={(e) => InputOnlyNumber(e)}
        onChange={(e: any) => {
          const fotmatInputValue = e.target.value;
          const allValue =
            fotmatInputValue && `(${selectedOption}) ${fotmatInputValue}`;
          onChange({
            target: {
              value: allValue,
              name: name,
            },
          });
        }}
        onMouseOver={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        animated={false}
        className="custom-phone-input"
      />
    </div>
  );
};

export default CustomPhoneInput;
