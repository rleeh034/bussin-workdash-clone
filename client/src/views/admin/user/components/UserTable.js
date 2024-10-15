import React, { useMemo, useState, useEffect } from "react";
import axios from "axios";
import EditUserForm from "./EditUser";

//hooks
import { useAuthContext } from "hooks/account/useAuthContext";

import { Box, Flex, Table, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue, IconButton } from "@chakra-ui/react";

// Icons
import { MdAdd, MdRefresh, MdDelete, MdChevronLeft, MdChevronRight, MdFirstPage, MdLastPage } from "react-icons/md";
import { useGlobalFilter, usePagination, useSortBy, useTable } from "react-table";

// Custom components
import TableButton from "components/button/TableButton";

export default function UserTable(props) {
  // Chakra Color Mode
  const { user } = useAuthContext();
  const boxColor = useColorModeValue("white !important", "#111C44 !important");
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const { columnsData, tableData: initialTableData, onCreateClick } = props;
  const [tableData, setTableData] = useState(initialTableData);
  const columns = useMemo(() => columnsData, [columnsData]);

  const fetchTableData = async () => {
    try {
      const response = await axios.get(`/api/user/view?company=${user.userDetail.company}`);
      setTableData(response.data.User); // Update the state
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Fetch user data when the component mounts
    fetchTableData();
  }, []);

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
  const handleOpenEditDialog = (userId) => {
    setSelectedUserId(userId);
    setIsEditDialogOpen(true);
  };

  const deleteUserName = async (userId) => {
    if (!userId) {
      console.error("Invalid userId");
      return;
    }

    try {
      setSelectedUserId(userId);
      // API request to delete the user name
      await axios.delete(`/api/user/view/${userId}`).then(fetchTableData());
    } catch (error) {
      console.error(error);
    }
  };

  // Callback function to receive the new name from EditUserForm
  const handleSaveUserNameAndEmail = async (newName, newEmail) => {
    try {
      // Create an object with the fields you want to update
      const updates = {};
      if (newName) {
        updates.name = newName;
      }
      if (newEmail) {
        updates.email = newEmail;
      }

      // Check if there are any updates to perform
      if (Object.keys(updates).length === 0) {
        // No updates to perform, close the dialog
        setIsEditDialogOpen(false);
        return;
      }

      await axios.put(`/api/user/view/${selectedUserId}`, updates).then(fetchTableData());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box overflowX="auto">
      <Box bg={boxColor} borderRadius="25px" h="74vh" overflowY="auto">
        <Flex px="25px" justify="space-between" mt="15px" mb="20px" align="center">
          <Text color={textColor} fontSize="30px" fontWeight="700" lineHeight="100%">
            Users
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
                    if (cell.column.Header === "USER NAME") {
                      data = (
                        <Flex align="center">
                          <Text color={textColor} fontSize="sm" fontWeight="700">
                            {cell.value}
                          </Text>
                        </Flex>
                      );
                    } else if (cell.column.Header === "USER ID") {
                      data = (
                        <Flex align="center">
                          <Text me="10px" color={textColor} fontSize="sm" fontWeight="700">
                            {cell.value}
                          </Text>
                        </Flex>
                      );
                    } else if (cell.column.Header === "USER ROLE") {
                      data = (
                        <Flex align="center">
                          <Text me="10px" color={textColor} fontSize="sm" fontWeight="700">
                            {(() => {
                              if (cell.value === "OM") {
                                return "Operation Manager";
                              } else if (cell.value === "Basic") {
                                return "Basic Employee";
                              } else if (cell.value === "Analyst") {
                                return "Finance Analyst";
                              } else if (cell.value === "Dev") {
                                return "Developer";
                              } else {
                                return "No Role yet";
                              }
                            })()}
                          </Text>
                        </Flex>
                      );
                    } else if (cell.column.Header === "USER EMAIL") {
                      data = (
                        <Flex align="center">
                          <Text me="10px" color={textColor} fontSize="sm" fontWeight="700">
                            {cell.value}
                          </Text>
                        </Flex>
                      );
                    } else if (cell.column.Header === "USER COMPANY") {
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
                          {row.original["role"] !== "OM" &&
                            row.original["role"] !== "Dev" && ( // Add this conditional check
                              <TableButton
                                icon={MdDelete}
                                iconColor="red"
                                onClick={() => {
                                  deleteUserName(row.original["_id"]);
                                  fetchTableData();
                                }}
                              />
                            )}
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
        <EditUserForm
          Form
          isOpen={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          onSave={handleSaveUserNameAndEmail}
          currentName={""} // refresh input box
          currentEmail={""} // Add currentEmail prop
          onFormSave={handleSaveUserNameAndEmail}
        />
      )}
    </Box>
  );
}
