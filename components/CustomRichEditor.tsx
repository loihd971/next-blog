import React, { useState, useMemo, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import { modules, formats } from "@/utils/editorToolbar";
const QuillNoSSRWrapper: any = dynamic(() =>import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

type Props = {};

function CustomRichEditor({
  onChange,
  onClear,
  currentValue,
  disabled,
  type,
  ...rest
}: Props | any) {
  const [value, setValue] = useState(currentValue);

  const finalValue = useMemo(() => {
    return value;
  }, [value, currentValue]);

  const handleChangeEditorState = (value: any) => {
    setValue(value);
    onChange(value);
  };

  return (
    <QuillNoSSRWrapper
      readOnly={disabled}
      {...rest}
      value={finalValue}
      modules={modules}
      formats={formats}
      onChange={handleChangeEditorState}
      theme="snow"
    />
  );
}

export default CustomRichEditor;
