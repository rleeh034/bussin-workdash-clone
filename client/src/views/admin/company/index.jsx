import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Center, useColorModeValue } from "@chakra-ui/react";
import { Redirect } from "react-router-dom";

// Components
import CompanyTable from "./components/CompanyTable";

function CompanyView() {
  // Chakra Color Mode
  const boxColor = useColorModeValue("white !important", "#111C44 !important");
  const [CompanyData, setCompanies] = useState([]);
  const [redirectToSignUp, setRedirectToSignUp] = useState(false);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const companyTableHeader = [
    {
      Header: "COMPANY NAME",
      accessor: "name",
    },
    {
      Header: "COMPANY ID",
      accessor: "_id",
    },
    {
      Header: "ACTION",
    },
  ];

  useEffect(() => {
    // Make a GET request to your backend API to fetch data
    axios
      .get("/api/company/view")
      .then((response) => {
        setCompanies(response.data.Company);
        setIsDataFetched(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

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
        {redirectToSignUp && <Redirect to="/admin/company/signup" />}
        <CompanyTable columnsData={companyTableHeader} tableData={CompanyData} onCreateClick={() => setRedirectToSignUp(true)} />
      </Box>
    );
  };

  return <div>{renderTable()}</div>;
}

export default CompanyView;
