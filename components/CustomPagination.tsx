import { Container, Pagination } from "@nextui-org/react";
import React from "react";

type Props = {} | any;

function CustomPagination({
  total,
  initialPage = 1,
  customCss,
  onChangePagination,
  onChangePaginationSize,
  ...rest
}: Props) {
  return (
    <Container
      display="flex"
      justify="flex-end"
      alignItems="center"
      css={{ width: "100%", padding: 0 }}
      fluid
    >
      <select
        onChange={(e) => onChangePaginationSize(e.target.value)}
        style={{
          width: "100px",
          height: "35px",
          borderRadius: "10px",
          marginTop: "10px",
          marginRight: "10px",
        }}
      >
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
      </select>
      <Pagination
        {...rest}
        initialPage={initialPage}
        css={{
          ...customCss,
        }}
        onChange={(page) => onChangePagination(page)}
        total={total}
      />
    </Container>
  );
}

export default CustomPagination;
