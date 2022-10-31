import { Input } from "@nextui-org/react";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

type Props = {
  searchKey: string;
  searchtype: "text" | "date" | "select";
  value: any;
  onChangeValue: (key: string, value: any) => void;
};

function CustomHeaderSearch({
  searchtype,
  value,
  searchKey,
  onChangeValue,
  ...rest
}: Props) {
  const [currentValue, setCurrentValue] = useState<any>(value);
  return (
    <>
      {searchtype === "text" && (
        <Input
          bordered
          {...rest}
          clearable
          value={currentValue}
          onClearClick={() => onChangeValue(searchKey, null)}
          onChange={(e) => {
            setCurrentValue(e.target.value);
          }}
        />
      )}
      {searchtype === "date" && (
        <Input
          bordered
          {...rest}
          type="date"
          clearable
          value={currentValue}
          onClearClick={() => onChangeValue(searchKey, null)}
          onChange={(e) => {
            setCurrentValue(e.target.value);
          }}
        />
      )}
      <FaSearch
        style={{ fontSize: "15px", marginTop: "5px", marginLeft: "5px" }}
        onClick={() => onChangeValue(searchKey, currentValue)}
      />
    </>
  );
}

export default CustomHeaderSearch;
