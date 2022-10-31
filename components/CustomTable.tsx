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

  const handleChangeValue = (key: string, value: any) => {
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
        {...rest}
        sortDescriptor={null}
        onSortChange={async (e) => console.log(e)}
      >
        {columns?.map((col: any, _: number) => (
          <Table.Header key={col.key}>
            <Table.Column
              isRowHeader={false}
              allowsSorting
              align="start"
              css={{
                minWidth: col.width,
                position: col.fixed && "sticky",
                [col.fixed]: 0,
                zIndex: 9,
                height: "100%",
                userSelect: "all !important",
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
            <Table.Row key={index}>
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
      <CustomPagination
        onChangePagination={handleChangePagination}
        onChangePaginationSize={handleChangePaginationSize}
        customCss={{ marginTop: "10px" }}
        shadow
        total={Math.ceil(total / filters.pageSize)}
        initialPage={1}
      />
    </>
  );
}

export default CustomTable;
