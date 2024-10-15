import React, { useMemo, useState } from "react";
import moment from "moment/moment"

import {
  Box,
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  IconButton,
} from "@chakra-ui/react";

// Icons
import {
  MdChevronLeft,
  MdChevronRight,
  MdFirstPage,
  MdLastPage,
} from "react-icons/md";

import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

export default function SaleTable(props) {
  const {
    columnsData,
    tableData: tableData,
  } = props;

  // Chakra Color Mode
  const boxColor = useColorModeValue("white !important", "#111C44 !important");
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");

  const columns = useMemo(() => columnsData, [columnsData]);


  const tableInstance = useTable(
    {
      columns,
      data: tableData,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    initialState,
    gotoPage,
    previousPage,
    nextPage,
    canPreviousPage,
    canNextPage,
    state,
    pageCount,
  } = tableInstance;
  initialState.pageSize=5 

  return (
    <Box>
      <Box bg={boxColor} borderRadius="25px" h="40vh" overflowY="auto">
        <Flex
          px="25px"
          pt="20px"
          justify="space-between"
          mb="20px"
          align="center"
        >
          <Text
            color={textColor}
            fontSize="22px"
            fontWeight="700"
            lineHeight="100%"
          >
            Sale History
          </Text>
        </Flex>
        <Table {...getTableProps()} variant="simple" color="gray.500" mb="15px">
          <Thead>
            {headerGroups.map((headerGroup, index) => (
              <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column, index) => (
                  <Th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    pe="10px"
                    key={index}
                    borderColor={borderColor}
                  >
                    <Flex
                      justify="space-between"
                      align="center"
                      fontSize={{ sm: "10px", lg: "12px" }}
                      color="gray.400"
                    >
                      {column.render("Header")}
                    </Flex>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {page.map((row, index) => {
              prepareRow(row);
              return (
                <Tr {...row.getRowProps()} key={index}>
                  {row.cells.map((cell, index) => {
                    let data = "";
                    if (cell.column.Header === "PRODUCT NAME") {
                      data = (
                        <Flex align="center">
                          <Text
                            color={textColor}
                            fontSize="sm"
                            fontWeight="700"
                          >
                            {cell.value}
                          </Text>
                        </Flex>
                      );
                    } else if (cell.column.Header === "QUANTITY") {
                      data = (
                        <Flex align="center">
                          <Text
                            me="10px"
                            color={textColor}
                            fontSize="sm"
                            fontWeight="700"
                          >
                            {cell.value}
                          </Text>
                        </Flex>
                      );
                    } 
                    else if (cell.column.Header === "DATE SOLD") {
                      const formattedDate = moment(cell.value).format('YYYY-MM-DD')
                      data = (
                        <Flex align="center">
                          <Text
                            me="10px"
                            color={textColor}
                            fontSize="sm"
                            fontWeight="700"
                          >
                            {formattedDate}
                          </Text>
                        </Flex>
                      );
                    }
                    return (
                      <Td
                        {...cell.getCellProps()}
                        key={index}
                        fontSize={{ sm: "14px" }}
                        minW={{ sm: "150px", md: "200px", lg: "auto" }}
                        borderColor="transparent"
                      >
                        {data}
                      </Td>
                    );
                  })}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Box>
      <Flex
        px="10vh"
        justify="space-between"
        mt="15px"
        align="center"
      >
        <IconButton
          icon={<MdFirstPage />}
          onClick={() => gotoPage(0)}
          isDisabled={!canPreviousPage}
        />
        <IconButton
          icon={<MdChevronLeft />}
          onClick={previousPage}
          isDisabled={!canPreviousPage}
        />
        <Text fontWeight="700">
          Page {state.pageIndex + 1} of {pageCount}
        </Text>
        <IconButton
          icon={<MdChevronRight />}
          onClick={nextPage}
          isDisabled={!canNextPage}
        />
        <IconButton
          icon={<MdLastPage />}
          onClick={() => gotoPage(pageCount - 1)}
          isDisabled={!canNextPage}
        />
      </Flex>
    </Box>
  );
}
