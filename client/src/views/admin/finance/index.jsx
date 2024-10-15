import React, { useEffect, useState } from "react";
import {
  Box,
  SimpleGrid,
  Center,
  useColorModeValue
} from "@chakra-ui/react";
import csvDownload from "json-to-csv-export";
import moment from "moment/moment"
import axios from "axios";

// Components
import TotalRevenue from "./components/TotalRevenue"
import WeeklyRevenue from "./components/WeeklyRevenue";
import PieCard from "./components/PieCard";

// Hooks 
import { useAuthContext } from 'hooks/account/useAuthContext'

function FinanceView() {
  // Chakra Color Mode
  const boxColor = useColorModeValue("white !important", "#111C44 !important");
  // user
	const { user } = useAuthContext()
  const currentMonth = moment().format("YYYY-MM-DD")
  const [exportData, setExportData] = useState([]);
  const [RevenueData, setRevenueData] = useState([]);
  const [WeekSalesData, setWeekSalesData] = useState([]);
  const [PieLabel, setPieLabel] = useState([]);
  const [PieData, setPieData] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);

  useEffect(() => {
    const currentDay = moment().format('D')
    const daysInMonth = moment().daysInMonth()
    var temp = Array.from({ length: daysInMonth }, (v, i) => 0)
    // Make a GET request to your backend API to fetch data
    axios
      .get(`/api/finance/sale/companyRevenue?name=${user.userDetail.company}&date=${currentMonth}`)
      .then((response) => {
        response.data.CumulativeRevenue.map((revenue) => {
          temp[parseInt(revenue._id)-1] = revenue.cumulativeTotal
        })
        setExportData(response.data.CumulativeRevenue)
        setRevenueData(temp.slice(0, currentDay));
        setIsDataFetched(true)
      })
      .catch((error) => {
        console.error(error);
      });
  }, [user.userDetail.company, currentMonth]);

  const lineChartData = [
    {
      name: "Revenue",
      data: RevenueData
    }
  ]

  useEffect(() => {
    const currentDay = parseInt(moment().format('D'))
    const daysInMonth = moment().daysInMonth()
    var temp = Array.from({ length: daysInMonth }, (v, i) => 0)
    // Make a GET request to your backend API to fetch data
    axios
      .get(`/api/finance/sale/companySales?name=${user.userDetail.company}&date=${currentMonth}`)
      .then((response) => {
        response.data.Sale.map((sale) => {
          temp[parseInt(sale._id)-1] = sale.counts
        })

        // Extract unique product names
        const uniqueProductNames = [...new Set(temp.flatMap(item => Array.isArray(item) ? item.map(product => product.name) : []))];

        // Initialize an object to store product data with empty arrays
        const productData = {};
        uniqueProductNames.forEach(name => {
          productData[name] = { name, data: [] };
        });

        // Iterate through the input array
        for (const item of temp) {
          if (Array.isArray(item)) {
            // Iterate through the array and add each product's data
            item.forEach(product => {
              const { name, count } = product;
              productData[name].data.push(count);
            });
          } else {
            // Non-array values count as 0 for each product
            uniqueProductNames.forEach(name => {
              productData[name].data.push(0);
            });
          }
        }

        // Convert the product data object to an array
        const ProductSalesData = Object.values(productData);
        const productSums = uniqueProductNames.map(name => {
          const data = ProductSalesData.find(product => product.name === name).data;
          const sum = data.reduce((acc, count) => acc + count, 0);
          return sum;
      });
        
        setPieLabel(uniqueProductNames)
        setPieData(productSums)

        const productDataCopy = JSON.parse(JSON.stringify(productData));
        const WeekSalesData = Object.values(productDataCopy);
        WeekSalesData.forEach(product => {
          product.data = product.data.slice(currentDay-7, currentDay);
        });

        setWeekSalesData(WeekSalesData)
      })
      .catch((error) => {
        console.error(error);
      });
  }, [user.userDetail.company, currentMonth]);

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
      <Box w='auto' pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <SimpleGrid 
          columns={{ base: 1, md: 1, xl: 1 }} 
          mb='20px'>
          <TotalRevenue
            data={lineChartData}
            onExportClick={() => csvDownload({ 
              data: exportData,
              filename:"report.csv",
              delimiter:","})
            }/>
        </SimpleGrid>
        <SimpleGrid 
          columns={{ base: 2, md: 2, xl: 2 }} 
          templateColumns='2fr 1fr'
          gap='20px'>
          <WeeklyRevenue 
            data={WeekSalesData}
          />
          <PieCard 
            label={PieLabel}
            data={PieData}
          />
        </SimpleGrid>
      </Box>
    )
  }
  return <div>{renderTable()}</div>;
}
export default FinanceView;
