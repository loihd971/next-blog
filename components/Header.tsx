import React from "react";

import useTrans from "../pages/hooks/useTranslate.js";

type Props = {};

function Header({}: Props) {
  const trans = useTrans();
  return <div> {trans.home.title}</div>;
}

export default Header;
