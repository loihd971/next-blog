import React, { useState } from "react";
import dynamic from "next/dynamic";

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

type Props = {};

function CustomRichEditor({ onChange }: Props | any) {
  const [value, setValue] = useState(undefined);

  const handleChangeEditorState = (value: any) => {
    setValue(value);
    onChange(value);
    
  };
  return (
    <QuillNoSSRWrapper
      value={value}
      modules={modules}
      formats={formats}
      onChange={handleChangeEditorState}
      theme="snow"
    />
  );
}

export default CustomRichEditor;
