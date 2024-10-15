import React, { useMemo, useState, useEffect } from "react";
import axios from "axios";

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
  MdAdd,
  MdRefresh,
  MdDelete,
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

// Custom components
import TableButton from "components/button/TableButton";
import CreateProductForm from "./CreateProduct";
import EditProductForm from "./EditProduct";
import DeleteProductForm from "./DeleteProduct";

export default function ProductTable(props) {
  // Chakra Color Mode
  const boxColor = useColorModeValue("white !important", "#111C44 !important");
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedProductName, setSelectedProductName] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [error, setError] = useState("");

  const {
    columnsData,
    tableData: initialTableData,
    userCompany,
  } = props;

  const [tableData, setTableData] = useState(initialTableData);
  const columns = useMemo(() => columnsData, [columnsData]);
  //const data = useMemo(() => tableData, [tableData]);

  const fetchTableData = async () => {
    try {
      const response = await axios.get(`/api/finance/product?company_name=${userCompany}`);
      setTableData(response.data.Product); // Update the state
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
  initialState.pageSize = 6;

  // Function to handle opening the create dialog
  const handleOpenCreateDialog = () => {
    setIsCreateDialogOpen(true);
  };

  // Function to handle opening the edit dialog
  const handleOpenEditDialog = (productId, productName, productQuantity, productPrice) => {
    setSelectedProductId(productId);
    setSelectedProductName(productName);
    setSelectedQuantity(productQuantity);
    setSelectedPrice(productPrice);
    setIsEditDialogOpen(true);
  };

  // Function to handle opening the create dialog
  const handleOpenDeleteDialog = (productId, productName) => {
    setSelectedProductId(productId);
    setSelectedProductName(productName);
    setIsDeleteDialogOpen(true);
  };

  // Function to handle saving the edited product name
  const handleCreateProduct = async (newName, quantity, newPrice) => {
    try {
      // Make an API request to update the product name
      await axios.post("/api/finance/product", {
        name: newName,
        quantity: quantity,
        price: newPrice,
        company_name: userCompany
      });
      fetchTableData();
      setIsCreateDialogOpen(false)
    } catch (error) {
      setError(error.response.data.error)
    }
  };

  // Function to handle saving the edited product name
  const handleSaveProductDetails = async (newName, quantity, newPrice) => {
    try {
      // Make an API request to update the product name
      await axios.put(`/api/finance/product/${selectedProductId}`, {
        name: newName,
        quantity: quantity,
        price: newPrice
      });
      fetchTableData();
      setIsEditDialogOpen(false)
    } catch (error) {
      setError(error.response.data.error)
    }
  };

  // Function to delete product
  const deleteProduct = async () => {
    if (!selectedProductId) {
      console.error("Invalid productId");
      return;
    }

    try {
      // API request to delete the product name
      await axios.delete(`/api/finance/product/${selectedProductId}`);
    } catch (error) {
      console.error(error);
    }

    fetchTableData();
  };

  useEffect(() => {
    if (!isCreateDialogOpen || !isEditDialogOpen) {
      setError("");
    }
  }, [isCreateDialogOpen, isEditDialogOpen]);

  return (
    <Box overflowX="auto">
      <Box bg={boxColor} borderRadius="25px" h="74vh" overflowY="auto">
        <Flex
          px="25px"
          justify="space-between"
          mt="15px"
          mb="20px"
          align="center"
        >
          <Text
            color={textColor}
            fontSize="22px"
            fontWeight="700"
            lineHeight="100%"
          >
            Products
          </Text>
          {/* Create Button */}
          <TableButton 
            icon={MdAdd} 
            iconColor="green" 
            onClick={() => {handleOpenCreateDialog()}} />
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
                    } else if (cell.column.Header === "PRICE ($)") {
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
                    } else if (cell.column.Header === "ACTION") {
                      data = (
                        <Flex align="center">
                          {/* Update*/}
                          <TableButton
                            icon={MdRefresh}
                            iconColor="blue"
                            mr="10px"
                            onClick={() => {
                              handleOpenEditDialog(
                                row.original["_id"], 
                                row.original["name"], 
                                row.original["quantity"], 
                                row.original["price"]
                              );
                            }}
                          />
                          {/* Delete Button */}
                          <TableButton
                            icon={MdDelete}
                            iconColor="red"
                            onClick={() => {handleOpenDeleteDialog(row.original["_id"], row.original["name"])}}
                          />
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
        px="55vh"
        justify="space-between"
        mb="20px"
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

      {isCreateDialogOpen && (
        <CreateProductForm
          isOpen={isCreateDialogOpen}
          onClose={() => setIsCreateDialogOpen(false)}
          onSave={handleCreateProduct}
          error = {error}
        />
      )}

      {isEditDialogOpen && (
        <EditProductForm
          isOpen={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          currentName={selectedProductName}
          currentQuantity={selectedQuantity}
          currentPrice={selectedPrice}
          error = {error}
          onSave={handleSaveProductDetails}
        />
      )}

      {isDeleteDialogOpen && (
        <DeleteProductForm
          isOpen={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          currentName={selectedProductName}
          onSave={deleteProduct}/>
      )}
    </Box>
  );
}