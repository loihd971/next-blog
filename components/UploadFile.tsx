import { darkTheme } from "@/utils/theme";
import { Input, Row, simpleColors } from "@nextui-org/react";
import React, { useState } from "react";
import {
  HiOutlineCloudArrowUp,
  HiOutlineXCircle,
  HiVideoCamera,
  HiCamera,
} from "react-icons/hi2";

type Props = {
  setFile: (e: any) => void;
  videoPerc?: number;
  imgPerc?: number;
  accept: string;
  type: string;
  key?: string;
};

export default function UploadFile({
  type,
  accept,
  key,
  setFile,
  videoPerc,
  imgPerc,
}: Props) {
  const [currentfile, setCurrentFile] = useState<any>(null);

  return (
    <Row
      key={key}
      align="center"
      justify="space-between"
      css={{
        display: "flex",
        position: "relative",
        border: `dashed 2px #9a9fa2`,
        borderRadius: "10px",
        cursor: "pointer",
        padding: "2px",
      }}
    >
      <Input
        placeholder="100px"
        className="modal-upload--input__video"
        type="file"
        fullWidth
        accept={accept}
        onChange={(e: any) => {
          setFile(e.target.files[0]);
          setCurrentFile(e.target.files[0]);
        }}
      />
      {type === "video" ? (
        <HiVideoCamera
          style={{
            fontSize: "30px",
            position: "absolute",
            left: "35px",
          }}
        ></HiVideoCamera>
      ) : (
        <HiCamera
          style={{
            fontSize: "30px",
            position: "absolute",
            left: "35px",
          }}
        ></HiCamera>
      )}

      <span
        style={{
          position: "absolute",
          left: "80px",
          fontSize: "12px",
          display: "flex",
          alignItems: "center",
        }}
      >
        {currentfile?.name.slice(0, 20)}
        {currentfile?.name && "..."}
        {/* {currentfile?.name && (
          <HiOutlineXCircle
            style={{
              fontSize: "15px",
              marginLeft: "10px",
              color: "red",
            }}
            onClick={() => {
              setCurrentFile(null);
              setFile(null);
            }}
          />
        )} */}
      </span>

      <span
        style={{
          position: "absolute",
          right: "35px",
        }}
      >
        {type === "video" && `${Number(videoPerc).toFixed(2)} %`}
        {type === "image" && `${Number(imgPerc).toFixed(2)} %`}
      </span>
    </Row>
  );
}
