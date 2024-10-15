import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment/moment"

import {
  Box,
  Icon,
  SimpleGrid,
  useColorModeValue,
  Flex
} from "@chakra-ui/react";

// Assets
import banner from "assets/img/auth/banner.png";

// Custom components
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import {
  MdAttachMoney,
  MdBarChart,
  MdInventory,
  MdSell
} from "react-icons/md";
import Tasks from "./components/Tasks";
import Banner from "./components/Banner";
import Notifications from "./components/Notifications";
import SaleChart from "./components/SaleChart";
import SaleTable from "./components/SaleTable";

// Hooks 
import { useAuthContext } from 'hooks/account/useAuthContext'

export default function UserReports() {
  // Chakra Color Mode
  const boxColor = useColorModeValue("white !important", "#111C44 !important");
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");

  // user
	const { user } = useAuthContext()
  const currentMonth = moment().format("YYYY-MM-DD")
  const [SaleData, setSales] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);

  let userRole;
  switch(user.userDetail.role) {
    case "Dev": 
      userRole = "Developer" 
      break;
    case "OM": 
      userRole = "Operation Manager"       
      break;
    case "Analyst": 
      userRole = "Finance Analyst"
      break;
    default: userRole = "Employee"
  }  

  const saleHistoryHeader = [
    {
      Header: "PRODUCT NAME",
      accessor: "name",
    },
    {
      Header: "QUANTITY",
      accessor: "quantity",
    },
    {
      Header: "DATE SOLD",
      accessor: "createdAt"
    },
  ];

  useEffect(() => {
    // Make a GET request to your backend API to fetch data
    axios
      .get(`/api/finance/sale/user?id=${user.userDetail._id}&date=${currentMonth}`)
      .then((response) => {
        setSales(response.data.Sale);
        setIsDataFetched(true)
      })
      .catch((error) => {
        console.error(error);
      });
  }, [user.userDetail._id, currentMonth, isDataFetched]);

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        columns={{ base: 2, md: 2, lg: 4, "2xl": 4 }}
        gap='20px'
        mb='20px'>
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdAttachMoney} color={brandColor} />
              }
            />
          }
          name='Monthly Target'
          value='$1000.00'
        />
        <MiniStatistics           
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdBarChart} color={brandColor} />
              }/>
          }

          growth={isDataFetched? '+23%' : "0%"} 
          name='Sales' 
          value={isDataFetched? '$574.34' : "$0"} />
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdInventory} color={brandColor} />
              }
            />
          }
          name='Total Sales to Date'
          value='320'
        />
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdSell} color={brandColor} />
              }
            />
          }
          name='Sales this month'
          value='5'
        />
      </SimpleGrid>
      <SimpleGrid
        columns={{ base: 1, md: 1, lg: 2, "2xl": 2 }}
        templateColumns='3fr 1fr 1fr'
        gap='20px'>
        <Banner
          gridArea='1 / 1 / 2 / 2'
          banner={banner}
          name={user.userDetail.name}
          job={userRole}
        />
        <Tasks/>
        <Notifications
          gridArea={{
            base: "3 / 1 / 4 / 2",
            lg: "2 / 1 / 3 / 3",
            "2xl": "1 / 3 / 2 / 4",
          }}
        />
      
      </SimpleGrid>
      {(!isDataFetched) ? (
        <Flex mt='10vh' justifyContent='center'>
          <Box
            maxW="sm"
            borderWidth="1px"
            borderRadius="lg"
            bg={boxColor}
            p="3"
            boxShadow="base">
            Loading...
          </Box>
        </Flex>
      ) : (
        <SimpleGrid 
          columns={{ base: 1, md: 1, xl: 2 }} 
          templateColumns='3fr 2fr'
          gap='20px'>
          <SaleChart 
            userId={user.userDetail._id}
            onCreate={() => setIsDataFetched(false)}
          />
          <SaleTable
            columnsData={saleHistoryHeader}
            tableData={SaleData}
          />
        </SimpleGrid> 
      )}

    </Box>
  );
}
