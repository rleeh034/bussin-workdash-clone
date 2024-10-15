import React, { useMemo, useState } from "react";
import axios from "axios";
import EditCompanyForm from "./EditCompany";

import { Box, Flex, Table, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue, IconButton } from "@chakra-ui/react";

// Icons
import { MdAdd, MdRefresh, MdDelete, MdChevronLeft, MdChevronRight, MdFirstPage, MdLastPage } from "react-icons/md";

import { useGlobalFilter, usePagination, useSortBy, useTable } from "react-table";

// Custom components
import TableButton from "components/button/TableButton";

export default function CompanyTable(props) {
  // Chakra Color Mode
  const boxColor = useColorModeValue("white !important", "#111C44 !important");
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);

  const { columnsData, tableData: initialTableData, onCreateClick } = props;

  const [tableData, setTableData] = useState(initialTableData);
  const columns = useMemo(() => columnsData, [columnsData]);

  const fetchTableData = async () => {
    try {
      const response = await axios.get("/api/company/view");
      setTableData(response.data.Company);
    } catch (error) {
      console.error(error);
    }
  };

  const tableInstance = useTable(
    {
      columns,
      data: tableData,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow, initialState, gotoPage, previousPage, nextPage, canPreviousPage, canNextPage, state, pageCount } = tableInstance;
  initialState.pageSize = 8;

  // Function to handle opening the edit dialog
  const handleOpenEditDialog = (companyId) => {
    setSelectedCompanyId(companyId);
    setIsEditDialogOpen(true);
  };

  // Function to handle saving the edited company name
  const handleSaveCompanyName = async (newName) => {
    try {
      // Make an API request to update the company name
      await axios
        .put(`/api/company/view/${selectedCompanyId}`, {
          name: newName,
        })
        .then(fetchTableData());
    } catch (error) {
      console.error(error);
    }
  };

  const deleteCompanyName = async (companyId) => {
    if (!companyId) {
      console.error("Invalid companyId");
      return;
    }

    try {
      setSelectedCompanyId(companyId);
      // API request to delete the company name
      await axios.delete(`/api/company/view/${companyId}`).then(fetchTableData());
    } catch (error) {
      console.error(error);
    }
  };

  // state variable to hold the new name
  const [editedName, setEditedName] = useState("");

  // Callback function to receive the new name from EditCompanyForm
  const handleSaveCompanyNameFromForm = (newName) => {
    setEditedName(newName); // Update the state with the new name
  };

  return (
    <Box overflowX="auto">
      <Box bg={boxColor} borderRadius="25px" h="74vh" overflowY="auto">
        <Flex px="25px" justify="space-between" mt="15px" mb="20px" align="center">
          <Text color={textColor} fontSize="30px" fontWeight="700" lineHeight="100%">
            Companies
          </Text>
          {/* Create Button */}
          <TableButton icon={MdAdd} iconColor="green" onClick={onCreateClick} />
        </Flex>
        <Table {...getTableProps()} variant="simple" color="gray.500" mb="15px">
          <Thead>
            {headerGroups.map((headerGroup, index) => (
              <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column, index) => (
                  <Th {...column.getHeaderProps(column.getSortByToggleProps())} pe="10px" key={index} borderColor={borderColor}>
                    <Flex justify="space-between" align="center" fontSize={{ sm: "10px", lg: "12px" }} color="gray.400">
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
                    if (cell.column.Header === "COMPANY NAME") {
                      data = (
                        <Flex align="center">
                          <Text color={textColor} fontSize="sm" fontWeight="700">
                            {cell.value}
                          </Text>
                        </Flex>
                      );
                    } else if (cell.column.Header === "COMPANY ID") {
                      data = (
                        <Flex align="center">
                          <Text me="10px" color={textColor} fontSize="sm" fontWeight="700">
                            {cell.value}
                          </Text>
                        </Flex>
                      );
                    } else if (cell.column.Header === "ACTION") {
                      data = (
                        <Flex align="center">
                          {/* Update*/}
                          <TableButton
                            icon={MdRefresh}
                            iconColor="blue"
                            mr="10px"
                            onClick={() => {
                              handleOpenEditDialog(row.original["_id"]);
                            }}
                          />
                          {/* Delete Button */}
                          <TableButton
                            icon={MdDelete}
                            iconColor="red"
                            onClick={() => {
                              deleteCompanyName(row.original["_id"]);
                              fetchTableData();
                            }}
                          />
                        </Flex>
                      );
                    }
                    return (
                      <Td {...cell.getCellProps()} key={index} fontSize={{ sm: "14px" }} minW={{ sm: "150px", md: "200px", lg: "auto" }} borderColor="transparent">
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
      <Flex px="55vh" justify="space-between" mb="20px" mt="15px" align="center">
        <IconButton icon={<MdFirstPage />} onClick={() => gotoPage(0)} isDisabled={!canPreviousPage} />
        <IconButton icon={<MdChevronLeft />} onClick={previousPage} isDisabled={!canPreviousPage} />
        <Text fontWeight="700">
          Page {state.pageIndex + 1} of {pageCount}
        </Text>
        <IconButton icon={<MdChevronRight />} onClick={nextPage} isDisabled={!canNextPage} />
        <IconButton icon={<MdLastPage />} onClick={() => gotoPage(pageCount - 1)} isDisabled={!canNextPage} />
      </Flex>

      {isEditDialogOpen && (
        <EditCompanyForm
          isOpen={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          onSave={handleSaveCompanyName}
          currentName={""} // refresh input box
          onFormSave={handleSaveCompanyNameFromForm}
        />
      )}
    </Box>
  );
}
