import Image from "next/image";
import React from "react";
import { Text } from "@nextui-org/react";

type Props = {};

function Custom404({}: Props) {
  return (
    <div className="custom__404page">
      <Text color="#000" h1>
        404
      </Text>
      <Text color="#000" h3>
        Page not found
      </Text>
      <Text color="#000" h6>
        We&apos;re fairly sure that page used to be here, but seems to have gone
        missing. We do apologise on it&apos;s behalf.
      </Text>
    </div>
  );
}

export default Custom404;
