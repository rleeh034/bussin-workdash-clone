import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment/moment"
import regression from "regression"

// Chakra imports
import {
  Box,
  Flex,
  Icon,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

// Icons
import {
  MdAdd,
} from "react-icons/md";
import { 
  IoCheckmarkCircle,
  IoAlertCircle
} from "react-icons/io5";

// Component
import LineChart from "./LineChart";
import TableButton from "components/button/TableButton";
import CreateSaleForm from "./CreateSale";

// Assets
import {
  lineChartOptionsSaleChart,
} from "../variables/charts";

export default function SaleChart(props) {
  const { userId, onCreate } = props;
  const currentMonth = moment.utc().format("YYYY-MM-DD")
  // Chakra Color Mode
  const boxColor = useColorModeValue("white !important", "#111C44 !important")
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [SalesRevenueData, setSalesRevenue] = useState([]);
  const [ProjectedRevenueData, setProjectedRevenue] = useState([]);
  const [isChartDataFetched, setIsChartDataFetched] = useState(false);
  const [isOnTrack, setIsOnTrack] = useState(false);
  const [error, setError] = useState("");

  // Function to handle opening the create dialog
  const handleOpenCreateDialog = () => {
    setIsCreateDialogOpen(true);
  };

  // Function to handle saving the edited product name
  const handleCreateSale = async (name, quantity, productId) => { 
    try {
      // Make an API request to update the product name
      await axios.post("/api/finance/sale", {
        name: name,
        quantity: quantity,
        product_id: productId,
        user_id: userId,
      });
      setIsCreateDialogOpen(false)
      setIsChartDataFetched(false)
    } catch (error) {
      setError(error.response.data.error)
    }
  };

  useEffect(() => {
    const currentDay = moment.utc().format('D')
    const daysInMonth = moment().daysInMonth()
    var temp = Array.from({ length: daysInMonth }, (v, i) => 0)
    // Make a GET request to your backend API to fetch data
    axios
      .get(`/api/finance/sale/userRevenue?id=${userId}&date=${currentMonth}`)
      .then((response) => {
        // prepare sales data point
        response.data.CumulativeRevenue.map((revenue) => {
          temp[parseInt(revenue._id)-1] = revenue.cumulativeTotal
        })
        setSalesRevenue(temp.slice(0, currentDay));  
        
        // prepare projected sales data point
        const dataPoints = temp.map((v, i) => [i+1, v]).slice(0, currentDay)
        const result = regression.linear(dataPoints)
        const regressionLine = temp.map((v, i) => (result.equation[0] * i + result.equation[1]).toFixed(1));
        setProjectedRevenue(regressionLine)

        setIsOnTrack(regressionLine[daysInMonth-1] >= 1000 || SalesRevenueData[currentDay-1] >= 1000)
        setIsChartDataFetched(true)
      })
      .catch((error) => {
        console.error(error);
      });
  }, [isChartDataFetched]);

  const lineChartData = [
    {
      name: "Actual ($)",
      data: SalesRevenueData
    },
    {
      name: "Projected ($)",
      data: ProjectedRevenueData
    },
  ]

  return (
    <Box
      bg={boxColor}
      borderRadius="25px"
      h="auto"
      w="auto"
      p="10px">
      <Flex justify='space-between' ps='5px' pe='10px' pt='5px'>
        <Flex>
          <Text
            color={textColorPrimary}
            fontWeight="700"
            fontSize="2xl"
            px="5px">
            Monthly Sales Revenue 
          </Text>
          {isOnTrack ? (
          <Flex align='center' ml='10px'>
            <Icon as={IoCheckmarkCircle} color='green.500' me='4px' />
            <Text color='green.500' fontSize='md' fontWeight='700'>
              On track
            </Text>
          </Flex> ) : (
          <Flex align='center' ml='10px'>
            <Icon as={IoAlertCircle} color='red.500' me='4px' />
            <Text color='red.500' fontSize='md' fontWeight='700'>
              Not on track
            </Text>
          </Flex> )}
        </Flex> 
        {/* Create Button */}
        <TableButton 
          icon={MdAdd} 
          iconColor="green"
          onClick={() => {handleOpenCreateDialog()}} />
      </Flex>
      <Box minH='87%' maxW='94%' ml='3%'>
        {isChartDataFetched && (
        <LineChart
          chartData={lineChartData}
          chartOptions={lineChartOptionsSaleChart}
        />
        )}
      </Box>

      {isCreateDialogOpen && (
        <CreateSaleForm
          isOpen={isCreateDialogOpen}
          onClose={() => setIsCreateDialogOpen(false)}
          onCreate={onCreate}
          onSave={handleCreateSale}
          error = {error}
        />
      )}
    </Box>
  );
}
