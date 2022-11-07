import {
  Input,
  Table,
  theme,
  Text,
  Pagination,
  useCollator,
  useAsyncList,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { FaSearch, FaSort } from "react-icons/fa";
import CustomHeaderSearch from "./CustomHeaderSearch";
import CustomPagination from "./CustomPagination";

type Props = {
  columns: Cols[];
  data: any[];
};

export type Cols = {
  title: string;
  key: string;
  dataIndex: string;
  sortable?: boolean;
  width?: string | number;
  fixed?: "right" | "left";
  filter?: boolean;
  searchtype?: "text" | "date" | "select";
  render?: (value: string, record: any) => void;
};

function CustomTable(props: any) {
  const { columns, data, onTableFilter, total, initialFilter, ...rest } = props;
  const [isFilter, setIsFilter] = useState(false);
  const [filters, setFiltes] = useState<any>(initialFilter);
  const [initialPage, setInitialPage] = useState(1);

  const handleChangeValue = (key: string, value: any) => {
    // setInitialPage(1)
    setFiltes((pre: any) => {
      let finalFilterObj: any = {};
      const filterObj = { ...pre, [key]: value };
      Object.entries(filterObj).map(([k, v]: any) => {
        finalFilterObj[k] = v || null;
      });
      return finalFilterObj;
    });
  };

  const handleChangePagination = (value: any) => {
    setFiltes((pre: any) => ({ ...pre, page: value }));
  };

  const handleChangePaginationSize = (value: any) => {
    setFiltes((pre: any) => ({ ...pre, pageSize: value }));
  };
  useEffect(() => {
    onTableFilter(filters);
  }, [filters]);

  return (
    <>
      <Table
        // aria-label="Table common"
        {...rest}
        sortDescriptor={null}
        onSortChange={async (e) => console.log(e)}
      >
        {columns?.map((col: any, _: number) => (
          <Table.Header key={col.key}>
            <Table.Column
              textValue={col.key}
              allowsSorting
              align="start"
              css={{
                minWidth: col.width,
                position: col.fixed && "sticky",
                [col.fixed]: 0,
                zIndex: 9,
                height: "100% !important",
                padding: "10px 0",
                // userSelect: "all !important",
              }}
            >
              <div>
                <Text css={{ display: "flex", alignItems: "center" }}>
                  {col.title}
                  {col.filter && (
                    <FaSearch
                      onClick={(e: any) => setIsFilter(!isFilter)}
                      style={{
                        fontSize: "13px",
                        marginLeft: "10px",
                        color: theme.colors.gray700.value,
                      }}
                    />
                  )}
                  {col.sortable && (
                    <FaSort onClick={() => console.log("rsds")} />
                  )}
                </Text>
                {col.filter && isFilter && (
                  <CustomHeaderSearch
                    searchKey={col.key}
                    searchtype={col.searchtype}
                    value={filters[col.key]}
                    onChangeValue={handleChangeValue}
                  />
                )}
              </div>
            </Table.Column>
          </Table.Header>
        ))}
        <Table.Body>
          {data.map((col: any, index: number) => (
            <Table.Row key={Math.random()}>
              {columns.map((item: any) => (
                <Table.Cell
                  key={item.key}
                  css={{
                    minWidth: col.width,
                    position: item.fixed && "sticky",
                    backdropFilter: item.fixed && "blur(10px)",
                    [item.fixed]: 0,
                    zIndex: 9,
                  }}
                >
                  {item?.render
                    ? item?.render(col[item.key], col)
                    : col[item.key]}
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      {/* <table className="custom-table-container">
        <tr>
          {columns?.map((col: any, _: number) => (
            <th key={col.key}>
              <div>
                {col.title}
                {col.filter && (
                  <FaSearch
                    onClick={(e: any) => setIsFilter(!isFilter)}
                    style={{
                      fontSize: "13px",
                      marginLeft: "10px",
                      color: theme.colors.gray700.value,
                    }}
                  />
                )}
                {col.filter && isFilter && (
                  <CustomHeaderSearch
                    searchKey={col.key}
                    searchtype={col.searchtype}
                    value={filters[col.key]}
                    onChangeValue={handleChangeValue}
                  />
                )}
              </div>
            </th>
          ))}
        </tr>
        {data.map((col: any, index: number) => (
          <tr key={index}>
            {columns.map((item: any) => (
              <td key={item.key}>
                {item?.render
                  ? item?.render(col[item.key], col)
                  : col[item.key]}
              </td>
            ))}
          </tr>
        ))}
      </table> */}
      <CustomPagination
        onChangePagination={handleChangePagination}
        onChangePaginationSize={handleChangePaginationSize}
        customCss={{ marginTop: "10px" }}
        shadow
        total={Math.ceil(total / filters.pageSize) || 1}
        initialPage={initialPage}
      />
    </>
  );
}

export default CustomTable;
