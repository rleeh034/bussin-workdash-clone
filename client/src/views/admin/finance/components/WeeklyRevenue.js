// Chakra imports
import {
  Box,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import BarChart from "./BarChart";
import React from "react";
import {
  barChartOptionsConsumption,
} from "../variables/charts";

export default function WeeklyRevenue(props) {
  const { data } = props;
  // Chakra Color Mode
  const boxColor = useColorModeValue("white !important", "#111C44 !important")
  const textColor = useColorModeValue("secondaryGray.900", "white");

  return (
    <Box
      bg={boxColor}
      borderRadius="25px"
      p="10px">
      <Flex align='center' w='100%' px='15px' py='10px'>
        <Text
          me='auto'
          color={textColor}
          fontSize='xl'
          fontWeight='700'
          lineHeight='100%'>
          Sales for the past week
        </Text>
      </Flex>

      <Box h='300px' mt='auto'>
      {data.length > 0 && (
        <BarChart
          chartData={data}
          chartOptions={barChartOptionsConsumption}
        />)}
      </Box>
    </Box>
  );
}
