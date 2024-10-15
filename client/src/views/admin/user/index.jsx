import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Center, useColorModeValue } from "@chakra-ui/react";
import { Redirect } from "react-router-dom";
import { useAuthContext } from "hooks/account/useAuthContext";

// Components
import UserTable from "./components/UserTable";

function UserView() {
  // Chakra Color Mode
  const boxColor = useColorModeValue("white !important", "#111C44 !important");
  const { user } = useAuthContext();
  const [UserData, setUsers] = useState([]);
  const [redirectToSignUp, setRedirectToSignUp] = useState(false);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const userTableHeader = [
    {
      Header: "USER NAME",
      accessor: "name",
    },
    {
      Header: "USER ROLE",
      accessor: "role",
    },
    {
      Header: "USER EMAIL",
      accessor: "email",
    },
    {
      Header: "ACTION",
    },
  ];

  useEffect(() => {
    // Make a GET request to your backend API to fetch data
    const companyName = user.userDetail.company;
    axios
      .get(`/api/user/view?company=${companyName}`)
      .then((response) => {
        setUsers(response.data.User);
        setIsDataFetched(true)
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
        {redirectToSignUp && <Redirect to="/admin/signup-user" />}
        <UserTable columnsData={userTableHeader} tableData={UserData} onCreateClick={() => setRedirectToSignUp(true)} />
      </Box>
    );
  };

  return <div>{renderTable()}</div>;
}

export default UserView;
