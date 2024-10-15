import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Center,
  useColorModeValue,
} from "@chakra-ui/react";

// Components
import ProductTable from "./components/ProductTable";

// Hooks 
import { useAuthContext } from 'hooks/account/useAuthContext'

function ProductView() {
  const boxColor = useColorModeValue("white !important", "#111C44 !important");
  // user
	const { user } = useAuthContext()
  const userCompany = user.userDetail.company
  const [ProductData, setProducts] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const productTableHeader = [
    {
      Header: "PRODUCT NAME",
      accessor: "name",
    },
    {
      Header: "QUANTITY",
      accessor: "quantity",
    },
    {
      Header: "PRICE ($)",
      accessor: "price",
    },
    {
      Header: "ACTION",
    },
  ];

  useEffect(() => {
    // Make a GET request to your backend API to fetch data
    axios
      .get(`/api/finance/product?company_name=${userCompany}`)
      .then((response) => {
        setProducts(response.data.Product);
        setIsDataFetched(true)
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userCompany]);

  useEffect(() => {
    // Log ProductData when it changes
  }, [ProductData]); // Watch for changes in ProductData

  const renderTable = () => {
    if (!isDataFetched) {
      return (        
        <Center height="100vh">
        <Box
          maxW="sm"
          borderWidth="1px"
          borderRadius="lg"
          bg={boxColor}
          p="3"
          boxShadow="base">
          Loading...
        </Box>
        </Center>
      )
    }
    return (
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <ProductTable
          columnsData={productTableHeader}
          tableData={ProductData}
          userCompany={userCompany}
        />
      </Box>
    );
  };

  return <div>{renderTable()}</div>;
}

export default ProductView;